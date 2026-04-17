import { useEffect, useRef } from 'react'
import p5 from 'p5'

const TRUNK = [92, 58, 38]
const TRUNK_LIGHT = [142, 98, 62]
const TRUNK_SHADOW = [52, 32, 18]
const LEAF_BASE = [96, 130, 84]
const LEAF_TIP = [37, 208, 171]
const COCONUT = [64, 40, 22]
const COCONUT_HL = [150, 110, 70]
const SAND = [200, 168, 110]
const SEA = [37, 208, 171]

const CANVAS_W = 220
const CANVAS_H = 170
const GROUND_Y = 140
const TRUNK_HEIGHT = 95

const FROND_COUNT = 9
const FROND_LENGTH = 42
const FROND_MAX_DEPTH = 11

const PalmScene = () => {
  const hostRef = useRef(null)

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        const c = p.createCanvas(CANVAS_W, CANVAS_H)
        c.parent(hostRef.current)
        p.angleMode(p.RADIANS)
      }

      const drawSea = (tSec) => {
        const layers = [
          { y: GROUND_Y + 10, amp: 1.7, freq: 0.10, speed: 1.3, alpha: 220, weight: 0.9 },
          { y: GROUND_Y + 16, amp: 1.3, freq: 0.14, speed: 0.9, alpha: 160, weight: 0.6 },
          { y: GROUND_Y + 22, amp: 1.0, freq: 0.18, speed: 0.6, alpha: 110, weight: 0.5 },
          { y: GROUND_Y + 27, amp: 0.7, freq: 0.22, speed: 0.4, alpha: 70, weight: 0.4 },
        ]
        p.noFill()
        for (const l of layers) {
          p.stroke(SEA[0], SEA[1], SEA[2], l.alpha)
          p.strokeWeight(l.weight)
          p.beginShape()
          for (let x = 0; x <= CANVAS_W; x += 2) {
            const y = l.y + p.sin(x * l.freq + tSec * l.speed) * l.amp
            p.vertex(x, y)
          }
          p.endShape()
        }

        p.noStroke()
        p.fill(SEA[0], SEA[1], SEA[2], 18)
        p.rect(0, GROUND_Y + 6, CANVAS_W, CANVAS_H - GROUND_Y - 6)
      }

      const drawSand = () => {
        const cx = CANVAS_W / 2
        p.noStroke()
        p.fill(SAND[0], SAND[1], SAND[2], 45)
        p.beginShape()
        p.vertex(cx - 75, GROUND_Y + 6)
        p.quadraticVertex(cx - 5, GROUND_Y - 3, cx + 75, GROUND_Y + 6)
        p.vertex(cx + 75, GROUND_Y + 11)
        p.vertex(cx - 75, GROUND_Y + 11)
        p.endShape(p.CLOSE)

        p.noFill()
        p.stroke(SAND[0], SAND[1], SAND[2], 180)
        p.strokeWeight(0.7)
        p.beginShape()
        p.vertex(cx - 70, GROUND_Y + 5)
        p.quadraticVertex(cx - 5, GROUND_Y - 3, cx + 70, GROUND_Y + 5)
        p.endShape()

        p.noStroke()
        p.fill(SAND[0], SAND[1], SAND[2], 210)
        const grains = [
          [-50, 3], [-34, 1], [-18, -1], [-2, -1], [14, 0], [30, 1], [48, 3],
          [-42, 6], [-24, 7], [-6, 7], [10, 7], [28, 6], [44, 7],
        ]
        for (const [dx, dy] of grains) {
          p.ellipse(cx + dx, GROUND_Y + dy, 0.85, 0.85)
        }
      }

      const drawTrunk = (tSec) => {
        const segs = 14
        const topY = -TRUNK_HEIGHT
        const gust = p.sin(tSec * 0.6) * 1.4
        let prevX = 0
        let prevY = 0
        for (let i = 1; i <= segs; i++) {
          const u = i / segs
          const x = -p.sin(u * 1.3) * 9 + gust * u * u
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

      const drawCoconuts = (crownX, crownY) => {
        const spots = [
          [-5, 3, 4.2],
          [0, 5.5, 4.0],
          [5, 3.5, 4.2],
          [8, 6.5, 3.8],
          [-2, 7, 3.6],
        ]
        for (const [dx, dy, d] of spots) {
          p.noStroke()
          p.fill(COCONUT[0], COCONUT[1], COCONUT[2])
          p.ellipse(crownX + dx, crownY + dy, d, d)
          p.fill(COCONUT_HL[0], COCONUT_HL[1], COCONUT_HL[2], 220)
          p.ellipse(crownX + dx - 0.8, crownY + dy - 1, d * 0.35, d * 0.35)
        }
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
        const tSec = p.millis() * 0.001

        drawSea(tSec)
        drawSand()

        p.push()
        p.translate(CANVAS_W / 2, GROUND_Y)
        const { crownX, crownY } = drawTrunk(tSec)
        drawCoconuts(crownX, crownY)
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
        p.pop()
      }
    }

    const instance = new p5(sketch)
    return () => instance.remove()
  }, [])

  return <div ref={hostRef} className="palm-scene" />
}

export default PalmScene