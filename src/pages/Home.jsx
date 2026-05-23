import { useState, useEffect, useRef } from "react";
import { useDebounce } from "react-use";
import { useSearchParams } from "react-router-dom";

import Hero from "../components/Hero";
import Search from "../components/Search";
import Movies from "../components/Movies";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import PageNav from "../components/PageNav";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") ?? "");
  const debouncedSearchTerm = searchParams.get("query") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1");

  const isFirstRender = useRef(true);
  useDebounce(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      setSearchParams({ query: searchTerm, page: "1" });
    },
    500,
    [searchTerm],
  );

  const [totalPages, setTotalPages] = useState(1);

  const [movies, setMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [moviesErrorMsg, setMoviesErrorMsg] = useState("");

  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(false);
  const [featuredErrorMsg, setFeaturedErrorMsg] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

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
      } else {
        setFeaturedErrorMsg("Failed to fetch featured movies");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFeaturedLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, page);
  }, [debouncedSearchTerm, page]);

  // featured movies
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
        onMovieClick={handleMovieClick}
      />
      {isMoviesLoading ? (
        <Spinner />
      ) : (
        totalPages > page && (
          <Button
            text="Load More"
            callback={() =>
              setSearchParams({
                query: debouncedSearchTerm,
                page: String(page + 1),
              })
            }
          />
        )
      )}
      <PageNav
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setSearchParams}
      />
    </>
  );
};

export default Home;
