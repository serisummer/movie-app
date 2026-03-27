import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__navbar">
        <div className="header__logo__name">
          <img className="header__logo" src="/movie-svgrepo-com.svg"></img>
          <h1 className="header__name">The Movie App</h1>
        </div>

        <ul className="header__menu">
          <li className="header__menu_item">
            <a>Home</a>
          </li>
          <li className="header__menu_item">
            <a>Library</a>
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
