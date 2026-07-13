import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.items)) return payload.items
  return []
}

function Users({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/users/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        setItems(normalizeResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [apiBaseUrl])

  if (loading) return <p>Loading users...</p>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!items.length) return <p>No users found.</p>

  return (
    <div>
      <h2>Users</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Fitness Level</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user._id || user.email}>
                <td>{user.name || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{user.fitnessLevel || '-'}</td>
                <td>{user.points ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
