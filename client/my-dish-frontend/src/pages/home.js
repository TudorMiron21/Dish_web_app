import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import Carousel from "../components/carousel.js";
export const Home = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60",
      title: "Photo 1",
    },
    {
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60",
      title: "Photo 1",
    },
    {
      url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60",
      title: "Photo 1",
    },
    {
      url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60",
      title: "Photo 1",
    },
    {
      url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60",
      title: "Photo 1",
    },
  ];
  const containerStyles = {

    width: "100%",
    height:"500px",
    margin: "0 auto",
  };
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

  if (userID) {
    return (
      <div>
        <div style={containerStyles}>
          <Carousel slides={slides} />
        </div>
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
      </div>
    );
  } else {
    return <h1>please login first</h1>;
  }
};
