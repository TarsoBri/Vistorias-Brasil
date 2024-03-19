import { useEffect, useState } from "react";

import { api } from "../Apis/api";

import { Login } from "../interfaces/Login";
import { Clients } from "../interfaces/Clients";

import { useNavigate } from "react-router-dom";

// context
import useAuthenticate from "./useAuthenticate";

export const useLoginUser = (url: string) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user, setUser: setUserAuth } = useAuthenticate();

  const handleLoginUser = async (data: Login) => {
    setLoading(true);
    await api
      .post(url, data)
      .then((res) => {
        setUserAuth(res.data);
        navigate("/");
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setLoading(false));
  };

  return { handleLoginUser, user, loading, error };
};
