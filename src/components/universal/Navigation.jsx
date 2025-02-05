import { useEffect, useState } from "react";
import Logo from './../navigation/Logo';
import NavLinks from './../navigation/NavLinks';
import IconButton from './../navigation/IconButton';
import MobileMenuButton from './../navigation/MobileMenuButton';
import MobileMenu from './../navigation/MobileMenu';
import { Bell, Search } from "lucide-react";

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
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Get Started
                        </button>
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

export default Navigation;