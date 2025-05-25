import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState, useEffect } from 'react';
import logo from '../assets/luis-logo.png';

function Navbar() {
  const [firstName, setFirstName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('firstName');
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('type');
    navigate('/');
  };

  return (
    <nav className="navbar" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/home">
            <img src={logo} alt="Luis Logo" className="logo-img" />
          </Link>
          {firstName && <span className="navbar-greeting">Welcome, {firstName}!</span>}
        </div>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <div className="nav-menu">
            <ul onClick={() => setIsOpen(false)}>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/articles">Article</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <button className="login-btn" onClick={handleLogout}>
            Logout
          </button>
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