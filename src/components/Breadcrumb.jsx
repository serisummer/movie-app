import "./Breadcrumb.css";
import { Link, useNavigate } from "react-router-dom";

const Breadcrumb = ({ title }) => {
  const navigate = useNavigate();

  return (
    <nav className="breadcrumb">
      <Link onClick={() => navigate(-1)}>Back</Link>
      <span className="separator">|</span>
      <span className="current">{title}</span>
    </nav>
  );
};

export default Breadcrumb;
