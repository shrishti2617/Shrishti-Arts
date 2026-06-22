import { API_URL } from "../config";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";
import { Link } from "react-router-dom";

function Gallery({ addToCart, addToWishlist }) {
const [searchParams] = useSearchParams();

const categoryFromURL =
searchParams.get("category") || "All";

const [category, setCategory] =
useState(categoryFromURL);

const [artworks, setArtworks] = useState([]);
const [search, setSearch] = useState("");
const [sortOrder, setSortOrder] =
  useState("default");
useEffect(() => {
  const fetchArtworks = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/artworks`
      );

      const data = await response.json();

      setArtworks(data);

    } catch (error) {
      console.log(error);
    }
  };

  fetchArtworks();
}, []);


const filteredArtworks =
artworks
.filter((artwork) => {

const categoryMatch =
category === "All" ||
artwork.category === category;

const searchMatch =
artwork.title
.toLowerCase()
.includes(
search.toLowerCase()
);

return (
categoryMatch &&
searchMatch
);

})
.sort((a, b) => {

if (
sortOrder === "low"
) {
return (
a.price -
b.price
);
}

if (
sortOrder === "high"
) {
return (
b.price -
a.price
);
}

return 0;

});

return ( <div className="gallery-page">

  <div className="gallery-hero">
    <h1>Art Gallery</h1>

    <p>
      A collection of handmade creations, anime artwork,
      custom gifts and artistic experiments crafted with
      passion and creativity.
    </p>
  </div>

  <div className="featured-artwork">

    <div>
      <h2>Featured Creation ✨</h2>

      <p>
        Every artwork tells a story. This collection reflects
        my love for anime, handmade crafts and personalized
        creations designed to make everyday objects unique.
      </p>
    </div>
  </div>
  
  <div className="search-sort-container">

  <input
    type="text"
    placeholder="Search artworks..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

  <select
    value={sortOrder}
    onChange={(e) =>
      setSortOrder(
        e.target.value
      )
    }
  >
    <option value="default">
      Default
    </option>

    <option value="low">
      Price: Low to High
    </option>

    <option value="high">
      Price: High to Low
    </option>

  </select>

</div>
  




  <div className="filter-buttons">
    <button onClick={() => setCategory("All")}>
      All
    </button>

    <button onClick={() => setCategory("Anime")}>
      Anime
    </button>

    <button onClick={() => setCategory("Jars")}>
      Jars
    </button>

    <button onClick={() => setCategory("Paintings")}>
      Paintings
    </button>

    <button onClick={() => setCategory("Keychains")}>
      Keychains
    </button>
  </div>

  <p className="artwork-count">
    Showing {filteredArtworks.length} artworks
  </p>

  <div className="cards-container">
    {filteredArtworks.map((artwork, index) => (
      <Link
      to={`/artwork/${index}`}
      key={index}
      >
      <ArtworkCard
       image={artwork.image}
       title={artwork.title}
       price={artwork.price}
       addToCart={() => addToCart(artwork)}
       addToWishlist={() => addToWishlist(artwork)}
     />
   </Link>
    ))}
  </div>

  <div className="gallery-quote">
    <h2>
      "Art enables us to find ourselves and lose
      ourselves at the same time."
    </h2>
  </div>

</div>

);
}

export default Gallery;
