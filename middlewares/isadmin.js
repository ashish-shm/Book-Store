var User = require('../models/user');


exports.isAdmin = async (req, res, next) => {
    
    
    try {
        if(req.loggedUser.isAdmin)
        return next();
        else{
            res.send('Unauthorised for this operation');
            res.redirect('/users/login');
            next();
        }
        
        
    } 
    catch (error) {
        next(error)
        
    }
    
}