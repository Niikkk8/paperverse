import { Menu, X } from "lucide-react";

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

export default MobileMenuButton;