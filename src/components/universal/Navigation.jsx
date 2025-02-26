import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Search, Menu, X, ChevronDown, FileText } from "lucide-react";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    
    // Check if we're on the upload page
    const isUploadPage = location.pathname === "/upload";

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

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    const handleDropdownToggle = (linkName) => {
        setActiveDropdown(activeDropdown === linkName ? null : linkName);
    };

    // Determine navigation background
    const getNavBackground = () => {
        if (isUploadPage) {
            return isScrolled ? 'bg-white shadow-md' : 'bg-white';
        } else {
            return isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-md' : 'bg-slate-900';
        }
    };

    // Determine text color for main items
    const getTextColor = () => {
        if (isUploadPage) {
            return 'text-gray-800 hover:text-blue-600';
        } else {
            return 'text-slate-300 hover:text-blue-400';
        }
    };

    // Determine logo color
    const getLogoColor = () => {
        if (isUploadPage) {
            return 'text-blue-600';
        } else {
            return 'text-blue-400';
        }
    };

    // Determine logo text color
    const getLogoTextColor = () => {
        if (isUploadPage) {
            return 'text-gray-900';
        } else {
            return 'text-white';
        }
    };

    // Determine dropdown background
    const getDropdownBg = () => {
        if (isUploadPage) {
            return 'bg-white';
        } else {
            return 'bg-slate-800';
        }
    };

    // Determine dropdown hover state
    const getDropdownHoverBg = () => {
        if (isUploadPage) {
            return 'hover:bg-gray-100 hover:text-blue-600';
        } else {
            return 'hover:bg-slate-700 hover:text-blue-400';
        }
    };

    // Determine dropdown text color
    const getDropdownTextColor = () => {
        if (isUploadPage) {
            return 'text-gray-700';
        } else {
            return 'text-slate-300';
        }
    };

    // Get button style based on page and scroll state
    const getButtonStyle = () => {
        if (isUploadPage) {
            return 'bg-blue-600 text-white hover:bg-blue-700';
        } else {
            return 'bg-blue-600 text-white hover:bg-blue-700';
        }
    };

    // Get mobile menu border color
    const getMobileBorderColor = () => {
        if (isUploadPage) {
            return 'border-gray-200';
        } else {
            return 'border-slate-700';
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${getNavBackground()}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <FileText className={`w-8 h-8 ${getLogoColor()}`} />
                        <span className={`ml-2 text-xl font-bold ${getLogoTextColor()}`}>
                            PaperVerse
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {/* Navigation Links */}
                        <div className="flex space-x-8">
                            {navLinks.map((link) => (
                                <div 
                                    key={link.name}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(link.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button 
                                        className={`flex items-center font-medium ${getTextColor()} transition-colors`}
                                    >
                                        {link.name}
                                        <ChevronDown className="w-4 h-4 ml-1" />
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    <div className={`absolute left-0 mt-2 w-56 ${getDropdownBg()} rounded-lg shadow-lg overflow-hidden transition-opacity duration-200 ${
                                        activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                                    }`}>
                                        <div className="py-2">
                                            {link.options.map((option) => (
                                                <a 
                                                    key={option}
                                                    href="#" 
                                                    className={`block px-4 py-2 ${getDropdownTextColor()} ${getDropdownHoverBg()}`}
                                                >
                                                    {option}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Icon Buttons */}
                        <div className="flex items-center space-x-4">
                            <button className={`p-2 rounded-full ${getTextColor()}`}>
                                <Search className="w-5 h-5" />
                            </button>
                            <button className={`p-2 rounded-full ${getTextColor()}`}>
                                <Bell className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Get Started Button */}
                        <Link to="/upload" className={`px-6 py-2 rounded-lg font-medium transition-colors ${getButtonStyle()}`}>
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden p-2 rounded-md ${getTextColor()}`}
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className={`py-4 border-t ${getMobileBorderColor()}`}>
                        {navLinks.map((link) => (
                            <div key={link.name} className="py-2">
                                <button
                                    className={`flex items-center justify-between w-full py-2 ${getTextColor()}`}
                                    onClick={() => handleDropdownToggle(link.name)}
                                >
                                    <span className="font-medium">{link.name}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${
                                        activeDropdown === link.name ? 'rotate-180' : 'rotate-0'
                                    }`} />
                                </button>
                                
                                {/* Mobile Dropdown */}
                                <div className={`mt-2 pl-4 space-y-2 transition-all duration-200 ${
                                    activeDropdown === link.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                }`}>
                                    {link.options.map((option) => (
                                        <a
                                            key={option}
                                            href="#"
                                            className={`block py-2 ${getDropdownTextColor()}`}
                                        >
                                            {option}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                        {/* Mobile Action Buttons */}
                        <div className={`flex items-center justify-between mt-4 pt-4 border-t ${getMobileBorderColor()}`}>
                            <div className="flex space-x-4">
                                <button className={`p-2 rounded-full ${getTextColor()}`}>
                                    <Search className="w-5 h-5" />
                                </button>
                                <button className={`p-2 rounded-full ${getTextColor()}`}>
                                    <Bell className="w-5 h-5" />
                                </button>
                            </div>
                            <Link
                                to="/upload"
                                className={`px-5 py-2 rounded-lg font-medium ${getButtonStyle()}`}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;