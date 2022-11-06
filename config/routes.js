const autController = require("../controllers/authController");
const blogController = require("../controllers/blogController");
const errController = require("../controllers/errControler");
const homeController = require("../controllers/homecontroller");
const profileController = require("../controllers/profileController");
const { hasUser, isGuest } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', autController);
    app.use('/profile', hasUser(), profileController);
    app.use('/blog', blogController);
   

    app.use('/*', errController);

};

 