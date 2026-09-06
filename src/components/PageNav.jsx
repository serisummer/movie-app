import "./PageNav.css";
import Button from "./Button";

const PageNav = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="page-nav">
      <Button
        text="Prev"
        callback={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <span>
        {currentPage} / {totalPages}
      </span>
      <Button
        text="Next"
        callback={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default PageNav;
