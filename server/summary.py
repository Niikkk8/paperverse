from flask import Flask, request, jsonify
import google.generativeai as genai
import PyPDF2
import os

app = Flask(_name_)

# Initialize Gemini with the provided API key
API_KEY = "AIzaSyAMdyIzEABk0TVSHVcGr2hScT2LIYU5Bjs"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

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

def generate_with_gemini(prompt, max_tokens=4096):
    """Generate content using Gemini model with improved parameters"""
    try:
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.3,
                "top_p": 0.9,
                "top_k": 40,
                "max_output_tokens": max_tokens
            }
        )
        return response.text
    except Exception as e:
        raise Exception(f"Error generating content with Gemini: {str(e)}")

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
    
    pdf_path = os.path.join("/tmp", file.filename)
    file.save(pdf_path)
    
    try:
        print("Extracting text from PDF...")
        pdf_text = extract_text_from_pdf(pdf_path)
        
        print("\nExtracted Text:")
        print("-" * 80)
        print(pdf_text)
        print("-" * 80)
        
        print("\nGenerating summary...")
        summary = generate_summary(pdf_text)
        
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if _name_ == '_main_':
    app.run(debug=True)