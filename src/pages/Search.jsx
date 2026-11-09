import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PageNav from "../components/Search/PageNav";
import Movies from "../components/Common/Movies";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/";
const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const Search = () => {
  const { query } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  const [movies, setMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [moviesErrorMsg, setMoviesErrorMsg] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setTotalPages(1);
      return;
    }
    let ignore = false;

    const fetchMovies = async () => {
      setIsMoviesLoading(true);
      setMoviesErrorMsg("");
      try {
        const endpoint = `${BASE_URL}search/movie?query=${encodeURIComponent(query)}&page=${page}`;
        const response = await fetch(endpoint, OPTIONS);
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        if (ignore) return;
        setTotalPages(Math.min(data.total_pages, 500));
        setMovies(data.results ?? []);
      } catch (error) {
        if (!ignore) setMoviesErrorMsg("Failed to fetch movies");
        console.error(error);
      } finally {
        if (!ignore) setIsMoviesLoading(false);
      }
    };

    fetchMovies();
    return () => {
      ignore = true;
    };
  }, [query, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: String(newPage) });
    window.scrollTo(0, 0);
  };

  const handleMovieClick = () => {
    sessionStorage.setItem("scrollY", window.pageYOffset);
  };

  const hasRestoredScroll = useRef(false);
  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (
      scrollY &&
      !isMoviesLoading &&
      movies.length > 0 &&
      !hasRestoredScroll.current
    ) {
      hasRestoredScroll.current = true;
      sessionStorage.removeItem("scrollY");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(scrollY));
        });
      });
    }
  }, [isMoviesLoading, movies]);

  return (
    <>
      <Movies
        errorMessage={moviesErrorMsg}
        movies={movies}
        onMovieClick={handleMovieClick}
      />
      {totalPages > 1 && (
        <PageNav
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Search;
