import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequenceValue: { type: Number, default: 0 },
});

export const Counter = mongoose.model('Counter', counterSchema);
async function getNextId(counterName) {
    const counter = await Counter.findByIdAndUpdate(
      counterName,
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
  
    return counter.sequenceValue;
  }
  
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
    phoneVerified: {
        type: Boolean,
        default: false
    },
    nidNo: {
        type: String
    },
    nidImage: {
        type: String
    },
    nidStatus: {
        type: String,
        default: 'none'
    },
    nidVerified: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default: ''
    },
    presentAddress: {
        bn: { type: String },
        en: { type: String }
    },
    permanentAddress: {
        bn: { type: String },
        en: { type: String }
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
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
    },
    hasServiceProviderProfile: {
        type: Boolean,
        default: false,
    },
    premiumUserEndDate: {
        type: Date,
        default: new Date(),
    },
    deleteRequest: {
        requested: {
            type: Boolean,
            default: false,
        }, 
        note: {
            type: String,
            default: null,
        }
    },
    registrationNo: {
        type: Number,
    }
}, {
    timestamps: true
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.registrationNo) {
        this.registrationNo = await getNextId('userRegistrationCounter');
      }
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)
export default User