import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gyanranjan9661:gyan7462@cluster0.qq81xhn.mongodb.net/food-delivery')
    .then( () => {
        console.log("DB connected");
    })
}