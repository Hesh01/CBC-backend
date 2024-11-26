import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : { type: String, required: true, unique: true},

    First_Name :{type: String, required:true },

    Last_Name :{ type: String, required:true},

    password :{ type: String,required: true},

    isBlocked : { type: Boolean, default: false },

    type :{ type: String, default: "Customer" },

    profile_pic :{ type: String, default:"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" 
    },
})


const User = mongoose.model("Users", userSchema);

export default User;