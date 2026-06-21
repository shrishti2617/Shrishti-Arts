function ArtworkCard({
  image,
  title,
  price,
  addToCart,
  addToWishlist 
}) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>₹{price}</p>
      <div className="card-buttons">
      <button onClick={addToCart}>
         Add To Cart
      </button>

      <button onClick={addToWishlist}>
        ❤️ Wishlist
      </button>
    </div>
    </div>
  );
}

export default ArtworkCard;