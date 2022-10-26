import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const user = useSelector((s: RootState) => s.user);
  const navigate = useNavigate();

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      navigate("/login", { replace: true });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

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
          <Typography color="black">Sign Up</Typography>
          <TextField
            required
            id="outlined-required-1"
            label="Name"
            defaultValue=""
            style={{ color: "white" }}
            value={data.name}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
          />
          <TextField
            required
            id="outlined-required-1"
            label="Email"
            defaultValue=""
            style={{ color: "white" }}
            value={data.email}
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
          />
          <TextField
            required
            id="outlined-required-2"
            label="Password"
            defaultValue=""
            type={"password"}
            value={data.password}
            onChange={(e) =>
              setData((d) => ({ ...d, password: e.target.value }))
            }
          />
          <Button
            variant="contained"
            onClick={() => signup(data.name, data.email, data.password)}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
}

export default Signup;
