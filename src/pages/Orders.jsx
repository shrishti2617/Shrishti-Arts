import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${user.id}`
      );

      const data = await response.json();

      setOrders(data);

    } catch (error) {
      console.log(error);
    }
  };

 useEffect(() => {
  const loadOrders = async () => {
    await fetchOrders();
  };

  loadOrders();
}, []);

  return (
    <div className="orders-page">
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="order-card"
          >
            <h3>
              Order ID:
              {" "}
              {order._id}
            </h3>
            <p>
              Ordered On:
              {" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>
            <p
              className={`order-status ${order.status}`}
              >
              Status: {order.status}
            </p>
            <p>
              Total:
              ₹{order.totalPrice}
            </p>

            <h4>Items:</h4>

           {order.items.map(
           (item, index) => (
    <div
      key={index}
      className="order-item"
    >
      <img
        src={item.image}
        alt={item.title}
      />

      <div>
        <h4>{item.title}</h4>

        <p>
          Quantity:
          {" "}
          {item.quantity}
        </p>

        <p>
          Price:
          ₹{item.price}
        </p>
      </div>
    </div>
  )
)}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;