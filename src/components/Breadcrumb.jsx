import "./Breadcrumb.css";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title }) => {
  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link>
      <span className="separator">|</span>
      <span className="current">{title}</span>
    </nav>
  );
};

export default Breadcrumb;
