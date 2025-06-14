import "./App.css";

const App = () => {
  return (
    <main>
      <header className="header">
        <nav className="header__navbar">
          <img className="header__logo" src="/vite.svg"></img>
          <h1 className="header__name">Music App</h1>
          <ul className="header__menu">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Library</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="hero"></div>
    </main>
  );
};

export default App;
