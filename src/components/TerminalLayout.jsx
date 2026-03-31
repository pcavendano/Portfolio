import TabBar from './TabBar'
import AnimatedOutlet from './AnimatedOutlet'

const TerminalLayout = () => {
  return (
    <div className="terminal-shell">
      <header className="terminal-header">
        <div className="terminal-logo">
          <div className="dots">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span>pedro@portfolio:~</span>
        </div>
        <TabBar />
      </header>

      <main className="terminal-main">
        <AnimatedOutlet />
      </main>

      <footer className="terminal-footer">
        <span>2026 Pedro Contreras Avendano</span>
        {' | '}
        <a href="https://github.com/pcavendano" target="_blank" rel="noopener noreferrer">github</a>
        {' | '}
        <a href="https://www.linkedin.com/in/pcavendano/" target="_blank" rel="noopener noreferrer">linkedin</a>
        {' | '}
        <a href="/v1/" target="_blank" rel="noopener noreferrer">v1 portfolio</a>
      </footer>
    </div>
  )
}

export default TerminalLayout
