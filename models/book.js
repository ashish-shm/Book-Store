
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');


var bookSchema = new Schema({
    title:
    {
     type:String,
    required:true
    },
    slug:{
        type:String
    },
    imageUrl: { 
        type: String,
        required: true 
    },

    description:{
        type:String,
        required:true
    },

    author:{
        type:String,
        required:true
    }
    ,
    category:{
        type:String,
        required:true
    },
    price: {
        type: Number, 
        required: true
    },
    // comments:[{
    //     type:Schema.Types.objectId,
    //     ref:"Comment"
    // }]
},{timeStamps:true})

bookSchema.pre("save",function(next){
    if(this.title && this.isModified("title")){
        this.slug = slug(this.title,{lower:true})
        next()
    }
    next()
})



module.exports = mongoose.model("Book",bookSchema);


