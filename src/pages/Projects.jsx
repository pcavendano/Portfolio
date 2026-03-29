import projects from '../data/projects.json'

const Projects = () => {
  return (
    <div className="projects">
      <h1>Projects</h1>
      <p className="text-dim">Production applications I've built at Mint Green Group and beyond.</p>

      {projects.featured.map((project) => (
        <div key={project.id} className="project-featured">
          <div className="project-header">
            <h2>{project.name}</h2>
            <span className={`project-badge badge-${project.status}`}>{project.status}</span>
          </div>
          <p className="project-tagline">{project.tagline}</p>

          <div className="project-detail">
            <h3 className="section-comment">Stack</h3>
            <div className="project-tags">
              {project.stack.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project-detail">
            <h3 className="section-comment">Features</h3>
            <ul className="project-features">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>

          {project.description && (
            <div className="project-detail">
              <h3 className="section-comment">Description</h3>
              <p className="text-dim">{project.description}</p>
            </div>
          )}
        </div>
      ))}

      <div className="suitelets-section">
        <h2>
          <span className="prompt">ls -la ~/suitelets/</span>
        </h2>

        <div className="suitelets-table">
          <div className="suitelets-header">
            <span>NAME</span>
            <span>DESCRIPTION</span>
            <span>STATUS</span>
          </div>
          {projects.suitelets.map((s) => (
            <div key={s.id} className="suitelets-row">
              <span className="text-green">{s.name}</span>
              <span className="text-dim">{s.description}</span>
              <span className={`badge-${s.status}`}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="student-projects">
        <h2 className="section-comment">Student Projects</h2>
        <p className="text-dim">
          My earlier work from College Maisonneuve. Visit the{' '}
          <a href="/v1/" target="_blank" rel="noopener noreferrer">v1 portfolio</a>{' '}
          for details on Vinovino (Angular + Laravel wine management app) and
          MeilleurMonde.org (Kirby CMS redesign).
        </p>
      </div>
    </div>
  )
}

export default Projects
