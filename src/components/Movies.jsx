import { useEffect, useState } from "react";
import "./Movies.css";
import MovieCard from "./MovieCard";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/";
const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const Movies = ({ query }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    try {
      const endpoint = query
        ? `${BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, OPTIONS);
      if (!response.ok) {
        setErrorMessage("Failed to fetch movies");
        return;
      } else {
        const data = await response.json();
        setMovies(data.results);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(query);
  }, [query]);

  return (
    <div className="movies">
      {isLoading ? (
        <p className="movies__status">Loading...</p>
      ) : errorMessage ? (
        <p className="movies__status">{errorMessage}</p>
      ) : (
        <div className="movies__list">
          {query ? (
            <p className="movies__list__header">
              Total Results: {movies.length}
            </p>
          ) : (
            <h2 className="movies__list__header">POPULAR</h2>
          )}
          <ul className="movies__list__movies">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Movies;
