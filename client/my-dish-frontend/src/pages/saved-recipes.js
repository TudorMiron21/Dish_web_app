import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserID";
import axios from "axios";
export const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]); // data structure that contains all the recepies
  const userID = useGetUserId();

  //useEffect is called whenever the page is rendered
  useEffect(() => {
    // a way to put all the data from the data base to that data structure

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipe();
  }, []);

  return (
    <div>
      {/* <h1> Saved Recipes</h1> */}
      <ul>
        {savedRecipes.map((recipe) => (
          <div className="home-item">
            <li key={recipe._id} className="col">

              <div>
                <h2>{recipe.name}</h2>
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
