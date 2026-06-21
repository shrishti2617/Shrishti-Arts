import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    artwork: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order request submitted successfully!");

    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      artwork: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <h1>Place a Custom Order</h1>

      <form onSubmit={handleSubmit} className="contact-form">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="artwork"
          placeholder="Artwork/Product Name"
          value={formData.artwork}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          rows="6"
          placeholder="Describe your custom order requirements..."
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">
          Submit Order Request
        </button>

      </form>
    </div>
  );
}

export default Contact;