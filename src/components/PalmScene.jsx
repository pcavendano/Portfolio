import { useEffect, useRef } from 'react'
import p5 from 'p5'

const TRUNK = [92, 58, 38]
const TRUNK_LIGHT = [142, 98, 62]
const TRUNK_SHADOW = [52, 32, 18]
const LEAF_BASE = [96, 130, 84]
const LEAF_TIP = [37, 208, 171]

const FROND_COUNT = 9
const FROND_LENGTH = 48
const FROND_MAX_DEPTH = 11

const PalmScene = () => {
  const hostRef = useRef(null)

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        const c = p.createCanvas(220, 170)
        c.parent(hostRef.current)
        p.angleMode(p.RADIANS)
      }

      const drawTrunk = (tSec) => {
        const segs = 14
        const topY = -118
        const gust = p.sin(tSec * 0.6) * 1.6
        let prevX = 0
        let prevY = 0
        for (let i = 1; i <= segs; i++) {
          const u = i / segs
          const x = -p.sin(u * 1.3) * 10 + gust * u * u
          const y = topY * u
          const r = p.lerp(TRUNK[0], TRUNK_LIGHT[0], u)
          const g = p.lerp(TRUNK[1], TRUNK_LIGHT[1], u)
          const b = p.lerp(TRUNK[2], TRUNK_LIGHT[2], u)
          p.stroke(r, g, b)
          p.strokeWeight(p.lerp(5, 2.6, u))
          p.line(prevX, prevY, x, y)
          if (i % 2 === 0) {
            p.stroke(TRUNK_SHADOW[0], TRUNK_SHADOW[1], TRUNK_SHADOW[2], 200)
            p.strokeWeight(0.5)
            p.line(x - 3, y + 0.4, x + 3, y + 0.4)
          }
          prevX = x
          prevY = y
        }
        return { crownX: prevX, crownY: prevY }
      }

      const drawFrond = (x, y, angle, remaining, depth, tSec, phase) => {
        if (depth > FROND_MAX_DEPTH || remaining < 1.5) return

        const sway = p.sin(tSec * 1.1 + phase + depth * 0.18) * 0.07
        const heading = angle + sway
        const segLen = Math.max(2, remaining * 0.12)
        const nx = x + p.cos(heading) * segLen
        const ny = y + p.sin(heading) * segLen

        const u = Math.min(1, depth / 10)
        const r = p.lerp(LEAF_BASE[0], LEAF_TIP[0], u)
        const g = p.lerp(LEAF_BASE[1], LEAF_TIP[1], u)
        const b = p.lerp(LEAF_BASE[2], LEAF_TIP[2], u)

        p.stroke(r, g, b)
        p.strokeWeight(p.lerp(1.4, 0.4, u))
        p.line(x, y, nx, ny)

        const leafLen = p.lerp(7, 2, u)
        const leftA = heading - p.PI / 2 + 0.25
        const rightA = heading + p.PI / 2 - 0.25
        p.stroke(LEAF_TIP[0], LEAF_TIP[1], LEAF_TIP[2], 230)
        p.strokeWeight(0.55)
        p.line(nx, ny, nx + p.cos(leftA) * leafLen, ny + p.sin(leftA) * leafLen)
        p.line(nx, ny, nx + p.cos(rightA) * leafLen, ny + p.sin(rightA) * leafLen)

        const nextAngle = heading + (p.PI / 2 - heading) * 0.08
        drawFrond(nx, ny, nextAngle, remaining - segLen, depth + 1, tSec, phase)
      }

      p.draw = () => {
        p.clear()
        p.translate(p.width / 2, p.height - 8)
        const tSec = p.millis() * 0.001

        const { crownX, crownY } = drawTrunk(tSec)

        p.noStroke()
        p.fill(TRUNK_SHADOW[0], TRUNK_SHADOW[1], TRUNK_SHADOW[2])
        p.ellipse(crownX - 4, crownY + 3, 3.2, 3.2)
        p.ellipse(crownX + 3, crownY + 3, 3.2, 3.2)
        p.ellipse(crownX, crownY + 5, 3, 3)

        for (let i = 0; i < FROND_COUNT; i++) {
          let angle
          if (i < 7) {
            angle = -p.PI + 0.3 + (i / 6) * (p.PI - 0.6)
          } else if (i === 7) {
            angle = p.PI - 0.45
          } else {
            angle = 0.45
          }
          drawFrond(crownX, crownY, angle, FROND_LENGTH, 0, tSec, i * 1.1)
        }
      }
    }

    const instance = new p5(sketch)
    return () => instance.remove()
  }, [])

  return <div ref={hostRef} className="palm-scene" />
}

export default PalmScene