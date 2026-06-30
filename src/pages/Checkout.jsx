import { API_URL } from "../config";
import { useState, useEffect } from "react";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const [customer, setCustomer] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const loadCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      try {
        const response = await fetch(
          `${API_URL}/api/cart/${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setCartItems(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();
  }, []);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const makePayment = async () => {
    try {
      const paymentResponse = await fetch(
        `${API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice,
          }),
        }
      );

      const order = await paymentResponse.json();

      const options = {
        key: "rzp_test_T3P96DFryWNodJ",

        amount: order.amount,

        currency: order.currency,

        name: "Shrishti Arts",

        description: "Artwork Purchase",

        order_id: order.id,

        handler: async () => {
          alert("Payment Successful 🎉");
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert("Payment Failed");
    }
  };

  const proceedToPayment = async () => {
    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.state ||
      !customer.pincode
    ) {
      alert("Please fill all customer details.");
      return;
    }

    localStorage.setItem(
      "customerDetails",
      JSON.stringify(customer)
    );

    alert("Customer Details Verified ✅");

    await makePayment();
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="customer-form">
          <h2>Customer Details</h2>

          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={customer.state}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={customer.pincode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="summary-item"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width="80"
                />

                <div>
                  <h4>{item.title}</h4>

                  <p>₹{item.price}</p>

                  <p>Quantity : {item.quantity}</p>
                </div>
              </div>
            ))
          )}

          <hr />

          <h3>Total : ₹{totalPrice}</h3>

          <button onClick={proceedToPayment}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;