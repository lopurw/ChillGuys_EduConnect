
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li className="navItem">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
          >
            EduConnect
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
          >
            Вход
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
          >
            Регистрация
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
