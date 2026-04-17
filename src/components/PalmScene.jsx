import { useEffect, useRef } from 'react'
import p5 from 'p5'

const PalmScene = () => {
  const hostRef = useRef(null)

  useEffect(() => {
    const sketch = (p) => {
      const W = 220
      const H = 170
      const GROUND = 140
      const TRUNK_H = 95

      const TRUNK = [92, 58, 38]
      const TRUNK_LIGHT = [142, 98, 62]
      const TRUNK_SHADOW = [52, 32, 18]
      const LEAF_BASE = [96, 130, 84]
      const LEAF_TIP = [37, 208, 171]
      const COCONUT = [64, 40, 22]
      const COCONUT_HL = [150, 110, 70]
      const SAND = [200, 168, 110]
      const SEA = [37, 208, 171]

      p.setup = () => {
        const c = p.createCanvas(W, H)
        c.parent(hostRef.current)
      }

      const drawSea = (tSec) => {
        const layers = [
          { y: GROUND + 11, amp: 1.8, freq: 0.10, speed: 1.3, alpha: 220, weight: 0.9 },
          { y: GROUND + 17, amp: 1.3, freq: 0.14, speed: 0.9, alpha: 160, weight: 0.6 },
          { y: GROUND + 23, amp: 1.0, freq: 0.18, speed: 0.6, alpha: 110, weight: 0.5 },
        ]
        for (const l of layers) {
          p.stroke(SEA[0], SEA[1], SEA[2], l.alpha)
          p.strokeWeight(l.weight)
          let px = 0
          let py = l.y + Math.sin(tSec * l.speed) * l.amp
          for (let x = 3; x <= W; x += 3) {
            const y = l.y + Math.sin(x * l.freq + tSec * l.speed) * l.amp
            p.line(px, py, x, y)
            px = x
            py = y
          }
        }
      }

      const drawSand = () => {
        const cx = W / 2
        p.noStroke()
        p.fill(SAND[0], SAND[1], SAND[2], 32)
        p.rect(0, GROUND + 4, W, 6)

        p.stroke(SAND[0], SAND[1], SAND[2], 190)
        p.strokeWeight(0.8)
        p.noFill()
        let prev = null
        for (let dx = -72; dx <= 72; dx += 3) {
          const u = (dx + 72) / 144
          const x = cx + dx
          const y = GROUND + 5 - Math.sin(u * Math.PI) * 6
          if (prev) p.line(prev.x, prev.y, x, y)
          prev = { x, y }
        }

        p.noStroke()
        p.fill(SAND[0], SAND[1], SAND[2], 230)
        const grains = [
          [-55, 3], [-40, 2], [-25, 1], [-10, 0], [4, 0], [18, 1], [32, 2], [48, 3],
          [-45, 6], [-28, 7], [-8, 7], [10, 7], [28, 7], [44, 6],
        ]
        for (const [dx, dy] of grains) {
          p.ellipse(cx + dx, GROUND + dy, 0.9, 0.9)
        }
      }

      const drawTrunk = (tSec) => {
        const segs = 14
        const gust = Math.sin(tSec * 0.6) * 1.4
        const baseX = W / 2
        const baseY = GROUND
        let prev = { x: baseX, y: baseY }
        for (let i = 1; i <= segs; i++) {
          const u = i / segs
          const x = baseX - Math.sin(u * 1.3) * 9 + gust * u * u
          const y = baseY - TRUNK_H * u
          const r = p.lerp(TRUNK[0], TRUNK_LIGHT[0], u)
          const g = p.lerp(TRUNK[1], TRUNK_LIGHT[1], u)
          const b = p.lerp(TRUNK[2], TRUNK_LIGHT[2], u)
          p.stroke(r, g, b)
          p.strokeWeight(p.lerp(5, 2.6, u))
          p.line(prev.x, prev.y, x, y)
          if (i % 2 === 0) {
            p.stroke(TRUNK_SHADOW[0], TRUNK_SHADOW[1], TRUNK_SHADOW[2], 200)
            p.strokeWeight(0.5)
            p.line(x - 3, y + 0.4, x + 3, y + 0.4)
          }
          prev = { x, y }
        }
        return prev
      }

      const drawCoconuts = (cx, cy) => {
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
          p.ellipse(cx + dx, cy + dy, d, d)
          p.fill(COCONUT_HL[0], COCONUT_HL[1], COCONUT_HL[2], 220)
          p.ellipse(cx + dx - 0.8, cy + dy - 1, d * 0.35, d * 0.35)
        }
      }

      const drawFrond = (x, y, angle, remaining, depth, tSec, phase) => {
        if (depth > 11 || remaining < 1.5) return
        const sway = Math.sin(tSec * 1.1 + phase + depth * 0.18) * 0.07
        const heading = angle + sway
        const segLen = Math.max(2, remaining * 0.12)
        const nx = x + Math.cos(heading) * segLen
        const ny = y + Math.sin(heading) * segLen
        const u = Math.min(1, depth / 10)
        const r = p.lerp(LEAF_BASE[0], LEAF_TIP[0], u)
        const g = p.lerp(LEAF_BASE[1], LEAF_TIP[1], u)
        const b = p.lerp(LEAF_BASE[2], LEAF_TIP[2], u)
        p.stroke(r, g, b)
        p.strokeWeight(p.lerp(1.4, 0.4, u))
        p.line(x, y, nx, ny)
        const leafLen = p.lerp(7, 2, u)
        const leftA = heading - Math.PI / 2 + 0.25
        const rightA = heading + Math.PI / 2 - 0.25
        p.stroke(LEAF_TIP[0], LEAF_TIP[1], LEAF_TIP[2], 230)
        p.strokeWeight(0.55)
        p.line(nx, ny, nx + Math.cos(leftA) * leafLen, ny + Math.sin(leftA) * leafLen)
        p.line(nx, ny, nx + Math.cos(rightA) * leafLen, ny + Math.sin(rightA) * leafLen)
        const nextAngle = heading + (Math.PI / 2 - heading) * 0.08
        drawFrond(nx, ny, nextAngle, remaining - segLen, depth + 1, tSec, phase)
      }

      p.draw = () => {
        p.clear()
        const tSec = p.millis() * 0.001
        drawSea(tSec)
        drawSand()
        const crown = drawTrunk(tSec)
        drawCoconuts(crown.x, crown.y)
        for (let i = 0; i < 9; i++) {
          let angle
          if (i < 7) angle = -Math.PI + 0.3 + (i / 6) * (Math.PI - 0.6)
          else if (i === 7) angle = Math.PI - 0.45
          else angle = 0.45
          drawFrond(crown.x, crown.y, angle, 42, 0, tSec, i * 1.1)
        }
      }
    }

    const instance = new p5(sketch)
    return () => instance.remove()
  }, [])

  return <div ref={hostRef} className="palm-scene" />
}

export default PalmScene