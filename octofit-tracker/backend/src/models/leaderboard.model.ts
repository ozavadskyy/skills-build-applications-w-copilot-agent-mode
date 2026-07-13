import mongoose from 'mongoose';

const leaderboardEntrySchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true, min: 1 },
    userName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
