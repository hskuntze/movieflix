import { AxiosRequestConfig } from "axios";
import BasicButton from "components/BasicButton";
import ReviewCard from "components/ReviewCard";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Review } from "types/review";
import { hasAnyRoles } from "util/auth";
import { requestBackend, requestBackendPost } from "util/requests";
import { toast } from "react-toastify";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

type FormData = {
  text: string;
};

const Reviews = () => {
  const { movieId } = useParams<UrlParams>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [movieReviews, setMovieReviews] = useState<Array<Review>>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      withCredentials: true,
      method: "GET",
      url: `/movies/${movieId}/reviews`,
    };

    requestBackend(params).then((response) => {
      setMovieReviews(response.data);
    });
  }, [movieId, refresh]);

  const onSubmit = (formData: FormData) => {
    const params: AxiosRequestConfig = {
      withCredentials: true,
      method: "POST",
      url: "/reviews",
      data: {
        ...formData,
        movieId: Number(movieId),
      },
    };

    requestBackendPost(params)
      .then(() => {
        setRefresh(true);
        toast.success("Publicado");
      })
      .catch(() => {
        toast.error("Erro ao publicar");
      })
      .finally(() => {
        setRefresh(false);
      });
  };

  return (
    <div className="review-container">
      {hasAnyRoles(["ROLE_MEMBER"]) === true && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="review-post-container base-card">
            <div>
              <input
                type="text"
                className={`form-control base-input ${
                  errors.text ? "is-invalid" : ""
                }`}
                placeholder="Deixe sua avaliação aqui"
                {...register("text", {
                  required: "Campo obrigatório",
                })}
              />
              <div className="invalid-feedback d-flex justify-content-center mb-3">
                {errors.text?.message}
              </div>
            </div>
            <BasicButton text="salvar avaliação" />
          </div>
        </form>
      )}
      <div className="review-comments-container base-card">
        <div className="row">
          {movieReviews?.map((review) => (
            <div key={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
