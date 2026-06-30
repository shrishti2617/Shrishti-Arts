import { API_URL } from "../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
const user = JSON.parse(
localStorage.getItem("user")
);

const [stats, setStats] =
useState({
totalOrders: 0,
totalArtworks: 0,
totalRevenue: 0,
});

useEffect(() => {
const fetchStats =
async () => {
try {
const response =
await fetch(
`${API_URL}/api/orders/stats/dashboard`
);

      const data =
        await response.json();

      setStats(data);

    } catch (error) {
      console.log(error);
    }
  };

fetchStats();

}, []);

if (!user?.admin) {
return ( <h2>
Access Denied </h2>
);
}

return ( <div className="admin-container"> <h1>
Admin Dashboard </h1>

  <h3>
    Welcome, {user.name}
  </h3>

  <hr />

  <h2>
    Dashboard Statistics📊 
  </h2>

  <div className="stats-container">

    <div className="stat-card">
      <h2>Orders</h2>
      <p>
        {stats.totalOrders}
      </p>
    </div>

    <div className="stat-card">
      <h2>Artworks </h2>
      <p>
        {stats.totalArtworks}
      </p>
    </div>

    <div className="stat-card">
      <h2>Revenue</h2>
      <p>
        ₹{stats.totalRevenue}
      </p>
    </div>

  </div>

  <hr />

  <div className="admin-buttons">

    <Link
      to="/admin/add-artwork"
    >
      <button>
        Add Artwork ➕
      </button>
    </Link>

    <Link
      to="/admin/manage-artworks"
    >
      <button>
        Manage Artworks 🖼️
      </button>
    </Link>

    <Link
      to="/admin/orders"
    >
      <button>
        Manage Orders 📦 
      </button>
    </Link>
    <Link to="/admin/requests">
  <button>
    📩 Custom Requests
  </button>
</Link>

  </div>
</div>

);
}

export default Admin;
