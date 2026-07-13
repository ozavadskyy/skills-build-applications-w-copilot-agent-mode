import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Activity from './models/activity.model';
import LeaderboardEntry from './models/leaderboard.model';
import Team from './models/team.model';
import User from './models/user.model';
import Workout from './models/workout.model';
import './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().sort({ points: -1 }).lean();
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().sort({ memberCount: -1 }).lean();
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().sort({ createdAt: -1 }).lean();
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().sort({ title: 1 }).lean();
  res.json(workouts);
});

app.listen(port, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  // Prefer the forwarded Codespaces URL when available, otherwise fall back to localhost.
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

  console.log(`OctoFit backend running at ${baseUrl}`);
});
