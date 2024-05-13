import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("erfan@gmail.com");
  const [password, setPassword] = useState("1234");

  const { login, logout, user, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (login && email) login(email, password);
  }
  console.log(user);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formControl">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="buttons" type="submit">
          <div className="btn btn--primary">Login</div>
        </button>
      </form>
    </div>
  );
}

export default Login;

// ! Authenticated => who is he / she ? : information => name,
// ! Authorrization => what access have to routes or files (),
// ! role => user, admin, content manager
