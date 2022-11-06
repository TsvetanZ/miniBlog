const { hasUser } = require('../middlewares/guards');
const { getById, create, deleteBlog, update, getAll, followed, getByEmail, getFollowedUser } = require('../services/blogService');
const { parseError } = require('../util/parser');

const blogController = require('express').Router();



blogController.get('/create', hasUser(), (req, res) =>{
    res.render('create', {
        title: 'Blog Create'
    })
});

blogController.get('/catalog', async(req, res) => {
    const blogs = await getAll();
    res.render('catalog', {
        title:'Catalog Blog',
        blogs
    });
})

blogController.get('/:id', async (req, res) =>{
    const blog = await getById(req.params.id);
    const owner = await getByEmail(blog.owner.toString());
    const followedUser = await getFollowedUser(blog);
     

    if(req.user) {
        blog.isOwner = blog.owner.toString() == req.user._id.toString();
        blog.followed = blog.users.map(x => x.toString()).includes(req.user._id.toString());   
    }
    
    res.render('details', {
        title: 'Details',
        blog,
        email: owner.email,
        follow: followedUser.join(', ')
    });
});


blogController.post( '/create', hasUser(), async (req, res) => {
    const blog = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        content: req.body.content,
        category: req.body.category,
        owner: req.user._id,
    };

    
    try {
        if(Object.values(blog).some(v=> !v)){
            throw new Error('All feilds are required')
        }
        const result = await create(blog);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
           title: 'Create blog',
            body: blog,
            errors:parseError(error)
        });
       
    }
});

blogController.get('/:id/delete', hasUser(), async(req, res) =>{
    const blog =await getById(req.params.id);

      if (blog.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login')
    } 
    await deleteBlog(req.params.id)
    res.redirect('/')
});


blogController.get('/:id/edit', hasUser(), async(req, res) =>{
    const blog =await getById(req.params.id);
    if(blog.owner != req.user._id) {
        return res.redirect('/auth/login')
    }
    res.render('edit', {
        title: 'Edit',
        blog
    })
});



blogController.post('/:id/edit', hasUser(), async(req, res) =>{
    const blog = await getById(req.params.id);

    if(blog.owner.toString() != req.user._id.toString()){
        return res.redirect('/auth/login')
    }

    try { 
        await update(req.params.id, req.body)
        res.redirect(`/blog/${req.params.id}`);
    } catch (error) {
        res.render('edit', {
            title: 'Edit',
            blog: req.body,
            errors:parseError(error)
        });  
    }
});


blogController.get('/:id/followed', async(req, res) => {
    const blog = await getById(req.params.id);

    if(blog.owner.toString() != req.user._id.toString()
    && blog.users.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        await followed(req.params.id, req.user._id);
    }
  
    return res.redirect(`/blog/${req.params.id}`)

});


module.exports = blogController;