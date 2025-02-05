const StatsSection = () => {
    const stats = [
        { value: "50K+", label: "Papers Processed" },
        { value: "100+", label: "Universities" },
        { value: "98%", label: "Satisfaction Rate" },
        { value: "24/7", label: "Support" }
    ];

    return (
        <section className="py-20 bg-blue-600 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6">
                            <div className="text-4xl font-bold mb-2">{stat.value}</div>
                            <div className="text-blue-100">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;