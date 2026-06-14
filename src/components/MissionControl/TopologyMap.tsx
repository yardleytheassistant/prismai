"use client"
import { useEffect, useRef, useState } from "react"

interface Session {
  id: string
  status?: string
  [key: string]: unknown
}

interface Node {
  id: string
  label: string
  x: number
  y: number
  type: 'core' | 'session'
  active: boolean
}

interface Edge {
  from: Node
  to: Node
  id: string
}

const CX = 50
const CY = 50
const RADIUS = 34

function buildGraph(sessions: Session[]): { nodes: Node[]; edges: Edge[] } {
  const core: Node = { id: 'hermes', label: 'HERMES', x: CX, y: CY, type: 'core', active: true }

  const sessionNodes: Node[] = sessions.slice(0, 8).map((s, i) => {
    const total = Math.min(sessions.length, 8)
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2
    return {
      id: s.id,
      label: s.id.slice(0, 6).toUpperCase(),
      x: CX + RADIUS * Math.cos(angle),
      y: CY + RADIUS * Math.sin(angle),
      type: 'session' as const,
      active: s.status === 'active',
    }
  })

  const nodes = [core, ...sessionNodes]
  const edges: Edge[] = sessionNodes.map((n) => ({ id: n.id, from: core, to: n }))

  return { nodes, edges }
}

function Particle({ edge, delay }: { edge: Edge; delay: number }) {
  const id = `path-${edge.id}`
  return (
    <circle r="1.2" fill="#00FFFF" opacity="0.8">
      <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${delay}s`}>
        <mpath href={`#${id}`} />
      </animateMotion>
    </circle>
  )
}

export default function TopologyMap() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [tick, setTick] = useState(0)
  const alive = useRef(true)

  useEffect(() => {
    alive.current = true

    async function poll() {
      try {
        const res = await fetch('/api/hermes/api/sessions')
        if (res.ok) {
          const data = await res.json()
          if (alive.current) setSessions(Array.isArray(data) ? data : [])
        }
      } catch { /* Hermes not reachable */ }
    }

    poll()
    const poll_id = setInterval(poll, 5000)
    const tick_id = setInterval(() => setTick((t) => t + 1), 100)

    return () => {
      alive.current = false
      clearInterval(poll_id)
      clearInterval(tick_id)
    }
  }, [])

  const { nodes, edges } = buildGraph(sessions)

  const glowPulse = 0.5 + 0.5 * Math.sin(tick * 0.08)

  return (
    <div className="w-full aspect-square max-h-48">
      <div className="text-[10px] font-mono tracking-[0.3em] text-[#00FF41]/50 uppercase mb-2">
        Agent Topology
      </div>
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00FF41" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid dots */}
        {Array.from({ length: 10 }, (_, i) =>
          Array.from({ length: 10 }, (_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={i * 11.1}
              cy={j * 11.1}
              r="0.3"
              fill="#00FF41"
              opacity="0.08"
            />
          ))
        )}

        {/* Edges */}
        {edges.map((e) => (
          <path
            key={e.id}
            id={`path-${e.id}`}
            d={`M ${e.from.x} ${e.from.y} L ${e.to.x} ${e.to.y}`}
            stroke="#00FF41"
            strokeWidth="0.3"
            strokeOpacity="0.2"
            fill="none"
            strokeDasharray="2 2"
          />
        ))}

        {/* Particles */}
        {edges.map((e, i) => (
          <Particle key={e.id} edge={e} delay={i * 0.4} />
        ))}

        {/* Session nodes */}
        {nodes.filter((n) => n.type === 'session').map((n) => (
          <g key={n.id} filter="url(#glow-filter)">
            <circle
              cx={n.x}
              cy={n.y}
              r="4"
              fill="rgba(0,255,255,0.05)"
              stroke="#00FFFF"
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />
            <text
              x={n.x}
              y={n.y + 0.4}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="2.2"
              fill="#00FFFF"
              opacity="0.8"
              fontFamily="monospace"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Empty state hint */}
        {nodes.length === 1 && (
          <text
            x={CX}
            y={CY + 20}
            textAnchor="middle"
            fontSize="3"
            fill="#00FF41"
            opacity="0.2"
            fontFamily="monospace"
          >
            no sessions
          </text>
        )}

        {/* Core HERMES node — pulsing */}
        <circle
          cx={CX}
          cy={CY}
          r={7 + glowPulse * 1.5}
          fill="url(#core-glow)"
          opacity={0.4 + glowPulse * 0.3}
        />
        <circle
          cx={CX}
          cy={CY}
          r="5.5"
          fill="rgba(0,255,65,0.08)"
          stroke="#00FF41"
          strokeWidth="0.8"
          filter="url(#glow-filter)"
        />
        <text
          x={CX}
          y={CY + 0.4}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="3"
          fill="#00FF41"
          fontFamily="monospace"
          fontWeight="bold"
        >
          HERMES
        </text>
      </svg>
    </div>
  )
}
