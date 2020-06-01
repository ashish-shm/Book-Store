var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema ( {
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    products : [{
        type : Schema.Types.ObjectId,
        ref : 'Product'
    }]
}, {timestamps : true});

module.exports = mongoose.model('Cart', cartSchema);