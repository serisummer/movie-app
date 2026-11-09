import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Common/Header";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
