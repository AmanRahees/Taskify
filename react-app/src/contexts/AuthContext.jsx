/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let loginUser = async (email, password) => {
    await axiosInstance
      .post("token/", {
        email: email,
        password: password,
      })
      .then((response) => {
        let data = response.data;
        if (response.status === 200) {
          setAuthTokens(data);
          setUser(jwt_decode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("Invalid Entry!");
      });
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    }).catch((error) => {
      console.error(error);
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    let lifeTime = 1000 * 60 * 14;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, lifeTime);
    return () => clearInterval(interval);
  }, [authTokens]);

  let ContextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    authTokens: authTokens,
    user: user,
    loading: loading,
    setLoading: setLoading,
  };

  return (
    <AuthContext.Provider value={ContextData}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
