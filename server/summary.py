from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
import google.generativeai as genai
import PyPDF2
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Gemini with the provided API key
API_KEY = "AIzaSyCpIDDX2iEFSaCfX19Sa3jNTWIVEVPmdtE"
genai.configure(api_key=API_KEY)

# Update to use an available model
try:
    model = genai.GenerativeModel('models/gemini-1.5-pro')  # Keep the model as specified
except Exception as e:
    print(f"Model initialization error: {str(e)}")
    raise

def generate_with_gemini(prompt, max_tokens=4096):
    """Generate content using Gemini model with improved parameters"""
    try:
        response = model.generate_content(prompt)  # Keep as-is
        return response.text
    except Exception as e:
        print(f"Detailed error in generate_with_gemini: {str(e)}")
        raise Exception(f"Error generating content with Gemini: {str(e)}")

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file"""
    try:
        with open(pdf_path, 'rb') as file:
            # Create PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)
            
            # Extract text from all pages
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
                
            return text.strip()
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")

def generate_summary(text):
    """Generate a more comprehensive and structured summary"""
    try:
        prompt = """Create a detailed academic summary of this research paper using the following structure:

        1. OVERVIEW
        - Paper title and authors (if available)
        - Field of study and main research area
        - Brief background context

        2. RESEARCH OBJECTIVES & METHODOLOGY
        - Primary research questions/objectives
        - Detailed methodology and approach
        - Tools, technologies, or frameworks used
        - Study design and implementation

        3. KEY FINDINGS & RESULTS
        - Major discoveries and outcomes
        - Statistical significance (if any)
        - Technical achievements
        - Performance metrics and evaluations

        4. CONCLUSIONS & IMPLICATIONS
        - Main conclusions drawn
        - Theoretical implications
        - Practical implications
        - Limitations of the study

        5. FUTURE WORK & RECOMMENDATIONS
        - Suggested future research directions
        - Potential improvements
        - Open challenges
        - Recommendations for practitioners

        6. PRACTICAL APPLICATIONS & IMPACT
        - Real-world applications
        - Industry relevance
        - Societal impact
        - Potential benefits and drawbacks

        Please provide a comprehensive yet concise summary for each section.
        If certain information is not available in the paper, you may skip that point.

        Text:
        {text}
        """
        
        return generate_with_gemini(prompt.format(text=text), max_tokens=4096)
    except Exception as e:
        raise Exception(f"Error generating summary: {str(e)}")

@app.route('/summarize', methods=['POST'])
def summarize_pdf():
    """API endpoint to process a PDF and generate a summary"""
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Create tmp directory if it doesn't exist
    os.makedirs("tmp", exist_ok=True)
    
    pdf_path = os.path.join("tmp", file.filename)  # Use relative path
    file.save(pdf_path)
    
    try:
        print("Extracting text from PDF...")
        pdf_text = extract_text_from_pdf(pdf_path)
        
        print("\nExtracted Text:")
        print("-" * 80)
        print(pdf_text[:1000] + "..." if len(pdf_text) > 1000 else pdf_text)
        print("-" * 80)
        
        print("\nGenerating summary...")
        summary = generate_summary(pdf_text)
        
        return jsonify({"summary": summary})
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary file
        if os.path.exists(pdf_path):
            try:
                os.remove(pdf_path)
                print(f"Removed temporary file: {pdf_path}")
            except Exception as e:
                print(f"Error removing temporary file: {str(e)}")

if __name__ == '__main__':
    print("Starting server...")
    app.run(debug=True, host='0.0.0.0', port=5000)