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
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                </button>
            </div>
        </div>
    )
);

export default MobileMenu;