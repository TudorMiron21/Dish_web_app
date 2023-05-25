import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserId } from "../hooks/useGetUserID";

export const SeeMore = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const argValue = queryParams.get("argValue");
  const userID = useGetUserId();

  console.log("argValue:", argValue); // Check the value of argValue

  const [foodUrl, setFoodUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [comments, setComments] = useState([]);
  const [commitComment, setCommitComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [userName,setUserName] = useState("");

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/see-more/${argValue}`
        );

        console.log("API response:", response.data);
        setFoodUrl(response.data.imageURL);
        setIngredients(response.data.ingredients);
        setName(response.data.name);
        setCategory(response.data.category);
        setInstructions(response.data.instructions);
        setCookingTime(response.data.cookingTime);
        setComments(response.data.comments);

        if (!comments) {
          setComments(["No comments on this post 😭"]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRecipe();
  }, []);

  const addComment = () => {
    setShowCommentInput(true);
  };

  const handleCommentChange = (event) => {
    setCommitComment(event.target.value);
  };

  const getUserName = async() => {

    try{
      const response = await axios.get(`http://localhost:3001/auth/register/${userID}`)
      console.log("user:" +response);
      setUserName(response);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const sendCommentToServer = async (comment) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes/comments",
        {
          argValue,
          comment,
          userID,
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };


  const submitComment = () => {
    if (commitComment.trim() === "") {
      // Do not submit an empty comment
      return;
    }
    // Perform any validation or processing on the comment, e.g., sending it to the server

    getUserName();
    sendCommentToServer(commitComment);
    // Add the comment to the comments array

    setComments((prevComments) => [
      ...prevComments,
      { comment: userName + commitComment },
    ]);
    
    // Clear the comment input
    setCommitComment("");

    // Hide the comment input area
    setShowCommentInput(false);
  };

  return (
    <div className="see-more-container">
      <h1>{name}</h1>
      <img className="recipe-image" src={foodUrl} alt="recipe" />

      <div className="see-more-text">
        <h3>Ingredients:</h3>
        <ul className="ingredients-list">
          {ingredients.map((ingredient) => (
            <div key={ingredient._id}>
              <li>{ingredient}</li>
            </div>
          ))}
        </ul>
        <p className="instructions">{instructions}</p>

        <p className="cooking-time">Cooking Time: {cookingTime} minutes</p>
      </div>

      <br />
      <br />
      <div className="comment-section">
        <h3>Comment Section:</h3>
        <ul className="comment-list">
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              {comment.comment}
            </li>
          ))}
        </ul>

        {showCommentInput ? (
          <div className="comment-input-section">
            <textarea
              className="comment-input"
              placeholder="Write your comment..."
              onChange={handleCommentChange}
              value={commitComment}
            />
            <button className="submit-comment-button" onClick={submitComment}>
              Submit
            </button>
          </div>
        ) : (
          <button className="add-comment-button" onClick={addComment}>
            Add Comment
          </button>
        )}
      </div>
    </div>
  );
};
