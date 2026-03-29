import projects from '../data/projects.json'

const Projects = () => {
  return (
    <div className="projects">
      <h1>{projects.summary.title}</h1>
      <p className="text-dim">{projects.summary.description}</p>
      <p className="projects-stats">
        <span className="text-green">{projects.summary.stats.apps}</span>
        <span className="text-dim"> {projects.summary.stats.label}</span>
      </p>

      <div className="capabilities">
        {projects.capabilities.map((cap) => (
          <div key={cap.id} className="capability-card">
            <div className="capability-header">
              <h2>{cap.category}</h2>
            </div>
            <p className="capability-desc">{cap.description}</p>

            <div className="capability-detail">
              <h3 className="section-comment">Highlights</h3>
              <ul className="capability-list">
                {cap.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="capability-footer">
              <div className="project-tags">
                {cap.stack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
              <span className="capability-scale text-dim">{cap.scale}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="student-projects">
        <h2 className="section-comment">Student Projects</h2>
        <p className="text-dim">
          My earlier work from College Maisonneuve. Visit the{' '}
          <a href="/v1/" target="_blank" rel="noopener noreferrer">v1 portfolio</a>{' '}
          for details on a wine bottle management app (Angular + Laravel) and
          a non-profit website redesign (Kirby CMS).
        </p>
      </div>
    </div>
  )
}

export default Projects
