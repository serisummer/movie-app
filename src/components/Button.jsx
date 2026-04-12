import "./Button.css";

const Button = ({ text, callback = () => {} }) => {
  return <button onClick={callback}>{text}</button>;
};

export default Button;
