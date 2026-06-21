import { Link } from "react-router-dom";
function Hero() {
return ( <section className="hero"> <h1>Transforming Imagination Into Art</h1>

  <p>
    Handmade creations, anime artwork,
    custom gifts and unique artistic designs.
  </p>

  <div className="hero-buttons">
  <Link to="/contact" className="hero-btn">
    Shop Now
  </Link>

  <Link to="/gallery" className="hero-btn secondary-btn">
    Explore Gallery
  </Link>
</div>
</section>

);
}

export default Hero;
