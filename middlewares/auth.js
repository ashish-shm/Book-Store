var User = require('../models/user');
exports.userLoggedDetails = async (req, res, next) => {
    
    
    try {
        if(req.session && req.session.userId) {
            var userId = req.session.userId;
            var user = await User.findById(userId);
            req.loggedUser = user;
            res.locals.loggedUser = user;
            next();
        }
        else {
            req.loggedUser = null;
            res.locals.locals = null;
            res.redirect('/users/login');
            next();
        }
        
    } catch (error) {
        next(error)
        
    }
    
}
