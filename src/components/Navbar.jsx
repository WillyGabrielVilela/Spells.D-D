import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className={`navbar-logo ${location.pathname === '/' ? 'active' : ''}`}>Spells.D&D</Link>
      <div className="navbar-menu">
        <Link to="/spells" className={`navbar-link ${location.pathname === '/spells' ? 'active' : ''}`}>Magias</Link>
        <Link to="/favorites" className={`navbar-link ${location.pathname === '/favorites' ? 'active' : ''}`}>Favoritas</Link>
        <Link to="/glossary" className={`navbar-link ${location.pathname === '/glossary' ? 'active' : ''}`}>Glossário</Link>
      </div>
    </nav>
  );
};

export default Navbar;
