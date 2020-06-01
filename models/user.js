var bcryptjs = require('bcryptjs');
var session = require('express-session');

var mongoose = require('mongoose');
var Book = require('../models/book');

var Schema = mongoose.Schema;




var userSchema = new Schema({
    name : {
        type: String,
        required: true,
        max : 255,
    },
    email: {
        type: String,
        required : true,
        unique : true,
        max : 255,
        
    },
    password : {
        type : String,
        min : 8,
        max : 255,
        required : true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    username : {
        type : String,
        max : 255,
    },
    cart : {
        type : [{type : Schema.Types.ObjectId,
        ref : Book}]
    }

}, {timestamps: true});

userSchema.pre('save', async function (next) {
    // this.password = bcryptjs.hashSync(this.password, 10);
    if( this.password && this.isModified('password')){
    this.password = await bcryptjs.hash(this.password, 10);
    next();        
    }
});

userSchema.methods.verifyPassword = function(password){
    return bcryptjs.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);