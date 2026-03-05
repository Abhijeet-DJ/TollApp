const { Schema , model, default: mongoose } = require('mongoose');
const User = require('./mdoel.user');

const trnSchema = new Schema({
    veh_no : {
        type : String,
        required : true  // Must pass this field as input to write in trn doc
    },
    location : String, // Check for location so we can expand in future
    amount : {
        type : Number,
        default : 20
    },
    logBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required : true
    }
},{timestamps: true});

const Trn =  model('Trn', trnSchema)

module.exports = Trn