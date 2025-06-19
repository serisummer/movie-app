import "./MovieCard.css";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie">
      <img
        className="movie__poster"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/src/assets/no-image-svgrepo-com.svg"
        }
      ></img>
      <p className="movie__title">{title}</p>
      <p className="movie__details">
        {vote_average ? vote_average.toFixed(1) : "N/A"} •
        {release_date ? release_date.split("-")[0] : "N/A"} •
        {original_language ? original_language.toUpperCase() : "N/A"}
      </p>
    </div>
  );
};

export default MovieCard;
