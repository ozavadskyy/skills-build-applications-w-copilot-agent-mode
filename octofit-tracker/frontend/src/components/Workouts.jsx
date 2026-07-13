import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.items)) return payload.items
  return []
}

function Workouts({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/workouts/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        setItems(normalizeResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [apiBaseUrl])

  if (loading) return <p>Loading workouts...</p>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!items.length) return <p>No workouts found.</p>

  return (
    <div>
      <h2>Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Focus</th>
              <th>Duration (min)</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {items.map((workout) => (
              <tr key={workout._id || workout.title}>
                <td>{workout.title || '-'}</td>
                <td>{workout.focus || '-'}</td>
                <td>{workout.durationMinutes ?? '-'}</td>
                <td>{workout.difficulty || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Workouts
