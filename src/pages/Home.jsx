import { API_URL } from "../config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import ArtworkCard from "../components/ArtworkCard";
import ReviewPopup from "../components/ReviewPopup";

function Home({
  searchTerm,
  addToCart,
  addToWishlist,
}) {
  const [artworks, setArtworks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Featured Artworks
        const artworkResponse = await fetch(
          `${API_URL}/api/artworks`
        );

        const artworkData =
          await artworkResponse.json();

        const featuredArtworks =
          artworkData.filter(
            (artwork) => artwork.featured
          );

        setArtworks(featuredArtworks);

        // Reviews
        const reviewResponse = await fetch(
          `${API_URL}/api/reviews`
        );

        const reviewData =
          await reviewResponse.json();

        setReviews(reviewData);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Hero />

      <section className="gallery">
        <h2>Featured Artworks</h2>

        <div className="cards-container">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork._id}
              image={artwork.image}
              title={artwork.title}
              price={artwork.price}
              addToCart={() =>
                addToCart(artwork)
              }
              addToWishlist={() =>
                addToWishlist(artwork)
              }
            />
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Link to="/gallery">
            <button>
              View All Artworks
            </button>
          </Link>
        </div>
      </section>

      <section className="categories">
        <h2>Explore Categories</h2>

        <div className="category-grid">
          <Link
            to="/gallery?category=Paintings"
            className="category-card"
          >
            🎨
            <h3>Paintings</h3>
            <p>
              Hand-painted artwork and canvas
              creations.
            </p>
          </Link>

          <Link
            to="/gallery?category=Jars"
            className="category-card"
          >
            🫙
            <h3>Jars</h3>
            <p>
              Creative decorative jars made with
              passion.
            </p>
          </Link>

          <Link
            to="/gallery?category=Anime"
            className="category-card"
          >
            📱
            <h3>Phone Cases</h3>
            <p>
              Anime-inspired and custom phone
              cases.
            </p>
          </Link>

          <Link
            to="/gallery?category=Keychains"
            className="category-card"
          >
            🔑
            <h3>Keychains</h3>
            <p>
              Personalized gifts and handmade
              accessories.
            </p>
          </Link>
        </div>
      </section>

      <section className="home-about">
        <h2>About Shrishti Arts</h2>

        <p>
          Shrishti Arts is a creative space where
          imagination meets craftsmanship.
          Every piece is handmade with passion
          and designed to bring creativity into
          everyday life.
        </p>
      </section>

      <section className="why-us">
        <h2>Why Choose Us?</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>✨ Handmade</h3>

            <p>
              Every creation is crafted with
              care and attention.
            </p>
          </div>

          <div className="why-card">
            <h3>🎁 Customizable</h3>

            <p>
              Personalized gifts designed
              specially for you.
            </p>
          </div>

          <div className="why-card">
            <h3>💖 Made with Passion</h3>

            <p>
              Each artwork carries creativity
              and emotion.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}

      <section className="reviews">

        <h2>Customer Reviews</h2>

        <div className="review-grid">

          {reviews.length === 0 ? (

            <p>No Reviews Yet.</p>

          ) : (

            reviews.slice(0, 6).map((review) => (

              <div
                className="review-card"
                key={review._id}
              >
                <h3>{review.name}</h3>

                <h4>{review.rating}</h4>

                <p>{review.review}</p>

              </div>

            ))

          )}

        </div>

        <div className="review-button-container">

          <h3>
            Share Your Experience
          </h3>

          <p>
            Your feedback helps us improve and
            inspires future customers.
          </p>

          <button
            className="review-btn"
            onClick={() =>
              setShowReviewPopup(true)
            }
          >
            ⭐ Write a Review
          </button>

        </div>

      </section>

      {showReviewPopup && (
        <ReviewPopup
          onClose={() =>
            setShowReviewPopup(false)
          }
        />
      )}
    </>
  );
}

export default Home;