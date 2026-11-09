import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Movie/Breadcrumb";
import Spinner from "../components/Common/Spinner";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/";
const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}movie/${id}`, OPTIONS);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      } else {
        setError("Failed to fetch movie details.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return (
    <>
      {isLoading && <Spinner />}
      {error && <p className="error">{error}</p>}
      {movie && (
        <div className="movie-details">
          <Breadcrumb title={movie.title} />
        </div>
      )}
    </>
  );
};

export default Movie;
