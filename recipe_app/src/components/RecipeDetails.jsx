import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.edamam.com/search?r=${encodeURIComponent(id)}&app_id=a5de3521&app_key=28f8a20bd89382740e68d4bbb349b977`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setRecipe(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  return (
    <div className="recipe-details-container">
      <h2>{recipe.label}</h2>
      <img src={recipe.image} alt={recipe.label} />
      <p><strong>Source:</strong> {recipe.source}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Calories:</strong> {Math.round(recipe.calories)} kcal</p>
      <p><strong>Servings:</strong> {recipe.yield}</p>
    </div>
  );
};

export default RecipeDetails;
