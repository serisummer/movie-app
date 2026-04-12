import { useState, useEffect } from "react";
import { useDebounce } from "react-use";

import Hero from "./components/Hero";
import Search from "./components/Search";
import Movies from "./components/Movies";
import Spinner from "./components/Spinner";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [moviesErrorMsg, setMoviesErrorMsg] = useState(false);

  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(false);
  const [featuredErrorMsg, setFeaturedErrorMsg] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsMoviesLoading(true);
    setMoviesErrorMsg("");
    try {
      const endpoint = query
        ? `${BASE_URL}search/movie?query=${encodeURIComponent(query)}`
        : `${BASE_URL}discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, OPTIONS);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.results ?? []);
        return;
      } else {
        setMoviesErrorMsg("Failed to fetch movies");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsMoviesLoading(false);
    }
  };

  const fetchFeaturedMovies = async () => {
    setIsFeaturedLoading(true);
    setFeaturedErrorMsg("");
    try {
      const endpoint = `${BASE_URL}discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, OPTIONS);
      if (response.ok) {
        const data = await response.json();
        setFeaturedMovies(data.results.slice(0, 10) ?? []);
        return;
      } else {
        setFeaturedErrorMsg("Failed to fetch movies");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFeaturedLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchFeaturedMovies();
  }, []);

  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredMovies.length);
      setTimeLeft(10);
    }, 10000);
    return () => clearInterval(interval);
  }, [featuredMovies]);

  useEffect(() => {
    setTimeLeft(10);
    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [featuredIndex]);

  return (
    <>
      <div key={featuredIndex}>
        <Hero movie={featuredMovies[featuredIndex]} timeLeft={timeLeft} />
      </div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Movies
        isLoading={isMoviesLoading}
        errorMessage={moviesErrorMsg}
        movies={movies}
        query={debouncedSearchTerm}
      />
      <Spinner />
    </>
  );
};

export default Home;
