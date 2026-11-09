import "./Button.css";

const Button = ({ text, callback = () => {}, disabled = false }) => {
  return (
    <button onClick={callback} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
