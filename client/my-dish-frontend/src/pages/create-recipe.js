import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserId(); // call my hook to get the user id
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
    category: "",
    numberOfSaves: 0
  });
  const [cookies, _] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    // this handles changes in all the fields
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleChangeCategory = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const onSubmit = async (event) => {
    event.preventDefault(); //used to maintain the data in place when the page is refreshed

    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe Created!");
      console.log(recipe);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="form-content"
          name="name"
          onChange={handleChange}
        ></input>

        <div className="dropdown">
          <h4>Category:</h4>
          <select name = "category" onChange={handleChangeCategory} className="dropbtn">
            <option value="">Select an option</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Sushi">Sushi</option>
            <option value="Healthy">Healthy</option>
            <option value="Desserts">Desserts</option>
            <option value="BreakFast">BreakFast</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <label htmlFor="ingredients">Ingredients:</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            className="form-content"
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button
          className="add-ingredients-button"
          type="button"
          onClick={addIngredient}
        >
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions:</label>

        <textarea
          id="instructions"
          name="instructions"
          className="textarea-content"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageURL">Image URL:</label>

        <input
          type="text"
          id="imageURL"
          name="imageURL"
          className="form-content"
          onChange={handleChange}
        ></input>

        <label htmlFor="cookingTime">Cooking Time(minutes):</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          className="form-content"
          onChange={handleChange}
        ></input>

        <button type="submit" className="reg-button" /*onClick={}*/>
          Submit
        </button>
      </form>
    </div>
  );
};
