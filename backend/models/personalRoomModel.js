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
// personalRoomSchema.index({ 'participants.user': 1 }, { unique: true });
personalRoomSchema.pre('save', async function (next) {
    // Check for duplicate participants in the array
    const existParticipant = await PersonalRoom.find({'participants.user':{
        $all: [this.participants[0].user, this.participants[1].user]
    }})
    if (existParticipant.length >= 1) {
      const err = new Error('Duplicate participants are not allowed.');
      return next(err);
    }
    next();
  });
const PersonalRoom = mongoose.model('PersonalRoom', personalRoomSchema);
export default PersonalRoom