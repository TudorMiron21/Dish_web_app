import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
export const DeleteRecipe = () => {
  const [recipes, setRecipes] = useState([]); // data structure that contains all the recepies
  const [cookies, _] = useCookies(["access_token"]);

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

    fetchRecipe();
    //if (cookies.access_token)
  }, []);

  // const saveRecipe = async (recipeID) => {
  //   try {
  //     console.log("userid:" + userID);
  //     console.log("recipeId:" + recipeID);

  //     const response = await axios.delete("http://localhost:3001/recipes", {
  //       recipeID,
  //       userID,
  //     });
  //     setSavedRecipes(response.data.savedRecipes);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const deleteRecipe = async (recipeID) => {
    try {
      console.log(recipeID);
      const response = await axios.delete("http://localhost:3001/recipes", {
        data: { recipeID } // Pass recipeID as request data
      });
  
      if (response.status === 404) {
        // Handle 404 status
        console.log("Recipe not found");
      } else {
        // Recipe deleted successfully or other status
        console.log("Recipe deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
                    className="style-button"
                    onClick={() => deleteRecipe(recipe._id)}
                    // disabled={isRecipeSaved(recipe._id)}
                  >
                    {/* {isRecipeSaved(recipe._id) ? "Deleted" : "Delete"} */}
                    Delete
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
    </div>
  );
};
