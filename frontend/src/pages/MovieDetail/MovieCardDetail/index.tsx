import { Movie } from "types/movie";
import "./styles.css";

type Props = {
  movie: Movie;
};

const MovieDetailCard = ({ movie }: Props) => {
  return (
    <div className="movie-detail-container">
      <div className="movie-detail-card base-card">
        <div className="movie-detail-img">
          <img src={movie.imgUrl} alt={movie.title} />
        </div>
        <div className="movie-detail-card-info">
          <h1>{movie.title}</h1>
          <h4>{movie.year}</h4>
          <p>{movie.subTitle}</p>
          <div className="movie-detail-synopsis">
            <p>{movie.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
