import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleSignup = async (e) => {
e.preventDefault();

try {
  const response = await fetch(
    "http://localhost:5000/api/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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

  alert("Account Created Successfully!");

  navigate("/login");

} catch (error) {
  console.log(error);

  alert("Server Error");
}

};

return ( <div className="login-page"> <form
     className="login-card"
     onSubmit={handleSignup}
   > <h2>Create Account</h2>

    <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
      required
    />

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
      Create Account
    </button>

    <p>
      Already have an account?{" "}
      <Link to="/login">
        Login
      </Link>
    </p>
  </form>
</div>
);
}

export default Signup;
