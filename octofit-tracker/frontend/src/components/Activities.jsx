import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.items)) return payload.items
  return []
}

function Activities({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true)
        setError('')
        // Codespaces API format: https://<codespace>-8000.app.github.dev/api/activities
        const response = await fetch(`${apiBaseUrl}/activities/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        setItems(normalizeResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [apiBaseUrl])

  if (loading) return <p>Loading activities...</p>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!items.length) return <p>No activities found.</p>

  return (
    <div>
      <h2>Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {items.map((activity) => (
              <tr key={activity._id || `${activity.userName}-${activity.type}`}>
                <td>{activity.userName || '-'}</td>
                <td>{activity.type || '-'}</td>
                <td>{activity.durationMinutes ?? '-'}</td>
                <td>{activity.caloriesBurned ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Activities
