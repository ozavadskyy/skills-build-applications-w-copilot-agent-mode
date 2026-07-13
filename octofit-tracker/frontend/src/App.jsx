import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <div className="container py-4">
      <h1 className="mb-3">OctoFit Tracker</h1>
      <p className="text-body-secondary mb-3">
        API base URL: <code>{apiBaseUrl}</code>
      </p>
      {!codespaceName && (
        <div className="alert alert-warning" role="alert">
          <strong>VITE_CODESPACE_NAME</strong> is not set. Using localhost fallback.
        </div>
      )}

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
        <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
        <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
        <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
      </Routes>
    </div>
  )
}

export default App
