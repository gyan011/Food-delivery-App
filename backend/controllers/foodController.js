import foodModel from "../models/foodModels.js";
import fs from 'fs';
import path from "path";

//add food item
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success: true, message: "Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
    
        if (foods.length === 0) {
          return res.status(404).json({ success: false, message: "No food items found" });
        }
    
        res.json({ success: true, data: foods });
      } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
    
        // Check if food exists
        if (!food) {
          return res.status(404).json({ success: false, message: "Food not found" });
        }
        
        //delete food from upload file
        fs.unlink(`uploads/${food.image}`, ()=>{})
    
        // Delete Food from Database
        await foodModel.findByIdAndDelete(req.body.id);
    
        res.json({ success: true, message: "Food removed successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export {addFood, listFood, removeFood};
