import { Movie } from "types/movie";
import "./styles.css";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-container">
      <div className="movie-card base-card">
        <h1>{movie.title}</h1>
        <img src={movie.imgUrl} alt={movie.title} />
        <div className="movie-content">
          <p>{movie.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
