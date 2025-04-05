import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState } from 'react';
import logo from '../assets/luis-logo.png'; // Use your actual logo here

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Luis Logo" className="logo-img" />
          </Link>
        </div>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <div className="nav-menu">
            <ul onClick={() => setIsOpen(false)}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/articles">Article</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <button className="login-btn">Sign Up</button>
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
