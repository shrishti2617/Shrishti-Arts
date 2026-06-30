import { API_URL } from "../config";
import { useEffect, useState } from "react";

function MyRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const loadRequests = async () => {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) return;

      try {

        const response = await fetch(
          `${API_URL}/api/requests/user/${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setRequests(data);
        }

      } catch (error) {

        console.log(error);

      }

    };

    loadRequests();

  }, []);

  return (

    <div className="my-requests">

      <h1>My Custom Requests</h1>

      {

        requests.length === 0 ?

        (

          <h3>No Custom Requests Yet.</h3>

        )

        :

        requests.map((request) => (

          <div
            key={request._id}
            className="request-card"
          >

            <h2>
              🎨 {request.artworkType}
            </h2>

            <p>

              <strong>Budget:</strong>

              ₹{request.budget}

            </p>

            <p>

              <strong>Deadline:</strong>

              {new Date(request.deadline)
                .toLocaleDateString()}

            </p>

            <p>

              <strong>Description:</strong>

              {request.description}

            </p>

            <p>

              <strong>Status:</strong>

              <span
  className={
    request.status === "Pending"
      ? "pending"
      : "accepted"
  }
>
  {request.status === "Completed"
    ? "Accepted"
    : request.status}
</span>

            </p>

           {
   (request.status === "Completed" ||
   request.status === "Accepted") && (


    <div className="admin-message">

      <h4>🎉Great News!🎉</h4>
      <p>
         Your custom artwork request has been reviewed successfully.🔎
      </p>

      <p>
        Our team will contact you within the next 24 hours to discuss your artwork and finalize the details.🕵️🕰️
      </p>

      <p>
        Thank you for choosing <strong>Shrishti Arts</strong>❤️
      </p>

    </div>

  )
}

          </div>

        ))

      }

    </div>

  );

}

export default MyRequests;