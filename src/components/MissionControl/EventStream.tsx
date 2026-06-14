"use client"
import { useEffect, useRef, useState } from "react"

interface StreamEvent {
  uid: string
  type: string
  content: string
  ts: number
}

const EVENT_COLORS: Record<string, string> = {
  'tool.started':   '#00FFFF',
  'tool.completed': '#00FF41',
  'run.completed':  '#F6C177',
  'run.failed':     '#FF0040',
  'error':          '#FF0040',
  'assistant.delta':'#88FF88',
}

function colorFor(type: string) {
  for (const [k, v] of Object.entries(EVENT_COLORS)) {
    if (type.startsWith(k)) return v
  }
  return '#3a3a3a'
}

function prefixFor(type: string) {
  if (type.startsWith('tool.started'))   return '▶'
  if (type.startsWith('tool.completed')) return '✓'
  if (type.startsWith('run.completed'))  return '■'
  if (type.startsWith('error') || type.startsWith('run.failed')) return '✗'
  if (type.startsWith('assistant'))      return '·'
  return '○'
}

function hhmm(ts: number) {
  return new Date(ts).toTimeString().slice(0, 8)
}

export default function EventStream({ runId }: { runId: string | null }) {
  const [events, setEvents] = useState<StreamEvent[]>([])
  const [status, setStatus] = useState<'idle' | 'live' | 'error'>('idle')
  const bottomRef = useRef<HTMLDivElement>(null)
  const esRef = useRef<EventSource | null>(null)

  useEffect(() => {
    esRef.current?.close()
    setEvents([])

    if (!runId) {
      setStatus('idle')
      return
    }

    const es = new EventSource(`/api/hermes/v1/runs/${runId}/events`)
    esRef.current = es
    setStatus('live')

    es.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data) as Record<string, unknown>
        const type = (parsed.type as string) ?? 'event'
        const content =
          (parsed.content as string) ??
          (parsed.tool_name as string) ??
          (parsed.text as string) ??
          JSON.stringify(parsed).slice(0, 120)

        setEvents((prev) => [
          ...prev.slice(-300),
          { uid: crypto.randomUUID(), type, content, ts: Date.now() },
        ])
      } catch { /* ignore malformed */ }
    }

    es.onerror = () => setStatus('error')

    return () => {
      es.close()
    }
  }, [runId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [events])

  const statusLabel = { idle: 'AWAITING RUN', live: 'LIVE', error: 'DISCONNECTED' }[status]
  const statusColor = { idle: '#3a3a3a', live: '#00FF41', error: '#FF0040' }[status]

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#00FF41]/50 uppercase">
          Event Stream
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: statusColor }}>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: statusColor,
              boxShadow: status === 'live' ? `0 0 6px ${statusColor}` : undefined,
              animation: status === 'live' ? 'pulse 2s infinite' : undefined,
            }}
          />
          {statusLabel}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-[2px] pr-1 min-h-0">
        {events.length === 0 && (
          <div className="text-[#00FF41]/20 text-center mt-12 text-xs">
            {runId ? 'connecting to event stream...' : 'no active run — enter a run ID above'}
          </div>
        )}
        {events.map((ev) => (
          <div
            key={ev.uid}
            className="flex gap-2 items-baseline hover:bg-white/[0.03] px-1 py-[1px] rounded"
          >
            <span className="text-[#00FF41]/25 shrink-0 tabular-nums">{hhmm(ev.ts)}</span>
            <span style={{ color: colorFor(ev.type) }} className="shrink-0 w-3 text-center">
              {prefixFor(ev.type)}
            </span>
            <span style={{ color: colorFor(ev.type) }} className="shrink-0 opacity-70 truncate max-w-[140px]">
              {ev.type}
            </span>
            <span className="text-[#888] truncate">{ev.content}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* blinking cursor when live */}
      {status === 'live' && (
        <div className="shrink-0 mt-1 font-mono text-[10px] text-[#00FF41]/40">
          <span className="animate-pulse">█</span>
        </div>
      )}
    </div>
  )
}
