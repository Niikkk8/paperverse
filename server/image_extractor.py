from flask import Flask, request, jsonify, send_file
import groq
import google.generativeai as genai
import PyPDF2
import os
import tempfile
import subprocess
import base64
from pathlib import Path

app = Flask(_name_)

# Initialize Groq client
GROQ_API_KEY = "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"
groq_client = groq.Groq(api_key=GROQ_API_KEY)

# Initialize Gemini
GEMINI_API_KEY = "AIzaSyCYS1M4u1YjlSPmRcook-eO-B2UV2OtyNc"
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel('gemini-pro')

# Create a directory for temporary files if it doesn't exist
TEMP_DIR = Path(_file_).parent / "temp_files"
try:
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    # Ensure directory has proper permissions (read/write for user)
    TEMP_DIR.chmod(0o755)
except Exception as e:
    print(f"Error creating temporary directory: {e}")
    # Fallback to system temp directory if needed
    TEMP_DIR = Path(tempfile.gettempdir()) / "workflow_temp"
    TEMP_DIR.mkdir(parents=True, exist_ok=True)

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text.strip()
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")

def analyze_with_gemini(text):
    """Use Gemini to analyze the paper and extract workflow"""
    try:
        prompt = """Analyze this research paper and provide a structured workflow of the methodology and approach. 
        Focus on:
        1. Problem Statement/Research Goals
        2. Methodology Steps
        3. Implementation Details
        4. Evaluation Methods
        5. Results Analysis
        
        Format your response as a clear, step-by-step workflow that shows how each part connects to others.
        Be specific but concise. Use bullet points and clear section headers.
        
        Text:
        {text}
        """
        
        response = gemini_model.generate_content(
            prompt.format(text=text[:10000]),  # Limit text length
            generation_config={
                "temperature": 0.3,
                "top_p": 0.9,
                "top_k": 40,
                "max_output_tokens": 2048
            }
        )
        
        return response.text
    
    except Exception as e:
        raise Exception(f"Error in Gemini analysis: {str(e)}")

def generate_mermaid_with_groq(workflow_text):
    """Use Groq to generate Mermaid diagram from Gemini's analysis"""
    try:
        prompt = """Convert this research paper workflow into a Mermaid flowchart diagram.
        The diagram should:
        1. Show the main workflow steps
        2. Include subprocesses and key details
        3. Use clear, descriptive labels
        4. Show connections between steps
        
        Use this Mermaid syntax:
        mermaid
        graph TD
            %% Main workflow
            subgraph MainFlow["Research Paper Workflow"]
                A["Problem Statement/Research Goals"] --> B["Methodology"]
                B --> C["Implementation"]
                C --> D["Evaluation"]
                D --> E["Results Analysis"]
            end
            
            %% Methodology subprocesses
            subgraph MethodSteps["Methodology Details"]
                B1["Method Step 1"] --> B2["Method Step 2"]
            end
            B --> MethodSteps
            
            %% Implementation subprocesses
            subgraph ImpSteps["Implementation Details"]
                C1["Implementation Step 1"] --> C2["Implementation Step 2"]
                C2 --> C3["Implementation Step 3"]
            end
            C --> ImpSteps
            
            %% Evaluation subprocesses
            subgraph EvalSteps["Evaluation Process"]
                D1["Evaluation Method 1"] --> D2["Evaluation Method 2"]
                D2 --> D3["Results Validation"]
            end
            D --> EvalSteps
            
            %% Results subprocesses
            subgraph ResSteps["Results Analysis"]
                E1["Key Findings"] --> E2["Performance Metrics"]
                E2 --> E3["Conclusions"]
            end
            E --> ResSteps
            
            %% Style definitions
            classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
            classDef subgraphTitle fill:#e1e1e1,stroke:#666,stroke-width:2px;
            class MainFlow,MethodSteps,ImpSteps,EvalSteps,ResSteps subgraphTitle;
        
        
        Workflow to convert:
        {text}
        """
        
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert at creating Mermaid diagrams. Generate only the Mermaid diagram code, nothing else."
                },
                {
                    "role": "user",
                    "content": prompt.format(text=workflow_text)
                }
            ],
            model="mixtral-8x7b-32768",
            temperature=0.3,
            max_tokens=1000,
        )
        
        response = chat_completion.choices[0].message.content
        if "mermaid" in response:
            parts = response.split("mermaid", 1)
            if len(parts) > 1:
                mermaid_code = parts[1].strip()
                mermaid_code = mermaid_code.split("")[0].strip()
            else:
                raise Exception("Could not extract Mermaid diagram code from response")
        else:
            raise Exception("Response does not contain Mermaid diagram code")
        return mermaid_code
    
    except Exception as e:
        raise Exception(f"Error generating Mermaid diagram: {str(e)}")

