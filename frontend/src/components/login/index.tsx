import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setLogin } from "../../slices/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/verify", {
        withCredentials: true,
      });

      dispatch(
        setLogin({
          email: res.data.email,
          name: res.data.name,
          isLoggedIn: true,
        })
      );
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(
        setLogin({
          email: res.data.email,
          name: res.data.name,
          isLoggedIn: true,
        })
      );
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(user);
    if (user.isLoggedIn) {
      // nav
      navigate("/", { replace: true });
    }
  }, [user.isLoggedIn]);

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        gap: 20,
        width: "min(90vw, 400px)",
      }}
    >
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <TextField
            required
            id="outlined-required-1"
            label="Email"
            defaultValue=""
            style={{ color: "white" }}
          />
          <TextField
            required
            id="outlined-required-2"
            label="Password"
            defaultValue=""
            type={"password"}
          />
          <Button variant="contained" onClick={() => login("s", "s")}>
            Login
          </Button>
        </>
      )}
    </div>
  );
}

export default Login;
