import { Movie } from "types/movie";
import "./styles.css";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-container">
      <div className="movie-card base-card">
        <img src={movie.imgUrl} alt={movie.title} />
        <div className="movie-card-info">
          <h1>{movie.title}</h1>
          <h4>{movie.year}</h4>
          <p>{movie.subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
