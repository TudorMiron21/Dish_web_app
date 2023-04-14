import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import Carousel from "../components/carousel.js";
export const MainListing = () => {
  const [recipes, setRecipes] = useState([]); // data structure that contains all the recepies
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserId();
  //useEffect is called whenever the page is rendered
  useEffect(() => {
    // a way to put all the data from the data base to that data structure
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
    //if (cookies.access_token)
    fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      console.log("userid:" + userID);
      console.log("recipeId:" + recipeID);

      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
      <div className="grid">
        {/* <h1> Recipes</h1> */}
        <ul>
          {recipes.map((recipe) => (
            <div className="home-item">
              <li key={recipe._id} className="col">
                <div>
                  <h2>{recipe.name}</h2>
                  {/* {isRecipeSaved(recipe._id) ? "Saved" :"Save"} */}

                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                </div>

                <div className="instructions">{recipe.instructions}</div>
                <img src={recipe.imageURL} alt={recipe.name} />
                <p>Cooking Time:{recipe.cookingTime} (minutes)</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
};
