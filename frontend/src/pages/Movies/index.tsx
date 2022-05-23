import { AxiosRequestConfig } from "axios";
import FilterBar, { FilterMovie } from "components/FilterBar";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: FilterMovie;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: FilterMovie) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  useEffect(() => {
    const params: AxiosRequestConfig = {
      withCredentials: true,
      method: "GET",
      url: "/movies",
      params: {
        genreId: controlComponentsData.filterData.genre?.id,
        size: 4,
        page: controlComponentsData.activePage,
      },
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [controlComponentsData]);

  return (
    <div className="movies">
      <FilterBar onSubmitFilter={handleSubmitFilter} />
      <div className="row">
        {page &&
          page.content.map((movie) => (
            <div className="col-sm-6 col-xl-3" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
      </div>
      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={2}
        onChange={handlePageChange}
      />
    </div>
  );
};
export default Movies;
