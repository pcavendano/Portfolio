import { motion } from 'framer-motion'

// Frond: a main spine with feathered leaflets on each side
const Frond = ({ d, swayD, delay, leaflets }) => (
  <g>
    {/* Main spine */}
    <motion.path
      d={d}
      stroke="#25d0ab"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{
        pathLength: 1,
        d: [d, swayD, d],
      }}
      transition={{
        pathLength: { duration: 1.2, delay, ease: 'easeOut' },
        d: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
      }}
    />
    {/* Leaflets along spine */}
    {leaflets.map(([x, y, angle, len], i) => {
      const rad = (angle * Math.PI) / 180
      const x2 = x + Math.cos(rad) * len
      const y2 = y + Math.sin(rad) * len
      return (
        <motion.line
          key={i}
          x1={x} y1={y}
          x2={x2} y2={y2}
          stroke="#25d0ab"
          strokeWidth="0.6"
          strokeLinecap="round"
          opacity="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{
            delay: 1.5 + i * 0.05,
            duration: 3 + Math.random(),
            repeat: Infinity,
          }}
        />
      )
    })}
  </g>
)

const PalmScene = () => {
  // Leaflet helper: generate leaflets along a curve
  const makeLeaflets = (points, angleBias, side) =>
    points.map(([x, y]) => {
      const a = angleBias + (side === 'left' ? -40 : 40) + (Math.random() - 0.5) * 15
      return [x, y, a, 5 + Math.random() * 4]
    })

  return (
    <div className="palm-scene">
      <svg
        viewBox="0 0 220 170"
        xmlns="http://www.w3.org/2000/svg"
        className="palm-svg"
      >
        {/* Stars */}
        {[
          [15, 10], [50, 6], [90, 15], [130, 4], [170, 12], [195, 20],
          [35, 22], [75, 3], [155, 28], [205, 8], [110, 8], [8, 30],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`star-${i}`}
            cx={cx}
            cy={cy}
            r={0.5}
            fill="#25d0ab"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.7, 0.15] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Moon */}
        <motion.circle
          cx="175" cy="25" r="10"
          fill="none" stroke="#25d0ab" strokeWidth="0.4" opacity="0.35"
          animate={{ opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <circle cx="175" cy="25" r="8" fill="#25d0ab" opacity="0.06" />

        {/* ============ PALM TREE ============ */}

        {/* Trunk — curved, leaning left like the ASCII art */}
        <motion.path
          d="M 115 135 Q 108 115 100 100 Q 90 82 82 68 Q 76 58 75 48"
          stroke="#25d0ab"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: [
              'M 115 135 Q 108 115 100 100 Q 90 82 82 68 Q 76 58 75 48',
              'M 115 135 Q 107 115 99 100 Q 89 82 81 68 Q 75 57 74 47',
              'M 115 135 Q 108 115 100 100 Q 90 82 82 68 Q 76 58 75 48',
            ],
          }}
          transition={{
            pathLength: { duration: 1.5, ease: 'easeOut' },
            d: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
        />
        {/* Trunk texture — horizontal bark lines */}
        {[
          [107, 118], [103, 108], [97, 96], [92, 86], [86, 76], [81, 66], [78, 58],
        ].map(([x, y], i) => (
          <motion.line
            key={`bark-${i}`}
            x1={x - 2.5} y1={y}
            x2={x + 2.5} y2={y}
            stroke="#25d0ab"
            strokeWidth="0.4"
            opacity="0.25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          />
        ))}

        {/* Coconuts cluster */}
        {[[73, 50], [77, 52], [72, 46]].map(([cx, cy], i) => (
          <motion.circle
            key={`coco-${i}`}
            cx={cx} cy={cy} r="1.8"
            fill="#25d0ab" opacity="0.45"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + i * 0.15, type: 'spring' }}
          />
        ))}

        {/* ============ FRONDS ============ */}
        {/* Bushy canopy — many fronds spreading wide like pjb's ASCII art */}

        {/* Far left — drooping */}
        <Frond
          d="M 75 47 Q 50 38 22 45"
          swayD="M 75 47 Q 48 36 20 43"
          delay={1.0}
          leaflets={makeLeaflets(
            [[62, 42], [52, 40], [42, 41], [32, 43]],
            -160, 'left'
          ).concat(makeLeaflets(
            [[60, 44], [50, 42], [40, 44], [30, 46]],
            -160, 'right'
          ))}
        />

        {/* Left-up */}
        <Frond
          d="M 75 47 Q 55 25 30 18"
          swayD="M 75 47 Q 53 23 28 16"
          delay={1.1}
          leaflets={makeLeaflets(
            [[65, 36], [55, 28], [45, 22], [38, 19]],
            -130, 'left'
          ).concat(makeLeaflets(
            [[63, 38], [53, 30], [43, 25], [36, 22]],
            -130, 'right'
          ))}
        />

        {/* Center-left up */}
        <Frond
          d="M 75 47 Q 68 22 65 8"
          swayD="M 75 47 Q 66 20 63 6"
          delay={1.05}
          leaflets={makeLeaflets(
            [[72, 35], [70, 25], [68, 17], [66, 11]],
            -100, 'left'
          ).concat(makeLeaflets(
            [[74, 34], [72, 24], [70, 16], [68, 10]],
            -100, 'right'
          ))}
        />

        {/* Center-right up */}
        <Frond
          d="M 75 47 Q 85 22 95 10"
          swayD="M 75 47 Q 87 20 97 8"
          delay={1.15}
          leaflets={makeLeaflets(
            [[79, 36], [83, 27], [88, 18], [92, 13]],
            -60, 'left'
          ).concat(makeLeaflets(
            [[80, 38], [85, 29], [90, 20], [93, 14]],
            -60, 'right'
          ))}
        />

        {/* Right-up */}
        <Frond
          d="M 75 47 Q 105 22 140 18"
          swayD="M 75 47 Q 107 20 142 16"
          delay={1.2}
          leaflets={makeLeaflets(
            [[88, 36], [100, 28], [115, 22], [130, 19]],
            -30, 'left'
          ).concat(makeLeaflets(
            [[90, 38], [102, 31], [117, 25], [132, 22]],
            -30, 'right'
          ))}
        />

        {/* Far right — drooping */}
        <Frond
          d="M 75 47 Q 110 38 145 48"
          swayD="M 75 47 Q 112 36 147 46"
          delay={1.25}
          leaflets={makeLeaflets(
            [[90, 42], [105, 40], [120, 42], [135, 46]],
            -10, 'left'
          ).concat(makeLeaflets(
            [[92, 44], [107, 43], [122, 44], [137, 48]],
            -10, 'right'
          ))}
        />

        {/* Right drooping low */}
        <Frond
          d="M 75 47 Q 100 55 130 62"
          swayD="M 75 47 Q 102 53 132 60"
          delay={1.3}
          leaflets={makeLeaflets(
            [[88, 50], [100, 54], [112, 58], [124, 61]],
            10, 'left'
          ).concat(makeLeaflets(
            [[90, 52], [102, 56], [114, 60], [126, 63]],
            10, 'right'
          ))}
        />

        {/* Left drooping low */}
        <Frond
          d="M 75 47 Q 55 55 35 60"
          swayD="M 75 47 Q 53 53 33 58"
          delay={1.35}
          leaflets={makeLeaflets(
            [[65, 50], [55, 54], [45, 57], [38, 59]],
            170, 'left'
          ).concat(makeLeaflets(
            [[63, 52], [53, 56], [43, 59], [36, 61]],
            170, 'right'
          ))}
        />

        {/* ============ ISLAND / SAND MOUND ============ */}
        <motion.path
          d="M 85 135 Q 95 130 115 130 Q 135 130 140 135"
          stroke="#25d0ab"
          strokeWidth="0.8"
          fill="none"
          opacity="0.35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Sand fill */}
        <motion.path
          d="M 85 135 Q 95 130 115 130 Q 135 130 140 135 Z"
          fill="#25d0ab"
          opacity="0.06"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ delay: 0.5 }}
        />
        {/* Sand dots */}
        {[[95, 133], [105, 132], [115, 133], [125, 133], [110, 131]].map(([cx, cy], i) => (
          <circle key={`sd-${i}`} cx={cx} cy={cy} r="0.3" fill="#25d0ab" opacity="0.2" />
        ))}

        {/* ============ OCEAN WAVES ============ */}
        {/* Wave row 1 — across full width */}
        {[
          { x: 0, d: 'M 0 140 Q 8 137 16 140 Q 24 143 32 140 Q 40 137 48 140' },
          { x: 55, d: 'M 55 139 Q 63 136 71 139 Q 79 142 87 139' },
          { x: 93, d: 'M 93 140 Q 101 137 109 140 Q 117 143 125 140' },
          { x: 132, d: 'M 132 139 Q 140 136 148 139 Q 156 142 164 139 Q 172 136 180 139' },
          { x: 187, d: 'M 187 140 Q 195 137 203 140 Q 211 143 220 140' },
        ].map(({ d }, i) => (
          <motion.path
            key={`w1-${i}`}
            d={d}
            stroke="#25d0ab"
            strokeWidth="0.6"
            fill="none"
            opacity="0.3"
            animate={{
              y: [0, 1.5, 0],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Wave row 2 — offset */}
        {[
          { d: 'M 10 145 Q 18 142 26 145 Q 34 148 42 145 Q 50 142 58 145' },
          { d: 'M 65 144 Q 73 141 81 144 Q 89 147 97 144' },
          { d: 'M 105 145 Q 113 142 121 145 Q 129 148 137 145 Q 145 142 153 145' },
          { d: 'M 160 144 Q 168 141 176 144 Q 184 147 192 144 Q 200 141 210 144' },
        ].map((w, i) => (
          <motion.path
            key={`w2-${i}`}
            d={w.d}
            stroke="#25d0ab"
            strokeWidth="0.4"
            fill="none"
            opacity="0.2"
            animate={{
              y: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5 + i * 0.3,
            }}
          />
        ))}

        {/* Wave row 3 — faint, furthest */}
        {[
          { d: 'M 5 150 Q 20 147 35 150 Q 50 153 65 150' },
          { d: 'M 80 149 Q 95 146 110 149 Q 125 152 140 149' },
          { d: 'M 150 150 Q 165 147 180 150 Q 195 153 210 150' },
        ].map((w, i) => (
          <motion.path
            key={`w3-${i}`}
            d={w.d}
            stroke="#25d0ab"
            strokeWidth="0.3"
            fill="none"
            opacity="0.12"
            animate={{
              y: [0, 1.5, 0],
            }}
            transition={{
              duration: 3.5 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1 + i * 0.4,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default PalmScene