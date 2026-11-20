import PalmScene from '../components/PalmScene'
import TerminalPrompt from '../components/TerminalPrompt'

const ASCII_NAME = `
 ██████╗  ███████╗ ██████╗  ██████╗   ██████╗
 ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔══██╗ ██╔═══██╗
 ██████╔╝ █████╗   ██║  ██║ ██████╔╝ ██║   ██║
 ██╔═══╝  ██╔══╝   ██║  ██║ ██╔══██╗ ██║   ██║
 ██║      ███████╗ ██████╔╝ ██║  ██║ ╚██████╔╝
 ╚═╝      ╚══════╝ ╚═════╝  ╚═╝  ╚═╝  ╚═════╝`

const Readme = () => {
  return (
    <div className="readme">
      <div className="readme-header">
        <div className="ascii-banner">
          <pre className="ascii-name">{ASCII_NAME}</pre>
          <PalmScene />
        </div>
        <p className="readme-subtitle">Contreras Avendano</p>
        <p className="readme-tagline">NetSuite Developer &bull; Agentic AI Workflows &bull; Montreal, QC</p>
        <p className="readme-version">v2.1.0</p>
      </div>

      <section className="readme-section">
        <h2 className="section-comment">About</h2>
        <p>
          I build AI agents that work directly inside NetSuite. At a licensed
          apparel distributor, I give Claude MCP tools through the NetSuite AI
          Connector so it can file support cases, split freight bills by brand,
          and run credit-rebills. Every write goes through a preview, a human
          approval, and an audit log, with the rules enforced on the server.
          Underneath that, I ship the SuiteScript 2.1 apps, integrations, and
          documentation the business runs on.
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
          <li><span className="text-green">AI Agents on the ERP</span> — custom MCP tools for the NetSuite AI Connector, preview → approve → execute, server-side validation and audit logs</li>
          <li><span className="text-green">Agentic Workflows</span> — Claude Code skills that turn accounting and ops runbooks into repeatable, reviewed procedures</li>
          <li><span className="text-green">Spec-Driven Delivery</span> — every feature starts as a spec reviewed by BA and QA sub-agents before code is written</li>
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
            <p className="text-dim">JavaScript, TypeScript, SuiteScript 2.1, SuiteQL, SQL, Python, HTML, CSS</p>
          </div>
          <div>
            <h3>AI</h3>
            <p className="text-dim">NetSuite AI Connector (MCP), Claude Code, Claude &amp; OpenAI APIs, Spec Kit, DeepL</p>
          </div>
          <div>
            <h3>Frameworks</h3>
            <p className="text-dim">React, Angular, Node.js, Laravel, Vite</p>
          </div>
          <div>
            <h3>Platforms</h3>
            <p className="text-dim">NetSuite (SDF, SuiteFlow, RESTlets), Shopify / Celigo, Körber WMS, DigitalOcean, Kubernetes</p>
          </div>
          <div>
            <h3>Tools</h3>
            <p className="text-dim">Git, GitHub Actions, Grafana / Loki, SuiteCloud CLI, Docker, Kafka / Spark</p>
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
            <a href="/PCONTRERAS_CV_EN.pdf" target="_blank" rel="noopener noreferrer">English</a>
            <span className="text-dim"> · </span>
            <a href="/PCONTRERAS_CV_FR.pdf" target="_blank" rel="noopener noreferrer">Français</a>
          </div>
        </div>
      </section>

      <TerminalPrompt />
    </div>
  )
}

export default Readme
