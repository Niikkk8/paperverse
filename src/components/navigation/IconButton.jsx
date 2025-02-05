const IconButton = ({ icon: Icon, isScrolled }) => (
    <button className={`p-2 rounded-lg ${isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'
        } transition-colors`}>
        <Icon className="h-5 w-5" />
    </button>
);

export default IconButton;