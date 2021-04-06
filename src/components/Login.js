import React from "react";
import logo from "../images/icon.png";

export default function Login(props) {

    const {setCredentials, credentials, email, password, login} = props;

    return (<div><div className="form-signin">
    <form>
      <img
        class="mb-4 rounded"
        src={logo}
        alt=""
        width="286"
        height="286"
      />
      <h1 class="h3 mb-3 fw-normal">Sign in to Bubble</h1>

      <div className="form-floating">
        <input
          className="form-control"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              [e.target.name]: e.target.value,
            })
          }
          placeholder="Email address"
          required
          autoFocus
          id="inputEmail"
          type="email"
          name="email"
          value={email}
        />
        <label htmlFor="inputEmail">Email address</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              [e.target.name]: e.target.value,
            })
          }
          type="password"
          name="password"
          value={password}
          id="inputPassword"
          placeholder="Password"
          required
        />
        <label htmlFor="inputPassword">Password</label>
      </div>

      <button
        className="w-100 btn btn-lg btn-primary"
        onTouchStart={login}
        onClick={login}
        type="submit"
        name="login"
      >
        Login
      </button>
    </form>
  </div></div>)
}