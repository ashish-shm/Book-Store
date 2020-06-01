var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema ({
    bookId : {
        type : Schema.Types.ObjectId,
        ref : 'Book'
    },
    quantity : {
        type : Number,
        default : 1
    },

})

module.exports = mongoose.model('Product', productSchema);