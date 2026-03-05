const {Schema , model} = require("mongoose")

const userSchema =  new Schema({
    veh_no : String,
    wall_Bal : Number,

},{timestamps : true})


const User = model('User', userSchema);

module.exports = User;

// Register api -> Veh No & Wallet initial
// Top up api 
// Discount rate -> 2 way = 30 but 1 way = 20
