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
    username: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String
    },
    phone: {
        type: String,
        required: true,
    },
    nidNo: {
        type: String
    },
    nidImage: {
        type: String
    },
    presentAddress: {
        bn: { type: String },
        en: { type: String }
    }
    ,
    permanentAddress: {
        bn: { type: String },
        en: { type: String }
    }
    ,
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    permission: {
        type: String,
        required: true,
        default: "self",
    },
    ableToEditProfile: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {
    timestamps: true
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)
export default User