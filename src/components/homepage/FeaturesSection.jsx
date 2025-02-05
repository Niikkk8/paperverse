import { Bot, Boxes, ChevronRight, Layers, Play } from "lucide-react";
import { useState } from "react";

const features = [
    {
        title: "3D Podcast Experience",
        icon: <Boxes className="w-12 h-12 text-blue-600" />,
        description: "Immerse yourself in a 3D environment while consuming research content.",
        keyFeatures: [
            "Immersive 3D environment",
            "Interactive audio elements",
            "Synchronized content display",
            "Spatial audio experience"
        ],
        category: "Audio",
        cta: "Try 3D Podcast",
        preview: "Explore the immersive experience"
    },
    {
        title: "RAG Research Assistant",
        icon: <Bot className="w-12 h-12 text-blue-600" />,
        description: "AI-powered research assistant with context-aware responses using RAG.",
        keyFeatures: [
            "3D voicebot interface",
            "Context-aware responses",
            "RAG integration",
            "Real-time assistance"
        ],
        category: "Voicebot",
        cta: "Meet Your Assistant",
        preview: "Experience AI assistance"
    },
    {
        title: "Graphical Abstracts",
        icon: <Layers className="w-12 h-12 text-blue-600" />,
        description: "Automated generation of publication-ready visual research summaries.",
        keyFeatures: [
            "Automated visualization",
            "Key findings emphasis",
            "Publication standards",
            "Custom styling options"
        ],
        category: "Graphics",
        cta: "Generate Abstract",
        preview: "See example abstracts"
    },
    {
        title: "Video Generation",
        icon: <Play className="w-12 h-12 text-blue-600" />,
        description: "Transform research papers into engaging video presentations.",
        keyFeatures: [
            "Automated summaries",
            "Visual storytelling",
            "Professional editing",
            "Multiple formats"
        ],
        category: "Video",
        cta: "Create Video",
        preview: "Watch sample videos"
    }
];

const FeaturesSection = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const categories = ['All', 'Audio', 'Voicebot', 'Graphics', 'Video'];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">
                        Transform Your Research
                    </h2>
                    <p className="text-lg text-slate-600">
                        Convert complex research into engaging multimedia formats
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-slate-100 rounded-xl p-1">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-lg transition-all duration-300 ${activeCategory === category
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-slate-600 hover:text-blue-600'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {features
                        .filter(feature => activeCategory === 'All' || feature.category === activeCategory)
                        .map((feature, index) => (
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => setHoveredFeature(index)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div className={`p-8 rounded-2xl transition-all duration-300 ${hoveredFeature === index
                                    ? 'bg-blue-50 transform -translate-y-1'
                                    : 'bg-slate-50 hover:bg-slate-100'
                                    }`}>
                                    {/* Icon */}
                                    <div className="inline-flex p-3 rounded-xl bg-white shadow-sm mb-6">
                                        {feature.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 mb-6">{feature.description}</p>

                                    {/* Features List */}
                                    <ul className="space-y-3 mb-8">
                                        {feature.keyFeatures.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center text-slate-700"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <div className="flex justify-between items-center">
                                        <button className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                                            {feature.cta}
                                            <ChevronRight className="inline-block ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                        <span className="text-sm text-slate-500">{feature.preview}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;