def generate_diagram_image(mermaid_code, output_path):
    """Generate PNG image from Mermaid code"""
    try:
        # Create temporary markdown file
        md_path = output_path.with_suffix('.md')
        with open(md_path, 'w') as f:
            f.write("mermaid\n")
            f.write(mermaid_code)
            f.write("\n```")
        
        # Convert to PNG using mmdc
        try:
            subprocess.run(['npx', '--yes', 'mmdc', '-i', str(md_path), '-o', str(output_path)], check=True)
        except subprocess.CalledProcessError:
            # If mmdc is not installed, try to install it
            subprocess.run(['npm', 'install', '-g', '@mermaid-js/mermaid-cli'], check=True)
            subprocess.run(['npx', '--yes', 'mmdc', '-i', str(md_path), '-o', str(output_path)], check=True)
        
        # Clean up markdown file
        md_path.unlink()
        
        return True
    except Exception as e:
        raise Exception(f"Error generating diagram image: {str(e)}")

@app.route('/analyze-paper', methods=['POST'])
def analyze_paper():
    temp_pdf = None
    temp_png = None
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.pdf'):
            return jsonify({'error': 'Only PDF files are supported'}), 400
        
        # Create unique filenames for temporary files
        temp_pdf = TEMP_DIR / f"temp_{os.urandom(8).hex()}.pdf"
        temp_png = TEMP_DIR / f"diagram_{os.urandom(8).hex()}.png"
        
        # Save the uploaded PDF
        file.save(temp_pdf)
        
        # Process the file and generate diagram
        pdf_text = extract_text_from_pdf(temp_pdf)
        workflow_analysis = analyze_with_gemini(pdf_text)
        mermaid_diagram = generate_mermaid_with_groq(workflow_analysis)
        generate_diagram_image(mermaid_diagram, temp_png)
        
        # Read the image before cleanup
        with open(temp_png, 'rb') as img_file:
            img_data = base64.b64encode(img_file.read()).decode('utf-8')
        
        response_data = {
            'workflow_analysis': workflow_analysis,
            'mermaid_diagram': mermaid_diagram,
            'diagram_image': img_data
        }
        
        # Clean up only after preparing the response
        if temp_pdf and temp_pdf.exists():
            temp_pdf.unlink()
        if temp_png and temp_png.exists():
            temp_png.unlink()
            
        return jsonify(response_data)
        
    except Exception as e:
        # Clean up in case of error
        if temp_pdf and temp_pdf.exists():
            temp_pdf.unlink()
        if temp_png and temp_png.exists():
            temp_png.unlink()
        return jsonify({'error': str(e)}), 500

@app.route('/analyze-paper-image', methods=['POST'])
def analyze_paper_image():
    temp_pdf = None
    temp_png = None
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.pdf'):
            return jsonify({'error': 'Only PDF files are supported'}), 400
        
        # Create unique filenames for temporary files
        temp_pdf = TEMP_DIR / f"temp_{os.urandom(8).hex()}.pdf"
        temp_png = TEMP_DIR / f"diagram_{os.urandom(8).hex()}.png"
        
        # Process the file and generate diagram
        file.save(temp_pdf)
        pdf_text = extract_text_from_pdf(temp_pdf)
        workflow_analysis = analyze_with_gemini(pdf_text)
        mermaid_diagram = generate_mermaid_with_groq(workflow_analysis)
        generate_diagram_image(mermaid_diagram, temp_png)
        
        # Clean up PDF file as it's no longer needed
        if temp_pdf.exists():
            temp_pdf.unlink()
        
        # Send file and clean up in a callback
        return send_file(
            temp_png,
            mimetype='image/png',
            as_attachment=True,
            download_name='workflow_diagram.png'
        )
        
    except Exception as e:
        # Clean up in case of error
        if temp_pdf and temp_pdf.exists():
            temp_pdf.unlink()
        if temp_png and temp_png.exists():
            temp_png.unlink()
        return jsonify({'error': str(e)}), 500

if _name_ == '_main_':
    app.run(debug=True, port=5001)