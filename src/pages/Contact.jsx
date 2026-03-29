const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact</h1>

      <div className="contact-help">
        <p className="text-dim">
          <span className="prompt">contact --help</span>
        </p>

        <div className="contact-section">
          <p className="text-fg-secondary">USAGE</p>
          <p className="text-dim indent">contact [option]</p>
        </div>

        <div className="contact-section">
          <p className="text-fg-secondary">OPTIONS</p>
          <div className="contact-options">
            <div className="contact-row">
              <span className="text-green">--email</span>
              <a href="mailto:pcavendano@le1101.com">pcavendano@le1101.com</a>
            </div>
            <div className="contact-row">
              <span className="text-green">--linkedin</span>
              <a href="https://www.linkedin.com/in/pcavendano/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pcavendano</a>
            </div>
            <div className="contact-row">
              <span className="text-green">--github</span>
              <a href="https://github.com/pcavendano" target="_blank" rel="noopener noreferrer">github.com/pcavendano</a>
            </div>
            <div className="contact-row">
              <span className="text-green">--location</span>
              <span>Montreal, Canada</span>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <p className="text-fg-secondary">NOTES</p>
          <p className="text-dim indent">
            LinkedIn CLI integration active. Open to connecting and collaboration.
          </p>
        </div>
      </div>

      <div className="cursor-line">
        <span className="prompt" />
        <span className="cursor" />
      </div>
    </div>
  )
}

export default Contact
