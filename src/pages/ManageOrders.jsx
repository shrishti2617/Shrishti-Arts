import { useEffect, useState } from "react";

function ManageOrders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      setOrders(data);

    } catch (error) {
      console.log(error);
    }
  };

  fetchOrders();
}, []);

  const updateStatus =
    async (
      orderId,
      status
    ) => {
      try {
        await fetch(
          `http://localhost:5000/api/orders/status/${orderId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                status,
              }),
          }
        );

        const response = await fetch(
  "http://localhost:5000/api/orders"
);

const data = await response.json();

setOrders(data);

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <h1>
        Manage Orders
      </h1>

      {orders.map(
        (order) => (
          <div
            key={order._id}
            style={{
              border:
                "1px solid #ccc",
              padding:
                "15px",
              margin:
                "15px",
              borderRadius:
                "10px",
            }}
          >
            <h3>
              Order ID
            </h3>

            <p>
              {order._id}
            </p>

            <p>
              User:
              {" "}
              {
                order.userId
              }
            </p>

            <p>
              Total:
              ₹
              {
                order.totalPrice
              }
            </p>

            <p>
              Status:
              {" "}
              <strong>
                {
                  order.status
                }
              </strong>
            </p>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  "Processing"
                )
              }
            >
              Processing
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  "Shipped"
                )
              }
            >
              Shipped
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  "Delivered"
                )
              }
            >
              Delivered
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default ManageOrders;