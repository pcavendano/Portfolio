import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getBlogPosts } from '../utils/blog'

const posts = getBlogPosts()

const BlogPost = () => {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="blog-post">
        <p className="text-red">Error: post not found — "{slug}"</p>
        <Link to="/blog" className="prompt">cd ../blog</Link>
      </div>
    )
  }

  return (
    <div className="blog-post">
      <Link to="/blog" className="blog-back">
        <span className="prompt">cd ../blog</span>
      </Link>

      <div className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span>{post.date}</span>
          {post.tags && (
            <div className="blog-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="blog-post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default BlogPost
