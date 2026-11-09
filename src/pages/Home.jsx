import { useState, useEffect, useRef } from "react";

import Hero from "../components/Home/Hero";
import Movies from "../components/Common/Movies";
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

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [moviesErrorMsg, setMoviesErrorMsg] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  const fetchPopularMovies = async () => {
    setIsMoviesLoading(true);
    setMoviesErrorMsg("");
    try {
      const endpoint = `${BASE_URL}discover/movie?sort_by=popularity.desc&page=1`;
      const response = await fetch(endpoint, OPTIONS);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.results ?? []);
      } else {
        setMoviesErrorMsg("Failed to fetch movies");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsMoviesLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // featured movies
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % movies.length);
      setTimeLeft(10);
    }, 10000);
    return () => clearInterval(interval);
  }, [movies]);

  useEffect(() => {
    setTimeLeft(10);
    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [featuredIndex]);

  // preserve scroll position
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
      {isMoviesLoading ? (
        <Spinner />
      ) : (
        <Hero
          key={featuredIndex}
          errorMsg={moviesErrorMsg}
          movie={movies[featuredIndex]}
          timeLeft={timeLeft}
        />
      )}
      <Movies
        errorMessage={moviesErrorMsg}
        movies={movies}
        onMovieClick={handleMovieClick}
      />
    </>
  );
};

export default Home;
