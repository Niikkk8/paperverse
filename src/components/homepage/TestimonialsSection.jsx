const TestimonialsSection = () => {
    const testimonials = [
        {
            quote: "PaperVerse has revolutionized how we present our research. The AI-powered conversions are incredibly accurate and save us hours of work.",
            author: "Dr. Sarah Chen",
            role: "Research Director",
            institution: "Stanford University"
        },
        {
            quote: "The ability to convert complex papers into engaging video content has helped us reach a much wider audience. It's an invaluable tool for science communication.",
            author: "Prof. Michael Thompson",
            role: "Department Head",
            institution: "MIT"
        },
        {
            quote: "As a PhD student, PaperVerse helps me create professional presentations and graphical abstracts in minutes. It's a game-changer for academic conferences.",
            author: "Emma Rodriguez",
            role: "PhD Candidate",
            institution: "Harvard University"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4 text-slate-900">
                    What Researchers Say
                </h2>
                <p className="text-xl text-center mb-16 text-slate-600 max-w-3xl mx-auto">
                    Join thousands of researchers who trust PaperVerse
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-slate-50 p-8 rounded-2xl">
                            <div className="text-slate-600 mb-6">{testimonial.quote}</div>
                            <div>
                                <div className="font-semibold text-slate-900">{testimonial.author}</div>
                                <div className="text-slate-500 text-sm">{testimonial.role}</div>
                                <div className="text-slate-500 text-sm">{testimonial.institution}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;