import { API_URL } from "../config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import ArtworkCard from "../components/ArtworkCard";

function Home({
searchTerm,
addToCart,
addToWishlist,
}) {
const [artworks, setArtworks] =
useState([]);

useEffect(() => {
const fetchArtworks =
async () => {
try {
const response =
await fetch(
  `${API_URL}/api/artworks`
);

      const data =
        await response.json();

      const featuredArtworks =
        data.filter(
          (artwork) =>
            artwork.featured
        );

      setArtworks(
        featuredArtworks
      );

    } catch (error) {
      console.log(error);
    }
  };

fetchArtworks();


}, []);

const filteredArtworks =
artworks.filter(
(artwork) =>
artwork.title
.toLowerCase()
.includes(
searchTerm.toLowerCase()
)
);

return (
<> <Hero />

  <section className="gallery">
    <h2>
      Featured Artworks
    </h2>

    <div className="cards-container">
      {filteredArtworks.map(
        (artwork) => (
          <ArtworkCard
            key={
              artwork._id
            }
            image={
              artwork.image
            }
            title={
              artwork.title
            }
            price={
              artwork.price
            }
            addToCart={() =>
              addToCart(
                artwork
              )
            }
            addToWishlist={() =>
              addToWishlist(
                artwork
              )
            }
          />
        )
      )}
    </div>

    <div
      style={{
        textAlign:
          "center",
        marginTop:
          "20px",
      }}
    >
      <Link to="/gallery">
        <button>
          View All
          Artworks
        </button>
      </Link>
    </div>
  </section>

  <section className="categories">
    <h2>
      Explore Categories
    </h2>

    <div className="category-grid">

      <Link
        to="/gallery?category=Paintings"
        className="category-card"
      >
        🎨
        <h3>
          Paintings
        </h3>
        <p>
          Hand-painted
          artwork and
          canvas
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
          Creative
          decorative
          jars made
          with passion.
        </p>
      </Link>

      <Link
        to="/gallery?category=Anime"
        className="category-card"
      >
        📱
        <h3>
          Phone Cases
        </h3>
        <p>
          Anime-inspired
          and custom
          phone cases.
        </p>
      </Link>

      <Link
        to="/gallery?category=Keychains"
        className="category-card"
      >
        🔑
        <h3>
          Keychains
        </h3>
        <p>
          Personalized
          gifts and
          handmade
          accessories.
        </p>
      </Link>

    </div>
  </section>

  <section className="home-about">
    <h2>
      About
      Shrishti Arts
    </h2>

    <p>
      Shrishti Arts is
      a creative space
      where imagination
      meets craftsmanship.
      Every piece is
      handmade with
      passion and
      designed to bring
      creativity into
      everyday life.
    </p>
  </section>

  <section className="why-us">
    <h2>
      Why Choose Us?
    </h2>

    <div className="why-grid">

      <div className="why-card">
        <h3>
          ✨ Handmade
        </h3>

        <p>
          Every creation
          is crafted
          with care and
          attention.
        </p>
      </div>

      <div className="why-card">
        <h3>
          🎁 Customizable
        </h3>

        <p>
          Personalized
          gifts designed
          specially for
          you.
        </p>
      </div>

      <div className="why-card">
        <h3>
          💖 Made with
          Passion
        </h3>

        <p>
          Each artwork
          carries
          creativity
          and emotion.
        </p>
      </div>

    </div>
  </section>

  <section className="reviews">
    <h2>
      Customer Reviews
    </h2>

    <div className="review-grid">

      <div className="review-card">
        ⭐⭐⭐⭐⭐

        <p>
          Beautiful
          artwork and
          amazing
          quality.
          Loved my
          custom
          keychain!
        </p>

        <h4>
          - Happy
          Customer
        </h4>
      </div>

      <div className="review-card">
        ⭐⭐⭐⭐⭐

        <p>
          The anime
          poster
          exceeded my
          expectations.
        </p>

        <h4>
          - Anime Fan
        </h4>
      </div>

      <div className="review-card">
        ⭐⭐⭐⭐⭐

        <p>
          Great
          communication
          and excellent
          work.
        </p>

        <h4>
          - Customer
        </h4>
      </div>

    </div>
  </section>
</>


);
}

export default Home;
