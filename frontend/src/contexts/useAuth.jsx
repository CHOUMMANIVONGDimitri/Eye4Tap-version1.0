import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-cycle
import { LoadUser } from "./functions/ReconnectApi";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pictureProfile, setPictureProfile] = useState({ url: null });
  const [user, setUser] = useState({
    admin: null,
    email: null,
    firstname: null,
    lastname: null,
    pseudo: null,
    id: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // reconnexion peuple user
    if (
      !user.email &&
      document.cookie.match(import.meta.env.VITE_NAME_COOKIE)
    ) {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith(import.meta.env.VITE_NAME_COOKIE))
        ?.split("=Bearer%20")[1];
      const payload = JSON.parse(
        window.atob(token.match(/(?<=\.)(.*?)(?=\.)/g))
      );

      const getAnimeImg = (tokenCookie) => {
        const config = {
          headers: { Authorization: `Bearer ${tokenCookie}` },
        };
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/anime`, config)
          .then((res) => {
            setPictureProfile({ url: res.data.stuff[0].image });
          })
          .catch((err) => console.error(err));
      };

      getAnimeImg(token);

      // call api
      LoadUser(payload.sub).then((returnuser) => {
        if (returnuser.status === 401) {
          setUser({
            admin: null,
            email: null,
            firstname: null,
            lastname: null,
            pseudo: null,
            id: null,
          });
          navigate("/", { replace: true });
        } else {
          setUser({
            admin: returnuser.admin,
            email: returnuser.email,
            firstname: returnuser.firstname,
            lastname: returnuser.lastname,
            pseudo: returnuser.pseudo,
            id: returnuser.id,
          });
        }
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, []);

  const login = async (data) => {
    setUser(data);
    navigate("/user/game", { replace: true });
  };

  const logout = () => {
    document.cookie = `${
      import.meta.env.VITE_NAME_COOKIE
    }= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
    setUser("user", null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      pictureProfile,
      login,
      logout,
    }),
    [user, pictureProfile]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoaded && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
