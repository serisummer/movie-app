import "./SearchBar.css";
import { useState, useRef } from "react";
import { useDebounce } from "react-use";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const { query } = useParams(); // only has a value when on /search/:query
  const [searchTerm, setSearchTerm] = useState(query ?? "");
  const isFirstRender = useRef(true);

  useDebounce(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      const term = searchTerm.trim();
      if (term) {
        navigate(`/search/${encodeURIComponent(term)}`, { replace: true });
      } else {
        navigate("/");
      }
    },
    500,
    [searchTerm],
  );

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

export default SearchBar;
