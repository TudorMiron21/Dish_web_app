import { useEffect, useState } from "react";
import axios from "axios";

export const AdminControl = () => {
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getAllUsers"
        );
        const updatedUsers = response.data.map((user) => ({
          ...user,
          noSavedRecipes: user.savedRecipes.length // Get the number of saved recipes
        }));
        setUsers(updatedUsers);
      } catch (err) {
        console.log(err);
      }
    };

    const getRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/recipes/"
        );
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
    getRecipes();
  }, []);

  const handleBanUser = async (userId) => {
    try {
      await axios.put(`http://localhost:3001/auth/banUser/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-panel">
      <h1>User Management</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number Saved Recipes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.noSavedRecipes}</td>
              <td>
                <button
                  onClick={() => handleBanUser(user._id)}
                  disabled={user.isBanned}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Recipe Management</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Image</th>
            <th>Cooking Time</th>
            <th>Category</th>
            <th>Number of Saves</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td>{recipe._id}</td>
              <td>{recipe.name}</td>
              <td>{recipe.ingredients.join(", ")}</td>
              <td>{recipe.instructions}</td>
              <td>
                <img src={recipe.imageURL} alt={recipe.name} />
              </td>
              <td>{recipe.cookingTime}</td>
              <td>{recipe.category}</td>
              <td>{recipe.numberOfSaves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
