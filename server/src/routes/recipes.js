import express, { json } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { RecipeModel } from "../models/Recipes.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/:categoryArg", async (req, res) => {
  try {
    const categoryArg = req.params.categoryArg;
    const response = await RecipeModel.find({ category: categoryArg }); 
    let secondResponse;

    if (!response || response.length === 0) {
      secondResponse = await RecipeModel.find({ name: { $regex: categoryArg, $options: "i" } });
    }

    if (response && response.length > 0) {
      res.json(response);
    } else if (secondResponse && secondResponse.length > 0) {
      res.json(secondResponse);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.json(err);
  }
});


router.get("/see-more/:recipeId",async(req,res)=>{

  // console.log("pula mea");
  try{
    const recipeId = req.params.recipeId;
    console.log("recipe"+req.params.recipeId);
    const response = await RecipeModel.findById(recipeId);
    console.log(response);
    res.json(response);
  }
  catch(err)
  {
    res.json(err);
  }

});

router.put("/comments",async(req,res)=>{

  try{

    // console.log(req.body);
    const recipeId = req.body.argValue;
    const comment = req.body.comment;
    const userId = req.body.userID;
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const newComment = {
      comment: comment,
      user: userId,
    };

    console.log(newComment);
    const user = await UserModel.findById(userId);

    const atachUserIdComment = user.username +":"+ newComment.comment;

    recipe.comments.push(newComment);

    const updatedRecipe = await recipe.save();

    res.status(200).json(atachUserIdComment);
  }
  catch(err)
  {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }

});

router.get("/likes/:recipeId",async(req,res) =>{

  try{
    const recipeId = req.params.recipeId;
    const response = await RecipeModel.findById(recipeId);
    console.log("hello:"+response.numberOfSaves);
    res.json({saves:response.numberOfSaves});
  }
  catch(err)
  {
    res.json(err);
  }

});


router.get("/", async (req, res) => {
  // this is the route that responses to each time we go to the home page. The Home page should display all the recipes
  try {
    const response = await RecipeModel.find({}); //this does not have any filter so it should return all the recipes
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  // this route is used for creating recipes and submiting them to the db. The return value will be the recipe that was just added

  const recipe = new RecipeModel(
    req.body //this means that the new object will have the fields of the req(request) object
  );
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", async (req, res) => {
  // this route is used for saving recipes for each users. I will use the userId and the recipeId to add the necipe id in the array for the user characterised by his id.

  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);

    if (!recipe) {
      console.log("Recipe not found");
      return res.status(404).json({ message: "Recipe not found!" });
    }

    await recipe.deleteOne();

    await UserModel.updateMany(
      { savedRecipes: req.body.recipeID },
      { $pull: { savedRecipes: req.body.recipeID } }
    );

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  //this router is used to show all the reciped ids that are saved by a user at the moment

  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes }); // the '?' is used in case the user has no recipes saved and is says that the response could be a null value
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/:userID", async (req, res) => {
  //this router is used to show all the recipes that are saved by a user at the moment

  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    }); //this graabs all the recipe objects by their ids

    res.json({ savedRecipes }); 
  } catch (err) {
    res.json(err);
  }
});

export { router as recipesRouter };
