"use client"
import { useEffect, useState } from "react"

interface Session {
  id: string
  created_at?: string
  messages?: unknown[]
  [key: string]: unknown
}

interface Props {
  activeSessionId: string | null
  onSelect: (id: string) => void
}

function timeAgo(iso?: string): string {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  return `${Math.floor(diff / 3_600_000)}h ago`
}

export default function SessionGrid({ activeSessionId, onSelect }: Props) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true

    async function poll() {
      try {
        const res = await fetch('/api/hermes/api/sessions')
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (alive) { setSessions(Array.isArray(data) ? data : []); setError(false) }
      } catch {
        if (alive) setError(true)
      }
    }

    poll()
    const id = setInterval(poll, 5000)
    return () => { alive = false; clearInterval(id) }
  }, [])

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#00FF41]/50 uppercase">
          Sessions
        </span>
        <span className="text-[10px] font-mono text-[#00FFFF]/50">
          {sessions.length} active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0 pr-0.5">
        {error && (
          <div className="text-[10px] font-mono text-[#FF0040]/60 text-center mt-4">
            cannot reach hermes
          </div>
        )}
        {!error && sessions.length === 0 && (
          <div className="text-[10px] font-mono text-[#00FF41]/20 text-center mt-4">
            no sessions
          </div>
        )}
        {sessions.map((s) => {
          const isActive = s.id === activeSessionId
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className="w-full text-left px-3 py-2 rounded transition-all"
              style={{
                background: isActive
                  ? 'rgba(0,255,65,0.08)'
                  : 'rgba(0,255,65,0.02)',
                border: `1px solid ${isActive ? 'rgba(0,255,65,0.35)' : 'rgba(0,255,65,0.08)'}`,
                boxShadow: isActive ? '0 0 12px rgba(0,255,65,0.1)' : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className="text-[10px] font-mono font-semibold tracking-wider"
                  style={{ color: isActive ? '#00FF41' : '#00FFFF' }}
                >
                  {s.id.slice(0, 12)}…
                </span>
                <span className="text-[9px] font-mono text-[#00FF41]/30">
                  {timeAgo(s.created_at as string)}
                </span>
              </div>
              <div className="text-[9px] font-mono text-[#00FF41]/30">
                {Array.isArray(s.messages) ? `${s.messages.length} messages` : 'click to select'}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
