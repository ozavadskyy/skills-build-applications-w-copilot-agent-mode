import mongoose from 'mongoose';
import Activity from '../models/activity.model';
import LeaderboardEntry from '../models/leaderboard.model';
import Team from '../models/team.model';
import User from '../models/user.model';
import Workout from '../models/workout.model';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        name: 'Avery Miles',
        email: 'avery.miles@octofit.app',
        fitnessLevel: 'Intermediate',
        points: 1280,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@octofit.app',
        fitnessLevel: 'Beginner',
        points: 940,
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@octofit.app',
        fitnessLevel: 'Advanced',
        points: 1520,
      },
    ]);

    await Team.insertMany([
      { name: 'Summit Sprinters', city: 'Seattle', memberCount: 7 },
      { name: 'Metro Lifters', city: 'Chicago', memberCount: 6 },
      { name: 'Sunrise Cyclers', city: 'Austin', memberCount: 8 },
    ]);

    await Activity.insertMany([
      {
        userName: 'Avery Miles',
        type: 'Morning Run',
        durationMinutes: 35,
        caloriesBurned: 320,
      },
      {
        userName: 'Jordan Lee',
        type: 'Strength Session',
        durationMinutes: 50,
        caloriesBurned: 410,
      },
      {
        userName: 'Priya Nair',
        type: 'HIIT Circuit',
        durationMinutes: 28,
        caloriesBurned: 365,
      },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, userName: 'Priya Nair', points: 1520 },
      { rank: 2, userName: 'Avery Miles', points: 1280 },
      { rank: 3, userName: 'Jordan Lee', points: 940 },
    ]);

    await Workout.insertMany([
      {
        title: 'Core Crusher 30',
        focus: 'Core',
        durationMinutes: 30,
        difficulty: 'Intermediate',
      },
      {
        title: 'Power Legs Builder',
        focus: 'Lower Body',
        durationMinutes: 40,
        difficulty: 'Advanced',
      },
      {
        title: 'Starter Full Body Flow',
        focus: 'Full Body',
        durationMinutes: 25,
        difficulty: 'Beginner',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
