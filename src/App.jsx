import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Signup from "./pages/Signup";
import ArtworkDetails from "./pages/ArtworkDetails";
import MyAccount from "./pages/MyAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AddArtwork from "./pages/AddArtwork";
import ManageArtworks from "./pages/ManageArtworks";
import EditArtwork from "./pages/EditArtwork";
import ManageOrders from "./pages/ManageOrders";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
  const loadCartCount = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${user.id}`
      );

      const data = await response.json();

      setCartCount(data.length);

    } catch (error) {
      console.log(error);
    }
  };

  loadCartCount();
  window.addEventListener(
    "focus",
    loadCartCount
  );

  return () =>
    window.removeEventListener(
      "focus",
      loadCartCount
    );
}, []);

  useEffect(() => {
  const loadWishlistCount = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${user.id}`
      );

      const data = await response.json();

      setWishlistCount(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  loadWishlistCount();
}, []);
  const addToCart = async (artwork) => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/cart/add",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          title: artwork.title,
          image: artwork.image,
          price: artwork.price,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Added to Cart 🛒");
    setCartCount((prev) => prev + 1);
  } catch (error) {
    console.log(error);

    alert("Server Error");
  }
};
const addToWishlist = async (artwork) => {
const user = JSON.parse(
localStorage.getItem("user")
);

if (!user) {
alert("Please login first");
return;
}

try {
const response = await fetch(
"http://localhost:5000/api/wishlist/add",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
userId: user.id,
title: artwork.title,
image: artwork.image,
price: artwork.price,
}),
}
);

const data = await response.json();

if (!response.ok) {
  alert(data.message);
  return;
}
setWishlistCount((prev) => prev + 1);
alert("Added to Wishlist ❤️");

} catch (error) {
console.log(error);
alert("Server Error");

}
};

  return (
    
    <BrowserRouter>
      <Navbar 
      cartCount={cartCount}
      wishlistCount={wishlistCount}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      />

      <Routes>
         <Route path="/" element={<Home  searchTerm={searchTerm}
                                         addToCart={addToCart}
                                         addToWishlist={addToWishlist}/>} />
         <Route path="/gallery" element={<Gallery addToCart={addToCart}
                                                  addToWishlist={addToWishlist}/>} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
         
          <Route
            path="/wishlist"
            element={
          <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart setCartCount={setCartCount} />
              </ProtectedRoute>
            }
          />
           <Route
             path="/artwork/:id"
             element={<ArtworkDetails addToCart={addToCart}
                                      addToWishlist={addToWishlist}
              />
            }
            />
            <Route
               path="/my-account"
               element={
                 <ProtectedRoute>
                   <MyAccount />
                 </ProtectedRoute>
               }
             />
             <Route
               path="/orders"
               element={<Orders />}
             />
              <Route
               path="/admin"
               element={<Admin />}
             />
             <Route
               path="/admin/add-artwork"
               element={<AddArtwork />}
             />
             <Route
               path="/admin/manage-artworks"
               element={
                 <ManageArtworks />
               }
             />
             <Route
               path="/admin/edit/:id"
               element={<EditArtwork />}
             />
             <Route
               path="/admin/orders"
               element={
                 <ManageOrders />
               }
             />
         
        </Routes>
        <Footer />

    </BrowserRouter>
  );
}

export default App;