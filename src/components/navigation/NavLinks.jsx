import NavDropdown from './NavDropdown';

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

export default NavLinks;