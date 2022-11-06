//const { getAll } = require('../services/coinService');

const { getAlllastThree } = require('../services/blogService');

const homeController = require('express').Router();


// TODO replace whit real controller by assigment
homeController.get('/', async (req, res) => {
    //let view; 
    //let courses = [];
//
    //console.log(req.query)
//
    //if(req.user) {
    //    view = 'user-home'
    //    // courses = await getAllByDate(); this without search
    //    courses = await getAllByDate(req.query.search);
    //     
//
    //} else {
    //    view = 'guest-home'
    //    courses = await getRecent()
    //   
    //}
const blogs = await getAlllastThree();
    res.render('home', {
        title:'Home page',
        //coins
       // user: req.user,
       blogs,
       //search: req.query.search
    });
    
});




module.exports = homeController;