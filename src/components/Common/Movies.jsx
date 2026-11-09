import "./Movies.css";
import MovieCard from "./MovieCard";

const Movies = ({ errorMessage, movies, onMovieClick }) => {
  return (
    <div className="movies">
      {errorMessage ? (
        <p className="movies__status">{errorMessage}</p>
      ) : (
        <div className="movies__list">
          <ul className="movies__list__movies">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={onMovieClick}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Movies;
