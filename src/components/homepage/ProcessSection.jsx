import { Brain, Download, Settings, Upload } from "lucide-react";
import { useState } from "react";

const ProcessSection = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            icon: Upload,
            title: "Upload Paper",
            description: "Upload your research paper in PDF, Word, or LaTeX format",
        },
        {
            icon: Brain,
            title: "AI Processing",
            description: "Our AI analyzes and extracts key information from your paper",
        },
        {
            icon: Settings,
            title: "Choose Format",
            description: "Select your preferred output format and customize options",
        },
        {
            icon: Download,
            title: "Download",
            description: "Get your transformed content in your chosen format",
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-slate-600">
                        Transform your research paper in four simple steps
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-4xl mx-auto mb-12 px-4">
                    <div className="relative h-1 bg-slate-100 rounded">
                        <div
                            className="absolute left-0 top-0 h-full bg-blue-500 rounded transition-all duration-500"
                            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                        />
                        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1/2">
                            {steps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${index <= activeStep
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'bg-white border-slate-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Steps */}
                <div className="max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-start p-6 rounded-lg transition-all duration-500 ${index === activeStep ? 'bg-blue-50' : 'opacity-50'
                                }`}
                        >
                            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${index === activeStep ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'
                                }`}>
                                <step.icon size={24} />
                            </div>
                            <div className="ml-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
                        className={`px-6 py-2 mr-4 rounded-lg ${activeStep === 0
                            ? 'bg-slate-100 text-slate-400'
                            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                            }`}
                        disabled={activeStep === 0}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => activeStep < steps.length - 1 && setActiveStep(activeStep + 1)}
                        className={`px-6 py-2 rounded-lg ${activeStep === steps.length - 1
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        {activeStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;