import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate, getUser } from "../../services/authorize";
import Nav from "./Nav";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login({ history }) {
  const apiUrl = "http://localhost:8000/api";

  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  function inputValue(name) {
    return (e) => {
      setState({ ...state, [name]: e.target.value });
    };
  }

  function submitForm(e) {
    e.preventDefault();
    axios
      .post(`${apiUrl}/login`, { username, password })
      .then((res) => {
        Swal.fire({
          title: "Alert!",
          text: "Login complete!",
          icon: "success",
        });
        setState({ ...state, username, password });
        authenticate(res, () => handleClick());
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    getUser() && handleClick()
  }, [])

  return (
    <div className="container p-5">
      <Nav />
      <div className="fs-1 my-5">Write Article</div>
      <form onSubmit={submitForm}>
        <div className="form-group mb-3">
          <label>UserName</label>
          <input
            type="text"
            className="form-control"
            onChange={inputValue("username")}
            value={state.username}
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={inputValue("password")}
            value={state.password}
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary mt-5" />
      </form>
    </div>
  );
}
