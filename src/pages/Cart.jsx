import { API_URL } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({setCartCount}) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    try {
      const response = await fetch(
        `${API_URL}/api/cart/${user.id}`
      );

      const data = await response.json();

      setCartItems(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  const loadCart = async () => {
    await fetchCart();
  };

  loadCart();
}, []);

  const removeFromCart = async (id) => {
  try {
    const response = await fetch(
      `${API_URL}/api/cart/remove/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      alert("Failed to remove item");
      return;
    }

    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
    setCartCount((prev) => prev - 1);

  } catch (error) {
    console.log(error);
  }
};

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );
const increaseQuantity = async (id) => {
  try {
    await fetch(
      `${API_URL}/api/cart/increase/${id}`,
      {
        method: "PUT",
      }
    );

    await fetchCart();
  } catch (error) {
    console.log(error);
  }
};

const decreaseQuantity = async (id) => {
  try {
    await fetch(
      `${API_URL}/api/cart/decrease/${id}`,
      {
        method: "PUT",
      }
    );

    await fetchCart();
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="cart-item"
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div>
                <h3>{item.title}</h3>
                <p>₹{item.price}</p>
              </div>

              <div>
  <button
    onClick={() =>
      decreaseQuantity(item._id)
    }
  >
    ➖
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() =>
      increaseQuantity(item._id)
    }
  >
    ➕
  </button>
</div>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <h2>
            Total Items: {cartItems.length}
          </h2>

          <h2>
            Total Price: ₹{totalPrice}
          </h2>
           <button
           onClick={() =>
           navigate("/checkout")
           }
           >
           Checkout
           </button>
        </>
      )}
    </div>
  );
}

export default Cart;