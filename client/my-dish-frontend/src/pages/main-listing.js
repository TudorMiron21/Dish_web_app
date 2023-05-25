import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export const MainListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryArg = queryParams.get("argValue");
  const [recipes, setRecipes] = useState([]); // data structure that contains all the recepies
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [saves, setSaves] = useState(0);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserId();
  //useEffect is called whenever the page is rendered
  useEffect(() => {
    // a way to put all the data from the data base to that data structure
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/${categoryArg}`
        );
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

    // const fetchSaveCounts = async () => {
    //   const saveCountRequests = recipes.map((recipe) =>
    //     getNoSaves(recipe._id)
    //   );
    //   await Promise.all(saveCountRequests);
    // }
    fetchRecipe();
    // fetchSaveCounts();

    //if (cookies.access_token)
    fetchSavedRecipe();
  }, []);

  const getNoSaves = async (recipeId) => {
    try {
      console.log("id:" + recipeId);
      const response = await axios.get(
        `http://localhost:3001/recipes/likes/${recipeId}`
      );
      console.log(response.data.numberOfSaves);
      return response.data.numberOfSaves;
    } catch (err) {
      console.log(err);
    }
  };

  const saveRecipe = async (recipeID) => {
    try {
      // console.log("userid:" + userID);
      // console.log("recipeId:" + recipeID);

      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const seeMoreHandle = (recipeId) => {
    navigate("/see-more/?argValue=" + recipeId);
    console.log(recipeId);
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  const RecipeExist = () =>recipes.length > 0;
    
  if (RecipeExist()) {
    console.log("len:" + RecipeExist);
    return (
      <div className="grid">
        {/* <h1> Recipes</h1> */}
        <ul className="listing-ul">
          {recipes.map((recipe) => (
            <div className="home-item" key={recipe._id}>
              <li className="col">
                <div>
                  <h2>{recipe.name}</h2>
                  {/* {isRecipeSaved(recipe._id) ? "Saved" :"Save"} */}

                  <button
                    className="style-button"
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>

                  <p>{() => getNoSaves(recipe._id)} saves</p>
                </div>

                <div className="instructions">{recipe.instructions}</div>
                <img src={recipe.imageURL} alt={recipe.name} />
                <p>Cooking Time:{recipe.cookingTime} (minutes)</p>
                <button
                  className="style-button"
                  onClick={() => seeMoreHandle(recipe._id)}
                >
                  See More
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="cute-page">
        <h1>Recipe Not Found</h1>
        <p>Oops! It looks like the recipe you're looking for doesn't exist.</p>
        <p>
          But don't worry, there are plenty of other delicious recipes to
          explore!
        </p>
        {/* Add more cute page content, styling, or additional components as needed */}
      </div>
    );
  }
};
