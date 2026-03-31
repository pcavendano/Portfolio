import { motion } from 'framer-motion'

const PalmScene = () => {
  return (
    <div className="palm-scene">
      <svg
        viewBox="0 0 200 160"
        xmlns="http://www.w3.org/2000/svg"
        className="palm-svg"
      >
        {/* Stars */}
        {[
          [15, 12], [45, 8], [80, 18], [120, 6], [155, 14], [175, 22],
          [30, 28], [60, 5], [140, 25], [185, 10], [100, 3], [10, 35],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={0.6}
            fill="#25d0ab"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Moon */}
        <motion.circle
          cx="160"
          cy="30"
          r="12"
          fill="none"
          stroke="#25d0ab"
          strokeWidth="0.5"
          opacity="0.4"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="160"
          cy="30"
          r="10"
          fill="#25d0ab"
          opacity="0.08"
        />

        {/* Palm trunk */}
        <motion.path
          d="M 90 130 Q 88 105 85 85 Q 82 65 80 50"
          stroke="#25d0ab"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: [
              'M 90 130 Q 88 105 85 85 Q 82 65 80 50',
              'M 90 130 Q 87 105 84 85 Q 81 65 79 50',
              'M 90 130 Q 88 105 85 85 Q 82 65 80 50',
            ],
          }}
          transition={{
            pathLength: { duration: 1.5, ease: 'easeOut' },
            d: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
        />
        {/* Trunk texture lines */}
        {[75, 85, 95, 105, 115].map((y, i) => {
          const xOff = (130 - y) * 0.12
          return (
            <motion.line
              key={`tex-${i}`}
              x1={83 - xOff}
              y1={y}
              x2={87 + xOff}
              y2={y}
              stroke="#25d0ab"
              strokeWidth="0.4"
              opacity="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1 + i * 0.15 }}
            />
          )
        })}

        {/* Coconuts */}
        {[[78, 52], [82, 54], [80, 50]].map(([cx, cy], i) => (
          <motion.circle
            key={`coco-${i}`}
            cx={cx}
            cy={cy}
            r="2"
            fill="#25d0ab"
            opacity="0.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + i * 0.2, type: 'spring' }}
          />
        ))}

        {/* Palm leaves */}
        {/* Leaf right-up */}
        <motion.path
          d="M 80 48 Q 100 30 130 28"
          stroke="#25d0ab"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: [
              'M 80 48 Q 100 30 130 28',
              'M 80 48 Q 100 28 132 26',
              'M 80 48 Q 100 30 130 28',
            ],
          }}
          transition={{
            pathLength: { duration: 1, delay: 1.2 },
            d: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
        />
        {/* Leaf sub-lines right-up */}
        {[0.3, 0.5, 0.7, 0.85].map((t, i) => {
          const x = 80 + (130 - 80) * t + (t > 0.5 ? 4 : 0)
          const y = 48 + (28 - 48) * t - 2
          return (
            <motion.line
              key={`lr-${i}`}
              x1={x} y1={y}
              x2={x + 5} y2={y + 6}
              stroke="#25d0ab"
              strokeWidth="0.5"
              opacity="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5 + i * 0.1 }}
            />
          )
        })}

        {/* Leaf right-down */}
        <motion.path
          d="M 80 48 Q 105 45 125 55"
          stroke="#25d0ab"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: [
              'M 80 48 Q 105 45 125 55',
              'M 80 48 Q 106 43 127 53',
              'M 80 48 Q 105 45 125 55',
            ],
          }}
          transition={{
            pathLength: { duration: 1, delay: 1.3 },
            d: { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
        />

        {/* Leaf left-up */}
        <motion.path
          d="M 80 48 Q 60 28 35 30"
          stroke="#25d0ab"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: [
              'M 80 48 Q 60 28 35 30',
              'M 80 48 Q 58 26 33 28',
              'M 80 48 Q 60 28 35 30',
            ],
          }}
          transition={{
            pathLength: { duration: 1, delay: 1.1 },
            d: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
        />
        {/* Leaf sub-lines left-up */}
        {[0.3, 0.5, 0.7, 0.85].map((t, i) => {
          const x = 80 + (35 - 80) * t - (t > 0.5 ? 4 : 0)
          const y = 48 + (30 - 48) * t - 2
          return (
            <motion.line
              key={`ll-${i}`}
              x1={x} y1={y}
              x2={x - 5} y2={y + 6}
              stroke="#25d0ab"
              strokeWidth="0.5"
              opacity="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5 + i * 0.1 }}
            />
          )
        })}

        {/* Leaf left-down */}
        <motion.path
          d="M 80 48 Q 55 50 40 60"
          stroke="#25d0ab"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: [
              'M 80 48 Q 55 50 40 60',
              'M 80 48 Q 53 48 38 58',
              'M 80 48 Q 55 50 40 60',
            ],
          }}
          transition={{
            pathLength: { duration: 1, delay: 1.4 },
            d: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
        />

        {/* Leaf center-up */}
        <motion.path
          d="M 80 48 Q 78 30 75 15"
          stroke="#25d0ab"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: [
              'M 80 48 Q 78 30 75 15',
              'M 80 48 Q 77 28 73 13',
              'M 80 48 Q 78 30 75 15',
            ],
          }}
          transition={{
            pathLength: { duration: 1, delay: 1.0 },
            d: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
        />

        {/* Beach / sand */}
        <motion.path
          d="M 0 135 Q 50 128 100 132 Q 150 136 200 130 L 200 160 L 0 160 Z"
          fill="#25d0ab"
          opacity="0.12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        {/* Sand line */}
        <motion.path
          d="M 0 135 Q 50 128 100 132 Q 150 136 200 130"
          stroke="#25d0ab"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Sand texture dots */}
        {[
          [20, 142], [45, 140], [70, 138], [95, 140], [115, 141],
          [135, 142], [160, 139], [180, 137], [55, 148], [100, 150],
          [140, 148], [30, 152], [80, 155], [170, 150],
        ].map(([cx, cy], i) => (
          <circle
            key={`sand-${i}`}
            cx={cx}
            cy={cy}
            r="0.4"
            fill="#25d0ab"
            opacity="0.2"
          />
        ))}

        {/* Ocean waves */}
        <motion.path
          d="M 0 138 Q 15 135 30 138 Q 45 141 60 138 Q 75 135 90 138"
          stroke="#25d0ab"
          strokeWidth="0.6"
          fill="none"
          opacity="0.25"
          animate={{
            d: [
              'M 0 138 Q 15 135 30 138 Q 45 141 60 138 Q 75 135 90 138',
              'M 0 139 Q 15 136 30 139 Q 45 142 60 139 Q 75 136 90 139',
              'M 0 138 Q 15 135 30 138 Q 45 141 60 138 Q 75 135 90 138',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 10 141 Q 25 138 40 141 Q 55 144 70 141 Q 85 138 100 141"
          stroke="#25d0ab"
          strokeWidth="0.4"
          fill="none"
          opacity="0.15"
          animate={{
            d: [
              'M 10 141 Q 25 138 40 141 Q 55 144 70 141 Q 85 138 100 141',
              'M 10 142 Q 25 139 40 142 Q 55 145 70 142 Q 85 139 100 142',
              'M 10 141 Q 25 138 40 141 Q 55 144 70 141 Q 85 138 100 141',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Distant waves on horizon */}
        <motion.path
          d="M 120 132 Q 140 129 160 132 Q 180 135 200 132"
          stroke="#25d0ab"
          strokeWidth="0.4"
          fill="none"
          opacity="0.15"
          animate={{
            d: [
              'M 120 132 Q 140 129 160 132 Q 180 135 200 132',
              'M 120 133 Q 140 130 160 133 Q 180 136 200 133',
              'M 120 132 Q 140 129 160 132 Q 180 135 200 132',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </svg>
    </div>
  )
}

export default PalmScene