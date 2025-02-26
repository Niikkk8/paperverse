import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileUp, ArrowLeft, File, X, Check, Upload as UploadIcon, Loader2, ChevronRight, FileText } from 'lucide-react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const options = [
    {
      id: 'podcast',
      label: 'Podcast',
      description: 'Convert to an immersive audio experience',
      icon: '🎧'
    },
    {
      id: 'video',
      label: 'Video',
      description: 'Transform into engaging video content',
      icon: '🎬'
    },
    {
      id: 'presentation',
      label: 'Presentation',
      description: 'Create slides for your research',
      icon: '📊'
    },
    {
      id: 'graphics',
      label: 'Graphical Abstract',
      description: 'Visual summary of key findings',
      icon: '📈'
    },
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError(null); // Clear any previous errors
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setSummaryLoading(true);
    setError(null);

    try {
      // Create form data for the API request
      const formData = new FormData();
      formData.append('file', file);

      // Send to Flask backend
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);
      setUploadComplete(true);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to process your PDF. Please try again.');
    } finally {
      setIsUploading(false);
      setSummaryLoading(false);
    }
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadComplete(false);
    setSelectedOption(null);
    setSummary("");
    setError(null);
  };

  // Final optimized formatSummary function for handling academic summaries
  const formatSummary = (text) => {
    if (!text) return [];

    try {
      // First clean up the text by removing any leading numbers with markdown symbols
      let cleanedText = text.replace(/^\d+\.\s+##\s+/, '');

      // Match section headers with numbers, possibly followed by markdown and/or keywords like "OVERVIEW"
      const sectionRegex = /(\d+)\.\s+(?:##\s+)?(?:\*\*)?([\w\s&]+?)(?:\*\*)?(?:\n|\r|$)/g;
      const sections = [];
      let lastIndex = 0;
      let match;

      // Find all section headers
      const matches = Array.from(cleanedText.matchAll(sectionRegex));

      if (matches.length === 0) {
        // Fallback: If no matches found, try splitting by numbered sections
        return cleanedText.split(/\d+\.\s+/)
          .filter(section => section.trim().length > 0)
          .map(section => {
            const lines = section.trim().split('\n');
            const title = lines[0].replace(/\*\*/g, '').trim();
            const content = lines.slice(1).join('\n').trim();
            return { title, content };
          });
      }

      // Process each matched section
      for (let i = 0; i < matches.length; i++) {
        match = matches[i];
        const title = match[2].trim();
        const startIndex = match.index + match[0].length;
        const endIndex = i < matches.length - 1 ? matches[i + 1].index : cleanedText.length;

        // Extract content between this header and the next (or end of text)
        let content = cleanedText.substring(startIndex, endIndex).trim();

        // Clean up content - remove asterisks, handle line breaks
        content = content.replace(/\*\*/g, '');

        sections.push({ title, content });
      }

      // Handle edge case: If we have a header at the beginning that wasn't matched
      if (matches.length > 0 && matches[0].index > 0) {
        const initialText = cleanedText.substring(0, matches[0].index).trim();
        if (initialText) {
          const lines = initialText.split('\n');
          const title = lines[0].replace(/\*\*/g, '').trim();
          const content = lines.slice(1).join('\n').trim();
          sections.unshift({ title, content });
        }
      }

      return sections;
    } catch (error) {
      console.error("Error formatting summary:", error);

      // Fallback simple approach
      return text.split(/\d+\.\s+/)
        .filter(section => section.trim().length > 0)
        .map(section => {
          const lines = section.trim().split('\n');
          return {
            title: lines[0].replace(/\*\*|##/g, '').trim(),
            content: lines.slice(1).join('\n').trim()
          };
        });
    }
  };

  const formattedSummary = formatSummary(summary);

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Upload Your Research Paper</h1>
            <p className="text-gray-600 mb-8">Upload your PDF file to start the conversion process</p>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 mb-6">
                <p className="font-medium">{error}</p>
              </div>
            )}

            {!file && !uploadComplete && (
              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileUp className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Drag and drop your PDF here</h3>
                  <p className="text-gray-500 mb-6">or</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors group"
                  >
                    <UploadIcon className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                    Browse Files
                  </button>
                  <p className="text-sm text-gray-500 mt-6">Supports PDF files up to 20MB</p>
                </div>
              </div>
            )}

            {file && !uploadComplete && (
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-blue-600 p-3 rounded-lg mr-4">
                      <File className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{file.name}</h3>
                      <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors group ${isUploading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <UploadIcon className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                        Process PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {uploadComplete && (
              <div className="space-y-8">
                <div className="flex items-center bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium">File processed successfully!</span>
                </div>

                {/* Paper Summary Section */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center">
                    <FileText className="w-5 h-5 text-gray-700 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Paper Summary</h3>
                  </div>
                  <div className="p-4 max-h-[500px] overflow-y-auto">
                    {summaryLoading ? (
                      <div className="flex justify-center items-center py-10">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        <p className="ml-3 text-gray-600">Generating summary...</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {formattedSummary.length > 0 ? (
                          formattedSummary.map((section, idx) => (
                            <div key={idx} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                              <h4 className="font-bold text-gray-900 mb-2">{idx + 1}. {section.title}</h4>
                              <div className="text-gray-700 whitespace-pre-line">{section.content}</div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600 italic">Summary could not be generated. Please try again.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Conversion Format Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose a conversion format:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((option) => (
                      <div
                        key={option.id}
                        className={`border rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-md ${selectedOption === option.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                          }`}
                        onClick={() => handleOptionSelect(option.id)}
                      >
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{option.icon}</div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-gray-900">{option.label}</h4>
                            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedOption === option.id
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300'
                              }`}
                          >
                            {selectedOption === option.id && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    onClick={resetUpload}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Upload a different file
                  </button>

                  <button
                    disabled={!selectedOption}
                    className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors group ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}