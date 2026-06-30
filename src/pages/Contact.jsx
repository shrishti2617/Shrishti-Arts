import { API_URL } from "../config";
import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    artworkType: "",
    budget: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const submitRequest = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first.");
    return;
  }

  if (
    !form.name ||
    !form.email ||
    !form.phone ||
    !form.artworkType ||
    !form.budget ||
    !form.deadline ||
    !form.description
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/requests`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,

          userId: user.id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("🎉 Custom Artwork Request Submitted Successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      artworkType: "",
      budget: "",
      deadline: "",
      description: "",
    });

  } catch (error) {
    console.log(error);

    alert("Server Error");
  }
};
 

  return (
    <div className="contact-page">

      <h1>Custom Artwork Request</h1>

      <p>
        Tell us about your dream artwork and
        we'll bring it to life.
      </p>

      <form
        className="request-form"
        onSubmit={submitRequest}
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <select
          name="artworkType"
          value={form.artworkType}
          onChange={handleChange}
        >
          <option value="">
            Select Artwork Type
          </option>

          <option>
            Painting
          </option>

          <option>
            Jar
          </option>

          <option>
            Phone Case
          </option>

          <option>
            Keychain
          </option>

          <option>
            Portrait
          </option>

          <option>
            T-Shirt
          </option>

          <option>
            Other
          </option>
        </select>

        <input
          type="number"
          name="budget"
          placeholder="Budget (₹)"
          value={form.budget}
          onChange={handleChange}
        />
       

        <input
  type="text"
  placeholder="Deadline"
  onFocus={(e) => {
    e.target.type = "date";
  }}
  onBlur={(e) => {
    if (!e.target.value) {
      e.target.type = "text";
    }
  }}
  name="deadline"
  value={form.deadline}
  onChange={handleChange}
/>

        <textarea
          rows="6"
          name="description"
          placeholder="Describe your artwork idea..."
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          Submit Request
        </button>

      </form>

    </div>
  );
}

export default Contact;