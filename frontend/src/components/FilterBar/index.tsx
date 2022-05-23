import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { requestBackend } from "util/requests";
import { Genre } from "types/genre";
import Select from "react-select";
import "./styles.css";

export type FilterMovie = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: FilterMovie) => void;
};

const FilterBar = ({ onSubmitFilter }: Props) => {
  const { handleSubmit, control, setValue, getValues } = useForm<FilterMovie>();

  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  const handleChangeGenre = (value: Genre) => {
    setValue("genre", value);
    const obj = {
      genre: getValues("genre"),
    };
    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: "/genres", withCredentials: true }).then((response) => {
      setSelectGenres(response.data.content);
    });
  }, []);

  const onSubmit = (filter: FilterMovie) => {
    onSubmitFilter(filter);
  };

  return (
    <div className="base-card search-bar">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-bar-form">
        <div className="filter-genre-and-clear">
          <div className="filter-genre">
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectGenres}
                  isClearable
                  onChange={(value) => handleChangeGenre(value as Genre)}
                  placeholder="Gênero"
                  classNamePrefix="genre-filter-select"
                  getOptionLabel={(genre: Genre) => genre.name}
                  getOptionValue={(genre: Genre) => String(genre.id)}
                />
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
