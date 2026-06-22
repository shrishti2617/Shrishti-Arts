import { API_URL } from "../config";
import { useEffect, useState } from "react";

function Wishlist() {
const [wishlistItems, setWishlistItems] = useState([]);


const fetchWishlist = async () => {
const user = JSON.parse(
localStorage.getItem("user")
);


if (!user) return;

try {
  const response = await fetch(
    `${API_URL}/api/wishlist/${user.id}`
  );

  const data = await response.json();

  setWishlistItems(data);

} catch (error) {
  console.log(error);
}


};
useEffect(() => {
  const loadWishlist = async () => {
    await fetchWishlist();
  };

  loadWishlist();
}, []);
const removeFromWishlist = async (id) => {
  try {
    const response = await fetch(
      `${API_URL}/api/wishlist/remove/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      alert("Failed to remove item");
      return;
    }
     await fetchWishlist();

     window.location.reload();
    
  } catch (error) {
    console.log(error);
  }
};

return ( <div className="wishlist-page"> <h1>❤️ My Wishlist</h1>

  {wishlistItems.length === 0 ? (
    <p>No items in wishlist.</p>
  ) : (
    wishlistItems.map((item) => (
      <div
        key={item._id}
        className="wishlist-item"
      >
        <img
          src={item.image}
          alt={item.title}
        />

        <div>
          <h3>{item.title}</h3>
          <p>₹{item.price}</p>
        </div>

        <button
          onClick={() =>
          removeFromWishlist(item._id)
        }
        >
          ❌ Remove
        </button>
      </div>
    ))
  )}
</div>

);
}

export default Wishlist;
