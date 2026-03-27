import "./Search.css";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div className="search__container">
        <img className="search__img" src="/search-alt-2-svgrepo-com.svg" />
        <input
          className="search__input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
