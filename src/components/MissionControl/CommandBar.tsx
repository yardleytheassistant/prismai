"use client"
import { useRef, useState } from "react"

interface Props {
  sessionId: string | null
}

interface Message {
  id: string
  role: 'user' | 'assistant' | 'error'
  content: string
}

export default function CommandBar({ sessionId }: Props) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [sending, setSending] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  async function send() {
    const text = input.trim()
    if (!text || sending) return

    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', content: text }])
    setHistory((h) => [text, ...h].slice(0, 50))
    setHistIdx(-1)
    setInput('')
    setSending(true)

    try {
      const target = sessionId ?? 'default'
      const res = await fetch(`/api/hermes/api/sessions/${target}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (!res.ok) throw new Error(`${res.status}`)
      const data = await res.json() as Record<string, unknown>
      const reply = (data.content as string) ?? (data.message as string) ?? JSON.stringify(data)

      setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: 'error', content: `Error: ${String(err)}` },
      ])
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { send(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : (history[next] ?? ''))
    }
  }

  const msgColor = (role: string) =>
    role === 'user' ? '#00FFFF' : role === 'error' ? '#FF0040' : '#00FF41'

  const msgPrefix = (role: string) =>
    role === 'user' ? '>' : role === 'error' ? '✗' : '«'

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Message log */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-1 mb-3 min-h-0 max-h-32">
          {messages.map((m) => (
            <div key={m.id} className="flex gap-2">
              <span style={{ color: msgColor(m.role) }} className="shrink-0">
                {msgPrefix(m.role)}
              </span>
              <span style={{ color: msgColor(m.role) }} className="opacity-80 break-all">
                {m.content}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Input row */}
      <div
        className="flex items-center gap-3 px-4 py-2 rounded"
        style={{
          background: 'rgba(0,255,65,0.04)',
          border: '1px solid rgba(0,255,65,0.15)',
        }}
      >
        <span className="font-mono text-[#00FF41] text-sm shrink-0">
          {sessionId ? `[${sessionId.slice(0, 8)}]` : '[no session]'} &gt;_
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          disabled={sending}
          placeholder={sessionId ? 'send command to hermes…' : 'select a session first'}
          className="flex-1 bg-transparent outline-none font-mono text-sm text-[#00FF41] placeholder:text-[#00FF41]/20 caret-[#00FF41]"
        />
        <button
          onClick={send}
          disabled={!input.trim() || sending || !sessionId}
          className="shrink-0 px-3 py-1 text-[10px] font-mono tracking-widest rounded transition-all"
          style={{
            background: sending ? 'rgba(0,255,65,0.05)' : 'rgba(0,255,65,0.1)',
            border: '1px solid rgba(0,255,65,0.25)',
            color: '#00FF41',
            opacity: (!input.trim() || sending || !sessionId) ? 0.3 : 1,
          }}
        >
          {sending ? '···' : 'SEND'}
        </button>
      </div>
    </div>
  )
}
