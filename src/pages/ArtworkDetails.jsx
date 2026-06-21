import { useParams, Link } from "react-router-dom";

import spidermanJar from "../assets/spidermanjar.jpeg";
import starrynightBag from "../assets/starrynightbag.jpeg";
import zenitsuPhoneCase from "../assets/zenistuphonecase.jpeg";
import animeposter from "../assets/AnimePoster.jpeg";
import evileyejar from "../assets/evileyeJar.jpeg";
import customizekeychain from "../assets/customizeKeychain.jpeg";

function ArtworkDetails({addToCart, addToWishlist}) {
const { id } = useParams();

const artworks = [
{
image: spidermanJar,
title: "Spiderman Jar",
price: 499,
description:
"A handmade Spiderman-themed decorative jar perfect for anime and superhero lovers.",
},
{
image: starrynightBag,
title: "Starry Night Bag",
price: 499,
description:
"Inspired by Van Gogh's masterpiece, hand-painted on a stylish tote bag.",
},
{
image: zenitsuPhoneCase,
title: "Zenitsu Phone Case",
price: 499,
description:
"Anime-inspired phone case featuring Zenitsu from Demon Slayer.",
},
{
image: animeposter,
title: "Anime Poster",
price: 499,
description:
"High-quality anime poster designed for fans and collectors.",
},
{
image: evileyejar,
title: "Evil Eye Jar",
price: 499,
description:
"Beautiful hand-painted Evil Eye decorative jar for home decor.",
},
{
image: customizekeychain,
title: "Customize Keychain",
price: 499,
description:
"Personalized keychain made specially according to your design.",
},
];

const artwork = artworks[id];

return ( <div className="details-page">
      <div className="back-btn-container">
       <Link to="/gallery" className="back-btn">
         ← Back to Gallery
       </Link>
      </div>
  <div className="details-card">

    <img
      src={artwork.image}
      alt={artwork.title}
    />

    <div className="details-info">

      <h1>{artwork.title}</h1>

      <h2>₹{artwork.price}</h2>

      <p>{artwork.description}</p>

      <button
        onClick={() => addToCart(artwork)}
      >
        🛒 Add To Cart
      </button>

      <button
        onClick={() => addToWishlist(artwork)}
      >
        ❤️ Add To Wishlist
      </button>

    </div>

  </div>

</div>
);
}

export default ArtworkDetails;
