import "./Search.css";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <img
        className="search__img"
        src="/src/assets/search-alt-2-svgrepo-com.svg"
      />
      <input
        className="search__input"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  );
};

export default Search;
