import "./Movies.css";
import MovieCard from "./MovieCard";

const Movies = ({ isLoading, errorMessage, movies, query }) => {
  return (
    <div className="movies">
      {isLoading ? (
        <p className="movies__status">Loading...</p>
      ) : errorMessage ? (
        <p className="movies__status">{errorMessage}</p>
      ) : (
        <div className="movies__list">
          <div className="movies__list__header">
            {query ? (
              <h2 className="movies__list__header_text">
                Total Results: {movies.length}
              </h2>
            ) : (
              <h2 className="movies__list__header_text">Popular</h2>
            )}
          </div>
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
