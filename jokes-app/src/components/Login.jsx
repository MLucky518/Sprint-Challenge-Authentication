import React, { useState } from "react";
import axios from "axios";
import {useHistory }from "react-router-dom";
import jwt from "jsonwebtoken"



function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3300/api/auth/login", user,{ withCredentials: true })
      .then((res) => {
        console.log(res);
        // window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("token", jwt.decode(cookie.get("token")));
        history.push("/jokes");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleInput}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          placeholder="EnterPassword"
          onChange={handleInput}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
