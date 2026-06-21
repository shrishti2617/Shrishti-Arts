import { useState } from "react";

function AddArtwork() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/artworks/add",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            description,
            image,
            price,
            category,
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add Artwork</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Image Path"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        />

        <br /><br />

        <button type="submit">
          Add Artwork
        </button>

      </form>
    </div>
  );
}

export default AddArtwork;