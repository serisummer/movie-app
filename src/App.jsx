import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Movies from "./components/Movies";
import { useDebounce } from "react-use";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  return (
    <main>
      <Header />
      <Hero />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Movies query={debouncedSearchTerm} />
    </main>
  );
};

export default App;
