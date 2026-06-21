import profile from "../assets/profile.jpeg";

function About() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <img src={profile} alt="Shrishti" className="profile-img" />

        <h1>Shrishti</h1>

        <h3>Artist • Creator • Dreamer</h3>

        <p>
          Welcome to Shrishti Arts, where imagination meets creativity.
          Every piece I create is made with passion, patience, and a love
          for bringing ideas to life.
        </p>
      </div>

      <div className="about-section">
        <h2>🌸 My Story</h2>

        <p>
          Hi! I'm Shrishti, an engineering student and self-taught artist
          who loves transforming simple objects into meaningful pieces of art.
          What started as a hobby gradually became a way for me to express
          creativity and connect with people through handmade creations.
        </p>
      </div>

      <div className="about-section">
        <h2>🎨 Why I Love Creating Art</h2>

        <p>
          Art allows me to turn imagination into reality. Whether it's
          painting a jar, designing an anime poster, creating a custom
          phone case, or making personalized gifts, I enjoy seeing ordinary
          objects become unique and memorable. Every creation tells a story
          and carries a piece of the artist's heart.
        </p>
      </div>

      <div className="about-section">
        <h2>✨ What I Create</h2>

        <div className="skills-grid">
          <div>🫙 Hand Painted Jars</div>
          <div>🖼️ Anime Posters</div>
          <div>📱 Phone Cases</div>
          <div>🔑 Custom Keychains</div>
          <div>👜 Tote Bags</div>
          <div>🎁 Personalized Gifts</div>
        </div>
      </div>

      <div className="about-section">
        <h2>💖 My Values</h2>

        <ul>
          <li>Quality over quantity</li>
          <li>Creativity in every piece</li>
          <li>Attention to detail</li>
          <li>Customer satisfaction</li>
          <li>Unique handmade designs</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>🌟 Fun Facts About Me</h2>

        <ul>
          <li>Huge anime fan 🎌</li>
          <li>Love creating custom gifts 🎁</li>
          <li>Enjoy experimenting with new art styles 🎨</li>
          <li>Believe every artwork should tell a story ✨</li>
        </ul>
      </div>

      <div className="about-footer">
        <h2>Let's Create Something Special Together!</h2>

        <p>
          Thank you for visiting Shrishti Arts. I hope my creations bring
          happiness, inspiration, and a touch of creativity to your life.
        </p>
      </div>

    </div>
  );
}

export default About;