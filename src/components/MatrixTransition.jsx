import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|=+-*&^%$#@!'
const COL_WIDTH = 14
const CHAR_HEIGHT = 16

const MatrixColumn = ({ x, height, delay, speed }) => {
  const [chars, setChars] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    const numChars = Math.ceil(height / CHAR_HEIGHT) + 5
    const initial = Array.from({ length: numChars }, () =>
      CHARS[Math.floor(Math.random() * CHARS.length)]
    )
    setChars(initial)

    intervalRef.current = setInterval(() => {
      setChars(prev =>
        prev.map((ch, i) =>
          Math.random() > 0.7
            ? CHARS[Math.floor(Math.random() * CHARS.length)]
            : ch
        )
      )
    }, speed)

    return () => clearInterval(intervalRef.current)
  }, [height, speed])

  return (
    <motion.g
      initial={{ y: -height }}
      animate={{ y: height }}
      transition={{
        duration: 0.6 + Math.random() * 0.4,
        delay,
        ease: 'linear',
      }}
    >
      {chars.map((ch, i) => (
        <text
          key={i}
          x={x}
          y={i * CHAR_HEIGHT}
          fill="#25d0ab"
          fontSize="12"
          fontFamily="var(--ff-mono)"
          opacity={Math.max(0.1, 1 - i * 0.04)}
        >
          {ch}
        </text>
      ))}
    </motion.g>
  )
}

const MatrixTransition = ({ isActive, onComplete }) => {
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 })
  const [phase, setPhase] = useState('enter') // 'enter' | 'hold' | 'exit'

  useEffect(() => {
    setDimensions({
      w: window.innerWidth,
      h: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    if (!isActive) return

    setPhase('enter')

    const holdTimer = setTimeout(() => setPhase('hold'), 600)
    const exitTimer = setTimeout(() => setPhase('exit'), 900)
    const doneTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 1400)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [isActive, onComplete])

  if (!isActive || dimensions.w === 0) return null

  const numCols = Math.ceil(dimensions.w / COL_WIDTH)

  return (
    <motion.div
      className="matrix-transition"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <svg
        width={dimensions.w}
        height={dimensions.h}
        className="matrix-svg"
      >
        <rect width="100%" height="100%" fill="#000000" opacity="0.95" />
        {Array.from({ length: numCols }, (_, i) => (
          <MatrixColumn
            key={i}
            x={i * COL_WIDTH}
            height={dimensions.h}
            delay={Math.random() * 0.3}
            speed={60 + Math.random() * 80}
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default MatrixTransition