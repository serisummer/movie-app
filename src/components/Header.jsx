import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__navbar">
        <div className="header__logo__name">
          <img
            className="header__logo"
            src="/src/assets/music-player-music-tape-svgrepo-com.svg"
          ></img>
          <h1 className="header__name">Music App</h1>
        </div>

        <ul className="header__menu">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Library</a>
          </li>
          <li>
            <a>Sign In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
