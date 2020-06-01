var express = require("express");
var router = express.Router();
var User = require('../models/user');
var Book = require('../models/book');
var auth = require('../middlewares/auth');
var admin = require('../middlewares/isadmin');
var Product = require('../models/product');
var Cart = require('../models/cart');


//Store in res locals

router.use(auth.userLoggedDetails);

// Add a book

router.get('/', async (req, res, next) => {
    try {
        var books = await Book.find({});
        res.render('books' , {books});
        
    } catch (error) {
        next(error);
        
    }
    
    
})

router.get('/add' , admin.isAdmin   , (req, res, next) => {
    res.render('addbook');
})

router.post('/add' , async (req, res, next) => {
    try {
        var book = await Book.create(req.body);
        res.redirect('/books');
        
    } catch (error) {
        next(error);
        
    }
    
    

});

//get single book

router.get("/:id",async (req,res,next) => {
    var id = req.params.id;
    var book = await Book.findById(id);
    res.render("singlebook",{book});
    });


//Add to cart
router.post('/:id/cart', async (req, res, next) => {
    var userId = req.loggedUser.id;
    var bookId = req.params.id;

    try {
        //find existing cart for the user.

        var cartToFind = await Cart.findOne({userId}).populate('products');
     
        //if cart is not found
        if(!cartToFind){
            var productToCreate = await Product.create({bookId});
            var cartToCreate = await Cart.create({userId, products:productToCreate.id });
        }
        
        //if cart is found

        if(cartToFind){
            var isAvailable =  cartToFind.products.find((product) =>  product.bookId == bookId)
            if(isAvailable){
                await Product.findOneAndUpdate({bookId}, {$inc : {quantity : 1}}, {new : true}); 
            }
            else {
            var productToCreate = await Product.create({bookId});
            await Cart.findByIdAndUpdate(cartToFind.id, {$push : {products : productToCreate.id}}, {new : true});   
            } 

        }
        
    
        res.redirect('/users/cart');
        
    } catch (error) {
        next(error);
    }

})

//Update book

//Delete book
 

//router.get('/:slud') get a book

//router.get('/:category') filter books by category



module.exports = router;