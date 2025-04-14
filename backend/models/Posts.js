import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
{
    userId: {type:String,require:true},
    firstName:{type:String,require:true,min:2,max:50},
    lastName: {type:String,require:true,min:2,max:50},
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes:{
        type:Map,
        of: Boolean
    }
},
{timestamps:true}

);

const Post = mongoose.model('Post',postSchema);
export default Post;