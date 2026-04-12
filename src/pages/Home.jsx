import { useState, useEffect } from "react";
import { useDebounce } from "react-use";

import Hero from "../components/Hero";
import Search from "../components/Search";
import Movies from "../components/Movies";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

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
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const [movies, setMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [moviesErrorMsg, setMoviesErrorMsg] = useState("");

  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(false);
  const [featuredErrorMsg, setFeaturedErrorMsg] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (query = "", currentPage = 1) => {
    setIsMoviesLoading(true);
    setMoviesErrorMsg("");
    try {
      const endpoint = query
        ? `${BASE_URL}search/movie?query=${encodeURIComponent(query)}&page=${currentPage}`
        : `${BASE_URL}discover/movie?sort_by=popularity.desc&page=${currentPage}`;
      const response = await fetch(endpoint, OPTIONS);
      if (response.ok) {
        const data = await response.json();
        setTotalPages(data.total_pages);
        if (currentPage === 1) {
          setMovies(data.results ?? []);
        } else {
          setMovies((prev) => [...prev, ...(data.results ?? [])]);
        }
      } else {
        setMoviesErrorMsg("Failed to fetch movies");
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
        setFeaturedMovies((data.results ?? []).slice(0, 10));
        return;
      } else {
        setFeaturedErrorMsg("Failed to fetch featured movies");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFeaturedLoading(false);
    }
  };

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

  useEffect(() => {
    setPage(1);
    fetchMovies(debouncedSearchTerm, 1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (page !== 1) {
      fetchMovies(debouncedSearchTerm, page);
    }
  }, [page]);

  return (
    <>
      {isFeaturedLoading ? (
        <Spinner />
      ) : (
        <Hero
          key={featuredIndex}
          featuredErrorMsg={featuredErrorMsg}
          movie={featuredMovies[featuredIndex]}
          timeLeft={timeLeft}
        />
      )}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Movies
        errorMessage={moviesErrorMsg}
        movies={movies}
        query={debouncedSearchTerm}
      />
      {isMoviesLoading ? (
        <Spinner />
      ) : (
        totalPages > page && (
          <Button
            text="Load More"
            callback={() => setPage((prev) => prev + 1)}
          />
        )
      )}
    </>
  );
};

export default Home;
