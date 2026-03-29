const Readme = () => {
  return (
    <div className="readme">
      <div className="readme-header">
        <h1>Pedro Contreras Avendano</h1>
        <p className="readme-tagline">SuiteScript &amp; JavaScript Developer</p>
      </div>

      <section className="readme-section">
        <h2 className="section-comment">About</h2>
        <p>
          I build internal tools, dashboards, and integrations on the NetSuite
          platform for a mid-size distribution company. I specialize in creating
          full-stack applications using SuiteScript 2.1 and modern JavaScript
          frameworks that streamline business operations and extend ERP
          capabilities.
        </p>
        <p>
          Previously, I studied web development at College Maisonneuve in
          Montreal, where I built my foundation in full-stack development.
          You can see my student work on the{' '}
          <a href="/v1/" target="_blank" rel="noopener noreferrer">v1 portfolio</a>.
        </p>
      </section>

      <section className="readme-section">
        <h2 className="section-comment">What I Do</h2>
        <ul className="readme-list">
          <li><span className="text-green">Custom SuiteScript Applications</span> — SuiteLets, RESTlets, scheduled scripts, and Map/Reduce scripts</li>
          <li><span className="text-green">React Front-ends</span> — modern SPAs deployed inside NetSuite via SuiteLet HTML injection</li>
          <li><span className="text-green">Third-Party Integrations</span> — WMS, e-commerce platforms, monitoring, cloud storage</li>
          <li><span className="text-green">Data Tools</span> — SuiteQL query builders, CSV import engines, search analytics</li>
          <li><span className="text-green">KPI Dashboards</span> — real-time warehouse and company performance monitoring</li>
        </ul>
      </section>

      <section className="readme-section">
        <h2 className="section-comment">Skills</h2>
        <div className="skills-grid">
          <div>
            <h3>Languages</h3>
            <p className="text-dim">JavaScript, TypeScript, SuiteScript 2.1, HTML, CSS, SQL, SuiteQL, PHP</p>
          </div>
          <div>
            <h3>Frameworks</h3>
            <p className="text-dim">React, Angular, Node.js, Laravel, Vite</p>
          </div>
          <div>
            <h3>Platforms</h3>
            <p className="text-dim">NetSuite, E-commerce Platforms, WMS, Digital Ocean, Docker</p>
          </div>
          <div>
            <h3>Tools</h3>
            <p className="text-dim">Git, GitHub Actions, Datadog, SuiteCloud CLI, Figma, WebStorm</p>
          </div>
        </div>
      </section>

      <section className="readme-section">
        <h2 className="section-comment">Links</h2>
        <div className="readme-links">
          <div className="prompt">
            <span>open linkedin</span>
            <span className="text-dim"> → </span>
            <a href="https://www.linkedin.com/in/pcavendano/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pcavendano</a>
          </div>
          <div className="prompt">
            <span>open github</span>
            <span className="text-dim"> → </span>
            <a href="https://github.com/pcavendano" target="_blank" rel="noopener noreferrer">github.com/pcavendano</a>
          </div>
          <div className="prompt">
            <span>cat resume.pdf</span>
            <span className="text-dim"> → </span>
            <a href="/PCONTRERAS_CV_FR.pdf" target="_blank" rel="noopener noreferrer">Download CV</a>
          </div>
        </div>
      </section>

      <div className="cursor-line">
        <span className="prompt" />
        <span className="cursor" />
      </div>
    </div>
  )
}

export default Readme
