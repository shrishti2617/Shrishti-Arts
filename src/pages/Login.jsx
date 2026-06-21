import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
try {
  const response = await fetch(
    "http://localhost:5000/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem(
    "token",
    data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  alert("Login Successful!");

  navigate("/my-account");

} catch (error) {
  console.log(error);

  alert("Server Error");
}

};

return ( <div className="login-page"> <form
     className="login-card"
     onSubmit={handleLogin}
   > <h2>Login to Your Account</h2>

    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      required
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
      required
    />

    <button type="submit">
      Login
    </button>

    <p>
      Don't have an account?{" "}
      <Link to="/signup">
        Sign Up
      </Link>
    </p>
  </form>
</div>

);
}

export default Login;
