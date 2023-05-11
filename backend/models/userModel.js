import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        bn: { type: String, required: true },
        en: { type: String, required: true },
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: [{
        type: String,
        required: true,
    }],
    nidNo: [{
        type: String,
        required: true,
    }],
    nidImage: [{
        type: String,
        required: true,
    }],
    presentAddress: [
        {
            bn: { type: String, required: true },
            en: { type: String, required: true },
        }
    ],
    permanentAddress: [
        {
            bn: { type: String, required: true },
            en: { type: String, required: true },
        }
    ],
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    timestamps: true
})
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcryptjs.compare(enteredPassword,this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)
export default User