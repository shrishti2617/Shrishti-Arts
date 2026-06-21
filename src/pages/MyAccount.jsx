import { Link } from "react-router-dom";
function MyAccount() {
const user = JSON.parse(
localStorage.getItem("user")
);

return (
<div
style={{
textAlign: "center",
padding: "50px",
}}
> <h1>
Welcome, {user?.name} </h1>
<Link to="/orders">
  📦 My Orders
</Link>

  <p>
    Email: {user?.email}
  </p>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";
    }}
  >
    Logout
  </button>
</div>

);
}

export default MyAccount;
