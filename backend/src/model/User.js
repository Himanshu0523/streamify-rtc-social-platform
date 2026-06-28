import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String , 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: "",
    },
    isOnboarded: { 
        type: Boolean,
        default: false 
    },
    bio: { 
        type: String, 
        default: "" 
    },
    nativeLanguage: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: "",
    },

    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
} , { timestamps: true});



// pre hook 
// email password => hashed


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword , this.password);
    return isPasswordCorrect;
}

const User = mongoose.model("User" , userSchema);

export default User;