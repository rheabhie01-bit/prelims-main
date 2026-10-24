import React from 'react'; 

const Navbar = ({ activePage, setActivePage }) => {
const navLinks = ['Home', 'Profile', 'Subjects', 'About'];

  return (
    <nav className="navbar"> 
      <ul>
        {navLinks.map((link) => (
          <li key={link}>
            <button onClick={() => setActivePage(link.toLowerCase())}>
              {link}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default Navbar; 