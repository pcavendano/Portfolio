import { Link } from 'react-router-dom'
import { getBlogPosts } from '../utils/blog'

const posts = getBlogPosts()

const Blog = () => {
  return (
    <div className="blog">
      <h1>Blog</h1>
      <p className="text-dim">
        <span className="prompt">ls blog/ --sort=date</span>
      </p>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p className="text-dim">No posts yet. Check back soon.</p>
          <div className="cursor-line">
            <span className="prompt" />
            <span className="cursor" />
          </div>
        </div>
      ) : (
        <div className="blog-list">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-meta">
                <span className="blog-date">{post.date}</span>
                <span className="blog-filename">{post.slug}.md</span>
              </div>
              <h2 className="blog-title">{post.title}</h2>
              {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
              {post.tags && (
                <div className="blog-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Blog
