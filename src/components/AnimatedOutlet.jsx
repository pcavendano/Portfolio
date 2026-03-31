import { useState, useCallback } from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import MatrixTransition from './MatrixTransition'

const AnimatedOutlet = () => {
  const location = useLocation()
  const outlet = useOutlet()

  const [displayedOutlet, setDisplayedOutlet] = useState(outlet)
  const [displayedKey, setDisplayedKey] = useState(location.pathname)
  const [transitioning, setTransitioning] = useState(false)
  const [pendingOutlet, setPendingOutlet] = useState(null)
  const [pendingKey, setPendingKey] = useState(null)

  // Detect route change
  if (location.pathname !== displayedKey && !transitioning) {
    setTransitioning(true)
    setPendingOutlet(outlet)
    setPendingKey(location.pathname)
  }

  const handleTransitionComplete = useCallback(() => {
    setDisplayedOutlet(pendingOutlet)
    setDisplayedKey(pendingKey)
    setTransitioning(false)
    setPendingOutlet(null)
    setPendingKey(null)
  }, [pendingOutlet, pendingKey])

  return (
    <>
      <MatrixTransition
        isActive={transitioning}
        onComplete={handleTransitionComplete}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayedOutlet}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default AnimatedOutlet