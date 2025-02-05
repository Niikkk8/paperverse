import { Book } from "lucide-react";

const Logo = ({ isScrolled }) => (
    <a href="/" className="flex items-center space-x-2">
        <Book className={`h-8 w-8 ${isScrolled ? 'text-blue-600' : 'text-blue-400'}`} />
        <span className={`text-2xl font-bold ${isScrolled ? 'text-slate-900' : 'text-white'
            }`}>PaperVerse</span>
    </a>
);

export default Logo;