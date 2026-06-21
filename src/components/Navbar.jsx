import { Link } from "react-router-dom";
function Navbar({ cartCount, wishlistCount, searchTerm,
  setSearchTerm }) {
  return (
    <nav>
      <div className="logo">
        <h2>Shrishti Arts</h2>
      </div>

      <ul className="nav-links">
       <li>
         <Link to="/">Home</Link>
       </li>

       <li>
         <Link to="/gallery">Gallery</Link>
       </li>

       <li>
         <Link to="/about">About</Link>
       </li>

       <li>
         <Link to="/contact">Contact</Link>
       </li>
     </ul>

      <div className="nav-right">
        <input
          type="text"
          placeholder="Search artwork..."
          className="search-bar"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link to="/">Home</Link>

<Link to="/wishlist">
  ❤️ Wishlist ({wishlistCount})
</Link>

<Link to="/cart">
  🛒 Cart ({cartCount})
</Link>


<Link to="/orders">
  📦 My Orders
</Link>

<Link to="/login">
  👤 My Account
</Link>
      </div>
    </nav>
  );
}

export default Navbar;