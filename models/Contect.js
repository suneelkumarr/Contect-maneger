const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        default:'personal'
    },
    type:{
        type:String,
        default:'personal'
    },
    date:{
        type:Date,
        default:Date.now()
    }
})


module.exports = mongoose.model('contact', ContactSchema);