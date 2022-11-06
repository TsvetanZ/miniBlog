const { getAll } = require('../services/blogService');
const { getCreateblogs, getFollowBlogs } = require('../services/profileService');

const profileController = require ('express').Router();


profileController.get('/', async(req,res) =>{
    const userId = req.user._id;
    const blogs= await getCreateblogs(userId);
    const followed = await getFollowBlogs(userId);
    
    
    res.render('profile', {
        title: "Profile Page",
        blogs,
        followed
    })

});



module.exports = profileController;

