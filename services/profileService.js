const Blog = require('../models/Blog');
const {getAll} = require ('./blogService')
 

async function getCreateblogs(userId) {
    const blogs = await getAll( );
    return blogs.filter(blog => blog.owner == userId);
   
}

async function getFollowBlogs(userId) {
    /*const blogs = await getAll( );

    const followed = [];
    for (let index = 0; index < blogs.length; index++) {
        const idBlog = blogs[index]._id
        const blogId = ((blogs[index].users).filter(x => x == userId)).toString();
        if(blogId) {
            console.log(idBlog)
            followed.push(await Blog.findById(idBlog).lean())
        }
    }
    return followed */
    return Blog.find({users:userId}).lean();

}




module.exports = {
    getCreateblogs,
    getFollowBlogs
}



    //blog.isOwner = blog.owner.toString() == req.user._id.toString();
    //blog.followed = blog.users.map(x => x.toString()).includes(req.user._id.toString());   