import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

const Team = mongoose.model('Team', teamSchema);

export default Team;
