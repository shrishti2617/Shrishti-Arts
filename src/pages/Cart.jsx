import { API_URL } from "../config";
import { useEffect, useState } from "react";

function Cart({setCartCount}) {
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
const checkout = async () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/orders/create`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems,
          totalPrice,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }
    await fetch(
  `${API_URL}/api/cart/clear/${user.id}`,
  {
    method: "DELETE",
  }
);

setCartItems([]);

    alert("Order Placed Successfully 🎉");

  } catch (error) {
    console.log(error);

    alert("Server Error");
  }
  const paymentResponse = await fetch(
  `${API_URL}/api/payment/create-order`,
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      amount: totalPrice,
    }),
  }
);

const order =
  await paymentResponse.json();
  const options = {
  key:"rzp_test_T3P96DFryWNodJ",

  amount: order.amount,

  currency: order.currency,

  name: "Shrishti Arts",

  description:
    "Artwork Purchase",

  order_id: order.id,

  handler: async function (response) {
  console.log(response);
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    await fetch(
      `${API_URL}/api/orders/create`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems,
          totalPrice,
        }),
      }
    );

    await fetch(
      `${API_URL}/api/cart/clear/${user.id}`,
      {
        method: "DELETE",
      }
    );

    setCartItems([]);

    alert(
      "Payment Successful 🎉"
    );

    window.location.href =
      "/orders";

  } catch (error) {
    console.log(error);

    alert(
      "Failed to save order"
    );
  }
},

  theme: {
    color: "#3399cc",
  },
};

const rzp =
  new window.Razorpay(options);

rzp.open();
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
            className="checkout-btn"
            onClick={checkout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;