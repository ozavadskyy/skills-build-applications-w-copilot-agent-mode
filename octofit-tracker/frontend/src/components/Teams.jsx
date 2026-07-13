import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.items)) return payload.items
  return []
}

function Teams({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true)
        setError('')
        // Codespaces API format: https://<codespace>-8000.app.github.dev/api/teams
        const response = await fetch(`${apiBaseUrl}/teams/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        setItems(normalizeResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [apiBaseUrl])

  if (loading) return <p>Loading teams...</p>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!items.length) return <p>No teams found.</p>

  return (
    <div>
      <h2>Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {items.map((team) => (
              <tr key={team._id || team.name}>
                <td>{team.name || '-'}</td>
                <td>{team.city || '-'}</td>
                <td>{team.memberCount ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Teams
