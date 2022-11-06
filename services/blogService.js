const Blog = require('../models/Blog');
const User = require('../models/User');

async function getAlllastThree(){
    //return  Blog.find({}).lean();
    return  Blog.find({}).sort({createAdt:-1}).limit(3).lean();
}

async function getAll(){
    return  Blog.find({}).lean();
}
    

//async function getAllByDate(search) { // this is  for search
//    const query = {};
//    if(search) {
//        query.title = new RegExp(search, `i`);
//    }
//        return  Course.find(query).sort({createAdt:1 }).lean();
//}

//async function getRecent(){
//    return  Course.find({}).sort({userCount:-1 }).limit(3).lean();//  по този начин го сортираме по  userCount в намаляващ ред
//}

async function getById(id){
    return Blog.findById(id).lean();
}

async function getByEmail(idOwner){
    return User.findById(idOwner).lean();
}

async function getFollowedUser(blog){
   
    
   
    const arr = [];
    for (let index = 0; index < blog.users.length; index++) {
        const element = (await User.findById(blog.users[index]).lean()).username;
        arr.push(element);
    }
    return arr;
}

//async function getByUserBooking(userId){
//    return Course.find({bookings: userId}).lean();
//} 

async function create(blog) {
    return Blog.create(blog)
}

async function update(id, data) {
    const existing = await Blog.findById(id);

    existing.title = data.title;
    existing.imageUrl = data.imageUrl;
    existing.content = data.content;
    existing.category = data.category;

    return existing.save();
}

async function deleteBlog (id) {
     await Blog.findByIdAndDelete(id);
}

async function followed(blogId, userId) {
    const existing = await Blog.findById(blogId);
    existing.users.push(userId);

    //existing.userCount++; userCount
    return existing.save();
}
//async function bookRooom (hotelId, userId) {
//    const hotel = await Course.findById(hotelId);
//
//    if(hotel.bookings.includes(userId)) { 
//        throw new Error('Cannot book twice ');
//    }
//    hotel.bookings.push(userId);
//    hotel.rooms = hotel.rooms-1;
//    await hotel.save();
//}





module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteBlog,
    followed,
    getAlllastThree,
    getByEmail,
    getFollowedUser
}