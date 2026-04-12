import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__navbar">
        <Link to="/" className="header__logo__name">
          <img className="header__logo" src="/movie-svgrepo-com.svg"></img>
          <h1 className="header__name">The Movie App</h1>
        </Link>
        <ul className="header__menu">
          <li className="header__menu_item">
            <Link to="/favorites">Favorites</Link>
          </li>
          <li className="header__menu_item">
            <a>Sign In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
