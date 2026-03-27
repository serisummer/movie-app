import "./Hero.css";

const Hero = ({ movie, timeLeft, key }) => {
  if (!movie) return null;
  const { title, overview, backdrop_path } = movie;
  const bgUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
    : "/no-image.svg";

  return (
    <div className="hero" style={{ "--bg-url": `url(${bgUrl})` }}>
      <div className="hero__underlay" />
      <div className="hero__countdown">{timeLeft}</div>
      <div className="hero__content">
        <h2 className="hero__title">{title}</h2>
        <p className="hero__description">{overview}</p>
      </div>
    </div>
  );
};

export default Hero;
