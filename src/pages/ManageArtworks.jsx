import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageArtworks() {
const [artworks, setArtworks] =
useState([]);

useEffect(() => {

  const fetchArtworks = async () => {
    try {

      const response =
        await fetch(
          "http://localhost:5000/api/artworks"
        );

      const data =
        await response.json();

      setArtworks(data);

    } catch (error) {
      console.log(error);
    }
  };

  fetchArtworks();

}, []);

const deleteArtwork =
async (id) => {
try {
await fetch(
`http://localhost:5000/api/artworks/delete/${id}`,
{
method: "DELETE",
}
);


    setArtworks(
      artworks.filter(
        (artwork) =>
          artwork._id !== id
      )
    );

    alert(
      "Artwork Deleted"
    );

  } catch (error) {
    console.log(error);
  }
};

const toggleFeatured =
async (id) => {
try {

await fetch(
`http://localhost:5000/api/artworks/featured/${id}`,
{
method: "PUT",
}
);

setArtworks(
artworks.map(
(artwork) =>
artwork._id === id
? {
...artwork,
featured:
!artwork.featured,
}
: artwork
)
);

} catch (error) {
console.log(error);
}
};


return ( <div className="manage-artworks"> <h1>
Manage Artworks </h1>
  {artworks.length === 0 ? (
    <p>
      No artworks found.
    </p>
  ) : (
    artworks.map(
      (artwork) => (
        <div
          key={artwork._id}
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
          <img
            src={
              artwork.image
            }
            alt={
              artwork.title
            }
            width="150"
          />

          <h3>
            {
              artwork.title
            }
          </h3>

          <p>
            {
              artwork.description
            }
          </p>

          <p>
            ₹
            {
              artwork.price
            }
          </p>

          <p>
            Category:
            {" "}
            {
              artwork.category
            }
          </p>

          <p>
            Featured:
            {" "}
            {artwork.featured
              ? "⭐ Yes"
              : "❌ No"}
          </p>

          <Link
            to={`/admin/edit/${artwork._id}`}
          >
            <button>
              Edit Artwork
            </button>
          </Link>

          <button
            onClick={() =>
              toggleFeatured(
                artwork._id
              )
            }
          >
            {artwork.featured
              ? "Remove Featured"
              : "Mark Featured"}
          </button>

          <button
            onClick={() =>
              deleteArtwork(
                artwork._id
              )
            }
          >
            Delete Artwork
          </button>
        </div>
      )
    )
  )}
</div>

);
}

export default ManageArtworks;
