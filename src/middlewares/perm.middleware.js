const { purge } = require("../routes/type.router");

exports.isUserUSER = (param) => {
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



exports.isUserADMIN = (param) => {
    return (req, res, next) => {
        if (param.role === 'ADMIN')
            return next();

        //peut faire des put, de post, delete, get...
        else

            //ne peux pas avoir plus d'un dresseur.
            //ne peux pas changer la region d'un pokemon

            //que les get pour les users
            return res.status(403).send();
    };
};


// authnetooicaiton, puis il a le role voulu, purge


// isUserAdmin, isUserAdmin