import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getTokenData } from "../../util/auth";
import { requestBackendLogin } from "../../util/requests";
import { saveAuthData } from "../../util/storage";
import { ReactComponent as MainImg } from "assets/images/Desenho.svg";
import BasicButton from "../../components/BasicButton";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const history = useNavigate();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history("/movies");
      })
      .catch((err) => {
        setHasError(true);
      });
  };

  return (
    <div className="login-container">
      <div className="main-img">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <MainImg />
      </div>
      <div className="base-card login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              className={`form-control base-input ${
                errors.username ? "is-invalid" : ""
              }`}
              placeholder="Email"
              {...register("username", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
          </div>
          <div>
            <input
              type="password"
              className={`form-control base-input ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Senha"
              {...register("password", {
                required: "Campo obrigatório",
              })}
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
          </div>
          {hasError && <div className="alert alert-danger">Erro no login</div>}
          <div className="button-container">
            <BasicButton text="fazer login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
