import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

function ArtworkDetails({
  addToCart,
  addToWishlist,
}) {

  const { id } = useParams();

  const [artwork, setArtwork] =
    useState(null);

  useEffect(() => {

    const fetchArtwork =
      async () => {

        try {

          const response =
            await fetch(
              `${API_URL}/api/artworks`
            );

          const data =
            await response.json();

          setArtwork(
            data[id]
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchArtwork();

  }, [id]);

  if (!artwork) {

    return (
      <h2>
        Loading Artwork...
      </h2>
    );

  }

  return (

    <div className="details-page">

      <div className="back-btn-container">

        <Link
          to="/gallery"
          className="back-btn"
        >
          ← Back to Gallery
        </Link>

      </div>

      <div className="details-card">

        <img
          src={artwork.image}
          alt={artwork.title}
        />

        <div className="details-info">

          <h1>
            {artwork.title}
          </h1>

          <h2>
            ₹{artwork.price}
          </h2>

          <p>
            {artwork.description}
          </p>

          <button
            onClick={() =>
              addToCart(artwork)
            }
          >
            🛒 Add To Cart
          </button>

          <button
            onClick={() =>
              addToWishlist(
                artwork
              )
            }
          >
            ❤️ Add To Wishlist
          </button>

        </div>

      </div>

    </div>

  );

}

export default ArtworkDetails;