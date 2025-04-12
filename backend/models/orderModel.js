import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId:{type:String, requied: true},
    items:{type:Array, requied: true},
    amount:{type:Number, requied: true},
    address:{type:Object, requied: true}, 
    status:{type:String, default: "Food Processing"},
    date:{type:Date, default:Date.now()},
    payment:{type:Boolean, default: false}
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;