import { useEffect, useRef } from 'react'
import p5 from 'p5'

const MAX_DEPTH = 9
const TRUNK = [92, 58, 38]
const LEAF = [37, 208, 171]

const PalmScene = () => {
  const hostRef = useRef(null)

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        const c = p.createCanvas(220, 170)
        c.parent(hostRef.current)
        p.angleMode(p.RADIANS)
      }

      const branch = (len, depth) => {
        if (depth >= MAX_DEPTH || len < 1.5) return

        const t = depth / (MAX_DEPTH - 1)
        const r = p.lerp(TRUNK[0], LEAF[0], t)
        const g = p.lerp(TRUNK[1], LEAF[1], t)
        const b = p.lerp(TRUNK[2], LEAF[2], t)

        p.stroke(r, g, b)
        p.strokeWeight(p.map(depth, 0, MAX_DEPTH - 1, 4.5, 0.5))
        p.line(0, 0, 0, -len)
        p.translate(0, -len)

        const t_ms = p.millis() * 0.001
        const sway = p.sin(t_ms + depth * 0.4) * 0.14
        const baseAngle = p.PI / 6.5

        p.push()
        p.rotate(baseAngle + sway)
        branch(len * 0.74, depth + 1)
        p.pop()

        p.push()
        p.rotate(-baseAngle + sway * 0.85)
        branch(len * 0.72, depth + 1)
        p.pop()

        if (depth < MAX_DEPTH - 2 && depth > 1) {
          const centerSway = p.sin(t_ms * 0.7 + depth) * 0.08
          p.push()
          p.rotate(centerSway)
          branch(len * 0.62, depth + 2)
          p.pop()
        }
      }

      p.draw = () => {
        p.clear()
        p.translate(p.width / 2, p.height)
        branch(40, 0)
      }
    }

    const instance = new p5(sketch)
    return () => instance.remove()
  }, [])

  return <div ref={hostRef} className="palm-scene" />
}

export default PalmScene