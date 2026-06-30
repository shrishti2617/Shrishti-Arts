import { API_URL } from "../config";
import { useState } from "react";

function ReviewPopup({ onClose }) {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [name, setName] = useState("");

  const emojis = [
    "😡",
    "😕",
    "😐",
    "😊",
    "😍",
  ];

  const submitReview = async () => {
    if (!name || !rating || !review) {
      alert("Please complete the review.");
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/api/reviews`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            rating,
            review,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(
        "Thank you for your review ❤️"
      );

      onClose();

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }
  };

  return (
    <div className="popup-overlay">

      <div className="review-popup">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✖
        </button>

        <h2>Write Your Review</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <h3>⭐ Rate Your Experience</h3>

        <div className="emoji-rating">
          {emojis.map((emoji) => (
            <span
              key={emoji}
              className={
                rating === emoji
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setRating(emoji)
              }
            >
              {emoji}
            </span>
          ))}
        </div>

        <textarea
          rows="5"
          placeholder="Write your review..."
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
        />

        <button
          className="submit-review"
          onClick={submitReview}
        >
          Submit Review
        </button>

      </div>

    </div>
  );
}

export default ReviewPopup;