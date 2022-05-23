import { Route, Routes as Switch } from "react-router-dom";
import { CustomRouter } from "./CustomRouter";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import history from "util/navigate";
import Navbar from "components/Navbar";
import PrivateRoute from "components/PrivateRoute";
import MovieDetail from "pages/MovieDetail";

const Routes = () => {
  return (
    <CustomRouter history={history}>
      <Navbar />
      <Switch>
        <Route path="/" element={<Login />} />
        <Route
          path="/movies"
          element={
            <PrivateRoute roles={["ROLE_VISITOR", "ROLE_MEMBER"]}>
              <Movies />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <PrivateRoute roles={["ROLE_VISITOR", "ROLE_MEMBER"]}>
              <MovieDetail />
            </PrivateRoute>
          }
        />
      </Switch>
    </CustomRouter>
  );
};

export default Routes;
