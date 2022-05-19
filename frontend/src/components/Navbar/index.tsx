import { AuthContext } from "AuthContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { removeAuthData } from "util/storage";
import history from "util/navigate";
import "./styles.css";
import { getTokenData, isAuthenticated } from "util/auth";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); //Retira a função padrão. No caso do link é: navegar até o endereço
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace("/");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  return (
    <nav className="navbar bg-primary navbar-container">
      <div className="container-fluid">
        <Link to="/movies">
          <h1>MovieFlix</h1>
        </Link>
        {authContextData.authenticated && (
          <div className="nav-logout">
            <a href="logout" onClick={handleLogout}>
              <p className="text-uppercase">sair</p>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
