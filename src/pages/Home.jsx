import React, { useState, useEffect, useRef } from 'react';
import {
    FileText, Video, Presentation, Mic, Image, ArrowRight, Upload, Book, Globe,
    Play, Settings, Clock, Users, Brain, Code, Check, Menu, X, ChevronDown,
    Github, Twitter, Search, Bell, ArrowUp, ExternalLink, Mail,
    Download,
    Boxes,
    Bot,
    Layers,
    ChevronRight
} from 'lucide-react';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', options: ['Podcast', 'Video', 'Presentation', 'Graphics'] },
        { name: 'Solutions', options: ['Research', 'Education', 'Publishing'] },
        { name: 'Resources', options: ['Documentation', 'API', 'Examples'] },
        { name: 'Pricing', options: ['Personal', 'Team', 'Enterprise'] }
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-8">
                        <Logo isScrolled={isScrolled} />
                        <NavLinks links={navLinks} isScrolled={isScrolled} />
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex space-x-4">
                            <IconButton icon={Search} isScrolled={isScrolled} />
                            <IconButton icon={Bell} isScrolled={isScrolled} />
                        </div>
                        <CTAButton text="Get Started" />
                    </div>

                    <MobileMenuButton
                        isOpen={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        isScrolled={isScrolled}
                    />
                </div>

                <MobileMenu isOpen={isMenuOpen} links={navLinks} />
            </div>
        </nav>
    );
};

const Logo = ({ isScrolled }) => (
    <a href="/" className="flex items-center space-x-2">
        <Book className={`h-8 w-8 ${isScrolled ? 'text-blue-600' : 'text-blue-400'}`} />
        <span className={`text-2xl font-bold ${isScrolled ? 'text-slate-900' : 'text-white'
            }`}>PaperVerse</span>
    </a>
);

const NavLinks = ({ links, isScrolled }) => (
    <div className="hidden md:flex items-center space-x-6">
        {links.map(({ name, options }) => (
            <NavDropdown
                key={name}
                name={name}
                options={options}
                isScrolled={isScrolled}
            />
        ))}
    </div>
);

const NavDropdown = ({ name, options, isScrolled }) => (
    <div className="relative group">
        <button className={`flex items-center space-x-1 ${isScrolled ? 'text-slate-600' : 'text-white'
            } hover:text-blue-500 transition-colors`}>
            <span>{name}</span>
            <ChevronDown className="h-4 w-4" />
        </button>
        <div className="absolute top-full left-0 hidden group-hover:block pt-2">
            <div className="bg-white rounded-lg shadow-lg p-4 min-w-[200px]">
                {options.map(option => (
                    <a
                        key={option}
                        href="#"
                        className="block py-2 text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        {option}
                    </a>
                ))}
            </div>
        </div>
    </div>
);

const IconButton = ({ icon: Icon, isScrolled }) => (
    <button className={`p-2 rounded-lg ${isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'
        } transition-colors`}>
        <Icon className="h-5 w-5" />
    </button>
);

const CTAButton = ({ text }) => (
    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        {text}
    </button>
);

const MobileMenuButton = ({ isOpen, onClick, isScrolled }) => (
    <button
        className="md:hidden p-2 rounded-lg transition-colors"
        onClick={onClick}
    >
        {isOpen ?
            <X className={isScrolled ? 'text-slate-900' : 'text-white'} /> :
            <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
        }
    </button>
);

const MobileMenu = ({ isOpen, links }) => (
    isOpen && (
        <div className="md:hidden bg-white border-t py-4 absolute top-full left-0 right-0 shadow-lg">
            <div className="space-y-4 px-4">
                {links.map(({ name, options }) => (
                    <div key={name} className="space-y-2">
                        <div className="font-semibold text-slate-900">{name}</div>
                        {options.map(option => (
                            <a
                                key={option}
                                href="#"
                                className="block pl-4 py-2 text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                {option}
                            </a>
                        ))}
                    </div>
                ))}
                <CTAButton text="Get Started" />
            </div>
        </div>
    )
);

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isVisible && (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-6 w-6" />
        </button>
    );
};

const HeroSection = () => (
    <div className="bg-slate-900 text-white py-32 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-8">
                    Transform Research into
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {' '}Interactive Content
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                    Convert complex academic papers into engaging presentations, podcasts,
                    videos, and graphical abstracts using advanced AI technology
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors group">
                        <Upload className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                        Start Converting
                    </button>
                    <button className="bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:bg-slate-700 border border-slate-600 transition-colors group">
                        <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Watch Demo
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const initCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            particles = Array(150).fill().map(() => new Particle(canvas));
        };

        class Particle {
            constructor(canvas) {
                this.canvas = canvas;
                this.reset();
            }

            reset() {
                this.x = Math.random() * this.canvas.width;
                this.y = Math.random() * this.canvas.height;
                this.z = Math.random() * 2000 + 1000;
                this.size = Math.random() * 2 + 1;
                this.speed = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.6 + 0.4;
                this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
            }

            update() {
                this.z -= this.speed;
                this.opacity = Math.min(this.z / 1000, 1);
                if (this.z <= 100) this.reset();
            }

            draw(ctx) {
                const perspective = Math.max(1000 - this.z, 1);
                const scale = 1000 / perspective;
                const x = ((this.x - this.canvas.width / 2) * scale) + this.canvas.width / 2;
                const y = ((this.y - this.canvas.height / 2) * scale) + this.canvas.height / 2;
                const radius = Math.max(this.size * scale, 0.1);

                if (x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height) {
                    ctx.beginPath();
                    ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', initCanvas);
        initCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', initCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60"
            style={{ pointerEvents: 'none' }}
        />
    );
};

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

const FeatureCard = ({ feature, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative p-8 rounded-2xl transition-all duration-500 hover:transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${isHovered ? 'bg-white shadow-2xl border-2 border-blue-500' : 'bg-slate-50'
                }`} />

            <div className="relative z-10">
                <div className={`p-4 rounded-xl mb-6 inline-block ${isHovered ? 'bg-blue-100' : 'bg-white'
                    } transition-colors duration-300`}>
                    {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>

                <div className="space-y-4">
                    {feature.keyFeatures.map((feat, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center transition-all duration-300 ${isHovered ? 'transform translate-x-2' : ''
                                }`}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-slate-600">{feat}</span>
                        </div>
                    ))}
                </div>

                <button
                    className={`mt-8 flex items-center text-sm font-semibold ${isHovered ? 'text-blue-600' : 'text-slate-500'
                        } transition-colors duration-300 group`}
                >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

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

const CTASection = () => (
    <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your Research?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of researchers using PaperVerse to make their work more accessible and engaging
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Get Started for Free
            </button>
        </div>
    </section>
);

const LandingPage = () => (
    <div className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
        <ScrollToTop />
    </div>
);

export default LandingPage;