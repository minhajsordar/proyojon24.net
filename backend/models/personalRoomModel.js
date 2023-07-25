import mongoose from "mongoose";

const personalRoomSchema = new mongoose.Schema({
    participants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalMessage'
    }
}, {
    timestamps: true
});
personalRoomSchema.index({ 'participants.user': 1 }, { unique: true });
const PersonalRoom = mongoose.model('PersonalRoom', personalRoomSchema);
export default PersonalRoom