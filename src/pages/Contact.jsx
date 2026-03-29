import { useState, useRef, useEffect } from 'react'

const FORM_URL = 'https://formspree.io/f/xpwdzgvk' // Replace with your Formspree form ID

const Contact = () => {
  const [mode, setMode] = useState('info') // 'info' | 'form' | 'sent'
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [lines, setLines] = useState([])
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (mode === 'form' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [mode, step])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const startForm = () => {
    setMode('form')
    setStep(0)
    setName('')
    setEmail('')
    setMessage('')
    setError('')
    setLines([
      { type: 'cmd', text: 'send-email' },
      { type: 'info', text: 'Starting email client...' },
      { type: 'info', text: 'Your message will be sent to pcavendano@le1101.com' },
      { type: 'blank' },
    ])
  }

  const getCurrentValue = () => {
    if (step === 0) return name
    if (step === 1) return email
    return message
  }

  const setCurrentValue = (val) => {
    if (step === 0) setName(val)
    else if (step === 1) setEmail(val)
    else setMessage(val)
  }

  const prompts = [
    { label: 'name', field: 'Your name' },
    { label: 'email', field: 'Your email' },
    { label: 'message', field: 'Your message' },
  ]

  const handleSubmitStep = async (e) => {
    e.preventDefault()
    const val = getCurrentValue().trim()
    if (!val) return

    const currentPrompt = prompts[step]
    const newLines = [...lines, { type: 'prompt', label: currentPrompt.label, value: val }]

    if (step < 2) {
      setLines(newLines)
      setStep(step + 1)
    } else {
      // Final step — send the email
      setLines([...newLines, { type: 'blank' }, { type: 'info', text: 'Sending...' }])
      setSending(true)
      setError('')

      try {
        const res = await fetch(FORM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })

        if (res.ok) {
          setLines(prev => [
            ...prev.slice(0, -1),
            { type: 'success', text: 'Message sent successfully!' },
            { type: 'info', text: 'I\'ll get back to you soon.' },
          ])
          setMode('sent')
        } else {
          throw new Error('Failed to send')
        }
      } catch {
        setLines(prev => [
          ...prev.slice(0, -1),
          { type: 'error', text: 'Error: Failed to send message. Try emailing directly.' },
        ])
        setError('Send failed')
      }
      setSending(false)
    }
  }

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
          <p className="text-fg-secondary">COMMANDS</p>
          <div className="contact-options">
            <div className="contact-row">
              <span className="text-green">send-email</span>
              <span className="text-dim">Start interactive email client</span>
            </div>
          </div>
        </div>
      </div>

      {mode === 'info' && (
        <div className="terminal-interactive" onClick={startForm}>
          <div className="cursor-line">
            <span className="prompt">send-email</span>
            <span className="cursor" />
          </div>
          <p className="text-dim send-hint">Click here or press Enter to send me a message</p>
        </div>
      )}

      {(mode === 'form' || mode === 'sent') && (
        <div className="terminal-interactive">
          <div className="terminal-output">
            {lines.map((line, i) => (
              <div key={i} className="terminal-line">
                {line.type === 'cmd' && (
                  <span><span className="prompt">{line.text}</span></span>
                )}
                {line.type === 'info' && (
                  <span className="text-dim">{line.text}</span>
                )}
                {line.type === 'prompt' && (
                  <span>
                    <span className="text-green">{line.label}: </span>
                    <span>{line.value}</span>
                  </span>
                )}
                {line.type === 'success' && (
                  <span className="text-green">{line.text}</span>
                )}
                {line.type === 'error' && (
                  <span className="text-red">{line.text}</span>
                )}
                {line.type === 'blank' && <span>&nbsp;</span>}
              </div>
            ))}

            {mode === 'form' && !sending && (
              <form onSubmit={handleSubmitStep} className="terminal-input-line">
                <span className="text-green">{prompts[step].label}: </span>
                {step === 2 ? (
                  <textarea
                    ref={inputRef}
                    value={getCurrentValue()}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className="terminal-input terminal-textarea"
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmitStep(e)
                      }
                    }}
                  />
                ) : (
                  <input
                    ref={inputRef}
                    type={step === 1 ? 'email' : 'text'}
                    value={getCurrentValue()}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className="terminal-input"
                    required
                  />
                )}
                <button type="submit" className="terminal-submit">↵</button>
              </form>
            )}

            {mode === 'sent' && (
              <div className="cursor-line" style={{ marginTop: '1rem' }}>
                <button onClick={() => setMode('info')} className="admin-btn admin-btn-small">
                  back
                </button>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
