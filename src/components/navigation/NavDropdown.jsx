import { ChevronDown } from "lucide-react";

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

export default NavDropdown;