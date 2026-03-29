const modules = import.meta.glob('/src/content/blog/*.md', { as: 'raw', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const frontmatter = match[1]
  const content = match[2]
  const data = {}

  for (const line of frontmatter.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()

    // Handle quoted strings
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    // Handle arrays like ["a", "b"]
    else if (value.startsWith('[')) {
      try {
        value = JSON.parse(value)
      } catch {
        value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''))
      }
    }

    data[key] = value
  }

  return { data, content }
}

export function getBlogPosts() {
  const posts = Object.entries(modules).map(([filepath, raw]) => {
    const slug = filepath.split('/').pop().replace('.md', '')
    const { data, content } = parseFrontmatter(raw)

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      content,
    }
  })

  return posts.sort((a, b) => (b.date > a.date ? 1 : -1))
}
