import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const COMMANDS = [
  { name: 'readme', path: '/', hint: 'home' },
  { name: 'projects', path: '/projects', hint: 'work samples' },
  { name: 'blog', path: '/blog', hint: 'posts' },
  { name: 'consulting', path: '/consulting', hint: 'book time' },
  { name: 'contact', path: '/contact', hint: 'get in touch' },
  { name: 'v1', path: '/v1/', hint: 'old portfolio', external: true },
]

const TerminalPrompt = () => {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const matches = value
    ? COMMANDS.filter((c) => c.name.startsWith(value.toLowerCase()))
    : COMMANDS

  useEffect(() => {
    setSelected(0)
  }, [value])

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true })
  }

  const run = (cmd) => {
    if (!cmd) return
    if (cmd.external) {
      window.open(cmd.path, '_blank', 'noopener,noreferrer')
    } else {
      navigate(cmd.path)
    }
    setValue('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const exact = COMMANDS.find((c) => c.name === value.toLowerCase())
      run(exact || matches[selected])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (matches.length) setValue(matches[selected].name)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (matches.length) setSelected((s) => (s + 1) % matches.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (matches.length) setSelected((s) => (s - 1 + matches.length) % matches.length)
    } else if (e.key === 'Escape') {
      setValue('')
    }
  }

  const showSuggestions = value.length > 0 && matches.length > 0

  return (
    <div className="terminal-input-block" onClick={focusInput}>
      <div className="cursor-line">
        <span className="prompt">{value}</span>
        <span className="cursor" />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\s/g, '').toLowerCase())}
          onKeyDown={handleKey}
          className="terminal-hidden-input"
          aria-label="terminal command"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
      {showSuggestions && (
        <div className="terminal-suggestions">
          {matches.map((c, i) => (
            <div
              key={c.name}
              className={`suggestion${i === selected ? ' suggestion-active' : ''}`}
              onMouseEnter={() => setSelected(i)}
              onClick={(e) => {
                e.stopPropagation()
                run(c)
              }}
            >
              <span className="suggestion-name">
                <span className="suggestion-match">{c.name.slice(0, value.length)}</span>
                <span>{c.name.slice(value.length)}</span>
              </span>
              <span className="suggestion-hint">{c.hint}</span>
            </div>
          ))}
        </div>
      )}
      {!value && (
        <div className="terminal-prompt-hint">
          type a page name (readme, projects, blog, consulting, contact, v1) and press enter
        </div>
      )}
    </div>
  )
}

export default TerminalPrompt