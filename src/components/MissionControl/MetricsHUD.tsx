"use client"
import { useEffect, useState } from "react"

interface Health {
  status?: string
  version?: string
  model?: string
  uptime_seconds?: number
  active_sessions?: number
  [key: string]: unknown
}

function formatUptime(s: number): string {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  return `${h}h ${m}m ${sec}s`
}

interface Chip {
  label: string
  value: string
  color?: string
}

export default function MetricsHUD() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true

    async function poll() {
      try {
        const res = await fetch('/api/hermes/health/detailed')
        if (!res.ok) throw new Error()
        const data: Health = await res.json()
        if (alive) { setHealth(data); setError(false) }
      } catch {
        if (alive) setError(true)
      }
    }

    poll()
    const id = setInterval(poll, 5000)
    return () => { alive = false; clearInterval(id) }
  }, [])

  const online = !error && health?.status !== 'error'

  const chips: Chip[] = [
    {
      label: 'STATUS',
      value: error ? 'OFFLINE' : (health?.status?.toUpperCase() ?? 'CONNECTING…'),
      color: error ? '#FF0040' : '#00FF41',
    },
    {
      label: 'VERSION',
      value: health?.version ?? '—',
      color: '#00FFFF',
    },
    {
      label: 'MODEL',
      value: health?.model ?? '—',
      color: '#F6C177',
    },
    {
      label: 'UPTIME',
      value: health?.uptime_seconds != null ? formatUptime(health.uptime_seconds) : '—',
      color: '#00FF41',
    },
    {
      label: 'SESSIONS',
      value: health?.active_sessions != null ? String(health.active_sessions) : '—',
      color: '#00FFFF',
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#00FF41]/50 uppercase">
          System Metrics
        </span>
        <span
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: online ? '#00FF41' : '#FF0040',
            boxShadow: online ? '0 0 8px #00FF41' : '0 0 8px #FF0040',
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {chips.map((chip) => (
          <div
            key={chip.label}
            className="flex items-center justify-between px-3 py-1.5 rounded"
            style={{
              background: 'rgba(0,255,65,0.03)',
              border: '1px solid rgba(0,255,65,0.08)',
            }}
          >
            <span className="text-[9px] font-mono tracking-widest text-[#00FF41]/40">
              {chip.label}
            </span>
            <span
              className="text-[11px] font-mono font-semibold tabular-nums"
              style={{ color: chip.color }}
            >
              {chip.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
