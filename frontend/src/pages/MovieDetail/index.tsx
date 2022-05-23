import Reviews from "pages/MovieDetail/Reviews";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "types/movie";
import { requestBackend } from "util/requests";
import MovieDetailCard from "./MovieCardDetail";
import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieDetail = () => {
  const { movieId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    requestBackend({ url: `/movies/${movieId}`, withCredentials: true }).then(
      (response) => {
        setMovie(response.data);
      }
    );
  }, [movieId]);

  return (
    <div className="movie-details-container">
      {movie && (
        <div className="movie-details">
          <MovieDetailCard movie={movie} />
        </div>
      )}
      <div className="movie-review">
        <Reviews />
      </div>
    </div>
  );
};

export default MovieDetail;
