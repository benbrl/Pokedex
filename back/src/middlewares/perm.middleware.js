const { purge } = require("../routes/type.router");
const userService = require('../services/user.service');

exports.isUser = (param) => {
    return (req, res, next) => {
        if (param.role === 'USER')
            return next();

        //peut faire des put, de post, delete, get...
        else

            //ne peux pas avoir plus d'un dresseur.
            //ne peux pas changer la region d'un pokemon

            //que les get pour les users
            return res.status(403).send();
    };
};



exports.isADMIN = (param) => {
    return (req, res, next) => {
      user =  userService.getUserByID(userId)

      console.log(user);

        if (user.role === 'ADMIN') {

            return next();
        }     else 
        {
            return res.status(403).send();
        }


        // peut faire des put, de post, delete, get...
   

        //     ne peux pas avoir plus d'un dresseur.
        //     ne peux pas changer la region d'un pokemon

        //     que les get pour les users
          
    };
};


// authnetooicaiton, puis il a le role voulu, purge


// isUserAdmin, isUserAdmin