const { Schema, model, Types } = require ('mongoose');


const URL_PATTERN = /^https?:\/\/.+$/i; 

const blogSchema = new Schema ({
    title: {type: String, minlength: [5, 'The title should be at least 5 characters'], 
             maxlength: [50, 'The title should be no longer than 50 characters'] },
    imageUrl: {
        type: String,
         validate: {
            validator: (value) => URL_PATTERN.test(value), 
            message: 'Block image is not valid'
        }
    },
    content: {type: String, minlength:[10, 'Content must at least 10 characters long']},
    category: {type: String, minlength:[3, 'Category must at least 3 characters long']},
    users: { type: [Types.ObjectId], ref: 'User', default: [] },
    createAdt:{type: String, required: true, default: () => (new Date()).toISOString().slice(0, 10)}, 
    owner: { type: Types.ObjectId, ref: 'User'}
});

blogSchema.index ({title: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Blog = model ('Blog', blogSchema);

module.exports = Blog;
