import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import "./styles/Home.css";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://api.edamam.com/search?q=pizza&app_id=a5de3521&app_key=28f8a20bd89382740e68d4bbb349b977&from=0&to=50"
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data.hits || [])) // Ensure recipes is always an array
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRecipes([]); // Set an empty array in case of an error
      });
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="logo">Tasty Food</h1>
        <nav className="nav-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="nav-buttons">
            <button onClick={() => navigate("/about")}>About Us</button>
            <button onClick={() => setShowLogin(true)}>Login</button>
          </div>
        </nav>
      </header>

      {showLogin && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"></h5>
                <button type="button" className="btn-close" onClick={() => setShowLogin(false)}></button>
              </div>
              <div className="modal-body">
                <Login />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <h3>{recipe.recipe.label}</h3>
              <p>{recipe.recipe.source}</p>
            </div>
          ))
        ) : (
          <p>Loading recipes...</p>
        )}
      </div>

      <footer className="footer">
        <p>Contact Us</p>
        <div className="footer-icons">
          <a href="tel:+1234567890" target="_blank" rel="noopener noreferrer" className="phone-icon">
            <FaPhone />
          </a>
          <a href="mailto:info@tastyfood.com" target="_blank" rel="noopener noreferrer" className="email-icon">
            <FaEnvelope />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-icon">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="facebook-icon">
            <FaFacebook />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
