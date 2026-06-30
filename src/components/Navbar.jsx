import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ cartCount, wishlistCount }) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleSearch = (e) => {

    if (e.key === "Enter") {

      if (search.trim() === "") return;

      navigate(
        `/gallery?search=${encodeURIComponent(search)}`
      );

      setSearch("");

    }

  };

  return (

    <nav>

      <div className="logo">
        <h2>Shrishti Arts</h2>
      </div>

      <ul className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-link"
          }
        >
          🏠Home
        </NavLink>

        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-link"
          }
        >
          🎨Gallery
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-link"
          }
        >
          📝About Author
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-link"
          }
        >
          ☎️Contact
        </NavLink>

      </ul>

      <div className="nav-right">

        <input
          type="text"
          placeholder="Search artworks..."
          className="search-bar"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-link"
          }
        >
          ❤️Wishlist ({wishlistCount})
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-link"
          }
        >
          🛒Cart ({cartCount})
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-link"
          }
        >
          📦My Orders
        </NavLink>

        {!user?.admin && (
  <NavLink
    to="/myrequests"
    className={({ isActive }) =>
      isActive ? "nav-active" : "nav-link"
    }
  >
    📋My Requests
  </NavLink>
)}

        {user?.admin && (

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "nav-active" : "nav-link"
            }
          >
            🛠️Admin
          </NavLink>

        )}

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-link"
          }
        >
          👤My Account
        </NavLink>

      </div>

    </nav>

  );
}

export default Navbar;