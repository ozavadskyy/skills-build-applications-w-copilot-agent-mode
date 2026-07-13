import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.items)) return payload.items
  return []
}

function Leaderboard({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/leaderboard/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        setItems(normalizeResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [apiBaseUrl])

  if (loading) return <p>Loading leaderboard...</p>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!items.length) return <p>No leaderboard entries found.</p>

  return (
    <div>
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry) => (
              <tr key={entry._id || `${entry.userName}-${entry.rank}`}>
                <td>{entry.rank ?? '-'}</td>
                <td>{entry.userName || '-'}</td>
                <td>{entry.points ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
