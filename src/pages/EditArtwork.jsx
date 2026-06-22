import { API_URL } from "../config";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditArtwork() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [image, setImage] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  useEffect(() => {
    const fetchArtwork =
      async () => {
        const response =
          await fetch(
            `${API_URL}/api/artworks`
          );

        const artworks =
          await response.json();

        const artwork =
          artworks.find(
            (item) =>
              item._id === id
          );

        if (artwork) {
          setTitle(
            artwork.title
          );

          setDescription(
            artwork.description
          );

          setImage(
            artwork.image
          );

          setPrice(
            artwork.price
          );

          setCategory(
            artwork.category
          );
        }
      };

    fetchArtwork();
  }, [id]);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      await fetch(
        `${API_URL}/api/artworks/update/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              title,
              description,
              image,
              price,
              category,
            }),
        }
      );

      alert(
        "Artwork Updated"
      );

      navigate(
        "/admin/manage-artworks"
      );
    };

  return (
    <div>
      <h1>
        Edit Artwork
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={
            description
          }
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Image Path"
          value={image}
          onChange={(e) =>
            setImage(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={
            category
          }
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Update Artwork
        </button>
      </form>
    </div>
  );
}

export default EditArtwork;