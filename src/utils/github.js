const REPO = 'pcavendano/Portfolio'
const BLOG_PATH = 'src/content/blog'
const API = 'https://api.github.com'

export function getToken() {
  return localStorage.getItem('github_pat')
}

export function setToken(token) {
  localStorage.setItem('github_pat', token)
}

export function clearToken() {
  localStorage.removeItem('github_pat')
}

async function ghFetch(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub API error: ${res.status}`)
  }

  return res.json()
}

export async function validateToken() {
  try {
    const user = await ghFetch('/user')
    return user.login
  } catch {
    return null
  }
}

export async function listPosts() {
  const files = await ghFetch(`/repos/${REPO}/contents/${BLOG_PATH}`)
  const posts = []

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue

    const fileData = await ghFetch(`/repos/${REPO}/contents/${BLOG_PATH}/${file.name}`)
    const content = atob(fileData.content)
    const frontmatter = parseFrontmatter(content)

    posts.push({
      filename: file.name,
      slug: file.name.replace('.md', ''),
      sha: fileData.sha,
      raw: content,
      ...frontmatter,
    })
  }

  return posts.sort((a, b) => (b.date > a.date ? 1 : -1))
}

export async function getPost(filename) {
  const fileData = await ghFetch(`/repos/${REPO}/contents/${BLOG_PATH}/${filename}`)
  const content = atob(fileData.content)
  const frontmatter = parseFrontmatter(content)

  return {
    filename,
    slug: filename.replace('.md', ''),
    sha: fileData.sha,
    raw: content,
    ...frontmatter,
  }
}

export async function savePost(filename, content, sha, message) {
  const body = {
    message: message || `Update ${filename}`,
    content: btoa(unescape(encodeURIComponent(content))),
  }

  if (sha) body.sha = sha

  return ghFetch(`/repos/${REPO}/contents/${BLOG_PATH}/${filename}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export async function deletePost(filename, sha) {
  return ghFetch(`/repos/${REPO}/contents/${BLOG_PATH}/${filename}`, {
    method: 'DELETE',
    body: JSON.stringify({
      message: `Delete ${filename}`,
      sha,
    }),
  })
}

export async function togglePublished(filename, sha, raw) {
  const isPublished = /published:\s*true/.test(raw)
  let updated

  if (isPublished) {
    updated = raw.replace(/published:\s*true/, 'published: false')
  } else if (/published:\s*false/.test(raw)) {
    updated = raw.replace(/published:\s*false/, 'published: true')
  } else {
    // No published field — add it after the first ---
    updated = raw.replace(/^(---\n)/, '$1published: true\n')
  }

  return savePost(filename, updated, sha, `${isPublished ? 'Unpublish' : 'Publish'} ${filename}`)
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { title: '', date: '', tags: [], excerpt: '', published: true, body: raw }

  const fm = match[1]
  const body = match[2]
  const data = {}

  for (const line of fm.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    } else if (value.startsWith('[')) {
      try { value = JSON.parse(value) }
      catch { value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')) }
    } else if (value === 'true') {
      value = true
    } else if (value === 'false') {
      value = false
    }

    data[key] = value
  }

  return {
    title: data.title || '',
    date: data.date || '',
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    published: data.published !== false,
    body,
  }
}
