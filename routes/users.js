var express = require('express');
var router = express.Router();
var session = require('express-session');
var User = require('../models/user');
var Book = require('../models/book');
var auth = require('../middlewares/auth');
var Cart = require('../models/cart');
var Product =  require('../models/product')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Register

router.get('/register', async (req, res, next) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  try {

    //admins

    const admins = ["admin@gmail.com","admin2@gmail.com"];
    if(admins.includes(req.body.email)){
      req.body.isAdmin = true;
      var user = await User.create(req.body);
      
      // res.json({success:true,user})
      // console.log(user);
      res.redirect('/users/login');
    }

    // users
    else{
    var user = await User.create(req.body);
    // res.json({success:true,user})
  
  res.redirect('/users/login');
    }
  } catch (error) {
    next(error);
    
  }
  
  

});

// router.use(auth.userLoggedDetails);



//User Login

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', async (req, res, next) =>{
  
  try {

    var {email, password} = req.body;
    var user = await User.findOne({email});
     
      if(!user){
       // req.flash('Error', 'There is no user registered with this email:id');
       console.log('email-id is not registered');
       return res.redirect('/users/login');
     }
 
     //Verify password here
     else if(await !user.verifyPassword(password)){
       console.log('Wrong password');
       return res.redirect('/users/login');
     }
 
     //log a user in
     //create a session on the server side
     req.session.userId = user._id;
     return res.redirect('/users/dashboard');
    
  } catch (error) {
    next(error);
    
  }
  
  
 
  });




//Dashboard

router.get('/dashboard',auth.userLoggedDetails , (req, res, next) => {
  res.render('dashboard');
  console.log(req.loggedUser);
  next();
})


//Cart

router.get('/cart', auth.userLoggedDetails,async (req, res, next) => {


  try {
    var userId = req.loggedUser.id;
    var cart = await Cart.findOne({userId}).populate({path : 'products' , populate : {path : "bookId"}})    
    if(!cart)
      return res.json({success : false, message : 'Cart is not created'});

      // console.log(cart);

      res.render('cart', {cart});

    
  } catch (error) {
    next(error);
  }


});



// router.post('/cart/:id',auth.userLoggedDetails, async (req, res, next) => {
 
//  try {
//   var id = req.params.id;
//   var book = await Book.findById(id);
//   var userid = req.loggedUser.id;
//   await User.findOneAndUpdate({id} , {$push: {cart : id}});
//   res.redirect('/users/cart');
   
//  } catch (error) {
//    next(error);
   
//  }
 
  

// })

module.exports = router;
