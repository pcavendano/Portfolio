import { useState } from 'react'
import { getAllBlogPosts } from '../utils/blog'

const ADMIN_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' // "password" — change this

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const Admin = () => {
  const [authed, setAuthed] = useState(() => {
    if (import.meta.env.DEV) return true
    return localStorage.getItem('admin_auth') === 'true'
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('blog')

  const posts = getAllBlogPosts()

  const handleLogin = async (e) => {
    e.preventDefault()
    const hash = await hashPassword(password)
    if (hash === ADMIN_HASH) {
      localStorage.setItem('admin_auth', 'true')
      setAuthed(true)
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    setAuthed(false)
  }

  if (!authed) {
    return (
      <div className="admin">
        <h1>Admin</h1>
        <div className="admin-login">
          <p className="text-dim">
            <span className="prompt">sudo authenticate</span>
          </p>
          <form onSubmit={handleLogin} className="admin-form">
            <label>
              <span className="text-green">password: </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                autoFocus
              />
            </label>
            <button type="submit" className="admin-btn">authenticate</button>
          </form>
          {error && <p className="text-red">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="admin-btn admin-btn-small">logout</button>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          blog posts
        </button>
        <button
          className={`admin-tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          site info
        </button>
      </div>

      {activeTab === 'blog' && (
        <div className="admin-section">
          <h2 className="section-comment">Blog Posts ({posts.length})</h2>
          <div className="admin-table">
            <div className="admin-table-header">
              <span>STATUS</span>
              <span>TITLE</span>
              <span>DATE</span>
              <span>TAGS</span>
            </div>
            {posts.map((post) => (
              <div key={post.slug} className="admin-table-row">
                <span className={post.published ? 'text-green' : 'text-red'}>
                  {post.published ? 'published' : 'draft'}
                </span>
                <span>{post.title}</span>
                <span className="text-dim">{post.date}</span>
                <span className="text-dim">{post.tags.join(', ')}</span>
              </div>
            ))}
          </div>
          <div className="admin-help">
            <p className="section-comment">How to manage posts</p>
            <ul className="admin-help-list">
              <li>Posts live in <code>src/content/blog/*.md</code></li>
              <li>Set <code>published: false</code> in frontmatter to hide a post</li>
              <li>Set <code>published: true</code> to make it visible</li>
              <li>Commit and push to deploy changes</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="admin-section">
          <h2 className="section-comment">Site Info</h2>
          <div className="admin-info">
            <div className="contact-row">
              <span className="text-green">repo</span>
              <a href="https://github.com/pcavendano/Portfolio" target="_blank" rel="noopener noreferrer">github.com/pcavendano/Portfolio</a>
            </div>
            <div className="contact-row">
              <span className="text-green">deploy</span>
              <a href="https://github.com/pcavendano/Portfolio/actions" target="_blank" rel="noopener noreferrer">GitHub Actions</a>
            </div>
            <div className="contact-row">
              <span className="text-green">live</span>
              <a href="https://pcavendano.com" target="_blank" rel="noopener noreferrer">pcavendano.com</a>
            </div>
            <div className="contact-row">
              <span className="text-green">v1</span>
              <a href="https://pcavendano.com/v1/" target="_blank" rel="noopener noreferrer">pcavendano.com/v1/</a>
            </div>
            <div className="contact-row">
              <span className="text-green">hosting</span>
              <span>Digital Ocean Droplet</span>
            </div>
            <div className="contact-row">
              <span className="text-green">analytics</span>
              <a href="https://app.usefathom.com/" target="_blank" rel="noopener noreferrer">Fathom Analytics</a>
            </div>
          </div>

          <div className="admin-help" style={{ marginTop: '2rem' }}>
            <p className="section-comment">Quick deploy</p>
            <pre className="admin-code">
{`git add -A
git commit -m "update content"
git push origin main`}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
