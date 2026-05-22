import "./Header.css";
import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__navbar">
        <Link to="/" className="header__logo__name">
          <img className="header__logo" src="/movie-svgrepo-com.svg"></img>
          <h1 className="header__name">Cinnie</h1>
        </Link>
        <ul className="header__menu">
          <li className="header__menu__item">
            <Button
              text="Lists"
              callback={() => alert("Lists functionality coming soon!")}
            />
          </li>
          <li className="header__menu__item">
            <Button
              text="Login"
              callback={() => alert("Login functionality coming soon!")}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
