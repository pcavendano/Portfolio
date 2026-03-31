import { useState, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  getToken, setToken, clearToken, validateToken,
  listPosts, savePost, deletePost, togglePublished
} from '../utils/github'
import AdminConsulting from '../components/AdminConsulting'

// SHA-256 hash of the pre-password
const GATE_HASH = '6d11dd98e498e3af2a823483daeaae68fb13acab754551f07b30f1e2e67eb1e3'

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const Admin = () => {
  const [gateOpen, setGateOpen] = useState(() => localStorage.getItem('admin_gate') === 'true')
  const [gateInput, setGateInput] = useState('')
  const [gateError, setGateError] = useState('')

  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState('')
  const [tokenInput, setTokenInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState('blog')
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(false)

  // Editor state
  const [editing, setEditing] = useState(null) // null | 'new' | post object
  const [editorTitle, setEditorTitle] = useState('')
  const [editorDate, setEditorDate] = useState('')
  const [editorTags, setEditorTags] = useState('')
  const [editorExcerpt, setEditorExcerpt] = useState('')
  const [editorPublished, setEditorPublished] = useState(true)
  const [editorBody, setEditorBody] = useState('')
  const [editorPreview, setEditorPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      if (token) {
        const login = await validateToken()
        if (login) {
          setAuthed(true)
          setUsername(login)
        } else {
          clearToken()
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setToken(tokenInput)
    const login = await validateToken()
    if (login) {
      setAuthed(true)
      setUsername(login)
    } else {
      clearToken()
      setError('Invalid token — needs repo Contents access to pcavendano/Portfolio')
    }
  }

  const handleLogout = () => {
    clearToken()
    setAuthed(false)
    setUsername('')
    setPosts([])
  }

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true)
    try {
      const data = await listPosts()
      setPosts(data)
    } catch (err) {
      setError(err.message)
    }
    setPostsLoading(false)
  }, [])

  useEffect(() => {
    if (authed && activeTab === 'blog') fetchPosts()
  }, [authed, activeTab, fetchPosts])

  const openEditor = (post) => {
    if (post === 'new') {
      setEditing('new')
      setEditorTitle('')
      setEditorDate(new Date().toISOString().split('T')[0])
      setEditorTags('')
      setEditorExcerpt('')
      setEditorPublished(true)
      setEditorBody('')
    } else {
      setEditing(post)
      setEditorTitle(post.title)
      setEditorDate(post.date)
      setEditorTags(Array.isArray(post.tags) ? post.tags.join(', ') : '')
      setEditorExcerpt(post.excerpt)
      setEditorPublished(post.published)
      setEditorBody(post.body)
    }
    setEditorPreview(false)
    setStatusMsg('')
  }

  const closeEditor = () => {
    setEditing(null)
    setStatusMsg('')
  }

  const buildMarkdown = () => {
    const tags = editorTags.split(',').map(t => t.trim()).filter(Boolean)
    const tagStr = tags.length ? `[${tags.map(t => `"${t}"`).join(', ')}]` : '[]'

    return `---
title: "${editorTitle}"
date: "${editorDate}"
tags: ${tagStr}
excerpt: "${editorExcerpt}"
published: ${editorPublished}
---

${editorBody}`
  }

  const handleSave = async () => {
    setSaving(true)
    setStatusMsg('')
    try {
      const content = buildMarkdown()
      let filename
      if (editing === 'new') {
        const slug = editorTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
        filename = `${slug}.md`
        await savePost(filename, content, null, `Create ${filename}`)
      } else {
        filename = editing.filename
        await savePost(filename, content, editing.sha, `Update ${filename}`)
      }
      setStatusMsg(`Saved! Deploy triggered — live in ~1 min.`)
      await fetchPosts()
      closeEditor()
    } catch (err) {
      setStatusMsg(`Error: ${err.message}`)
    }
    setSaving(false)
  }

  const handleToggle = async (post) => {
    try {
      await togglePublished(post.filename, post.sha, post.raw)
      await fetchPosts()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    try {
      await deletePost(post.filename, post.sha)
      await fetchPosts()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGate = async (e) => {
    e.preventDefault()
    const hash = await sha256(gateInput)
    if (hash === GATE_HASH) {
      localStorage.setItem('admin_gate', 'true')
      setGateOpen(true)
      setGateError('')
    } else {
      setGateError('Access denied')
    }
  }

  if (!gateOpen) {
    return (
      <div className="admin">
        <h1>404</h1>
        <p className="text-dim">Page not found.</p>
        <form onSubmit={handleGate} className="admin-form" style={{ marginTop: '3rem', opacity: 0.3 }}>
          <input
            type="password"
            value={gateInput}
            onChange={(e) => setGateInput(e.target.value)}
            className="admin-input"
            style={{ border: 'none', background: 'transparent', color: 'var(--c-fg-muted)' }}
            autoFocus
          />
        </form>
        {gateError && <p className="text-red" style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>{gateError}</p>}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="admin">
        <p className="text-dim">Loading...</p>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="admin">
        <h1>Admin</h1>
        <div className="admin-login">
          <form onSubmit={handleLogin} className="admin-form">
            <label>
              <span className="text-green">token: </span>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="admin-input"
                placeholder="github_pat_..."
                autoFocus
              />
            </label>
            <button type="submit" className="admin-btn">connect</button>
          </form>
          {error && <p className="text-red" style={{ marginTop: '0.5rem' }}>{error}</p>}
        </div>
      </div>
    )
  }

  // Editor view
  if (editing !== null) {
    return (
      <div className="admin">
        <div className="admin-header">
          <h1>{editing === 'new' ? 'New Post' : `Edit: ${editing.title}`}</h1>
          <button onClick={closeEditor} className="admin-btn admin-btn-small">cancel</button>
        </div>

        <div className="editor">
          <div className="editor-fields">
            <div className="editor-field">
              <label className="text-green">title</label>
              <input
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
                className="admin-input editor-input-full"
              />
            </div>
            <div className="editor-row">
              <div className="editor-field">
                <label className="text-green">date</label>
                <input
                  type="date"
                  value={editorDate}
                  onChange={(e) => setEditorDate(e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="editor-field">
                <label className="text-green">tags</label>
                <input
                  value={editorTags}
                  onChange={(e) => setEditorTags(e.target.value)}
                  className="admin-input"
                  placeholder="react, portfolio"
                />
              </div>
              <div className="editor-field">
                <label className="text-green">published</label>
                <button
                  onClick={() => setEditorPublished(!editorPublished)}
                  className={`admin-btn ${editorPublished ? 'btn-published' : 'btn-draft'}`}
                >
                  {editorPublished ? 'published' : 'draft'}
                </button>
              </div>
            </div>
            <div className="editor-field">
              <label className="text-green">excerpt</label>
              <input
                value={editorExcerpt}
                onChange={(e) => setEditorExcerpt(e.target.value)}
                className="admin-input editor-input-full"
                placeholder="Short description for the blog list"
              />
            </div>
          </div>

          <div className="editor-toolbar">
            <span className="text-dim">Content (Markdown)</span>
            <button
              onClick={() => setEditorPreview(!editorPreview)}
              className="admin-btn admin-btn-small"
            >
              {editorPreview ? 'edit' : 'preview'}
            </button>
          </div>

          {editorPreview ? (
            <div className="editor-preview blog-post-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{editorBody}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={editorBody}
              onChange={(e) => setEditorBody(e.target.value)}
              className="editor-textarea"
              rows={20}
            />
          )}

          <div className="editor-actions">
            <button
              onClick={handleSave}
              disabled={saving || !editorTitle}
              className="admin-btn btn-save"
            >
              {saving ? 'saving...' : 'save & deploy'}
            </button>
            <button onClick={closeEditor} className="admin-btn">cancel</button>
            {statusMsg && <span className={statusMsg.startsWith('Error') ? 'text-red' : 'text-green'}>{statusMsg}</span>}
          </div>
        </div>
      </div>
    )
  }

  // Main admin view
  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-right">
          <span className="text-dim">@{username}</span>
          <button onClick={handleLogout} className="admin-btn admin-btn-small">logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          blog posts
        </button>
        <button
          className={`admin-tab ${activeTab === 'consulting' ? 'active' : ''}`}
          onClick={() => setActiveTab('consulting')}
        >
          consulting
        </button>
        <button
          className={`admin-tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          site info
        </button>
      </div>

      {error && <p className="text-red" style={{ marginBottom: '1rem' }}>{error}</p>}
      {statusMsg && <p className="text-green" style={{ marginBottom: '1rem' }}>{statusMsg}</p>}

      {activeTab === 'blog' && (
        <div className="admin-section">
          <div className="admin-section-header">
            <h2 className="section-comment">Blog Posts ({posts.length})</h2>
            <button onClick={() => openEditor('new')} className="admin-btn">+ new post</button>
          </div>

          {postsLoading ? (
            <p className="text-dim">Fetching posts from GitHub...</p>
          ) : (
            <div className="admin-table">
              <div className="admin-table-header">
                <span>STATUS</span>
                <span>TITLE</span>
                <span>DATE</span>
                <span>ACTIONS</span>
              </div>
              {posts.map((post) => (
                <div key={post.filename} className="admin-table-row">
                  <span className={post.published ? 'text-green' : 'text-red'}>
                    {post.published ? 'published' : 'draft'}
                  </span>
                  <span>{post.title || post.filename}</span>
                  <span className="text-dim">{post.date}</span>
                  <div className="admin-actions">
                    <button onClick={() => openEditor(post)} className="admin-btn admin-btn-small">edit</button>
                    <button onClick={() => handleToggle(post)} className="admin-btn admin-btn-small">
                      {post.published ? 'unpublish' : 'publish'}
                    </button>
                    <button onClick={() => handleDelete(post)} className="admin-btn admin-btn-small btn-danger">delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'consulting' && <AdminConsulting />}

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
        </div>
      )}
    </div>
  )
}

export default Admin
