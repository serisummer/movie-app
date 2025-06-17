import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Search from "./components/Search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <Header />
      <Hero />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <p>{searchTerm}</p>
    </main>
  );
};

export default App;
