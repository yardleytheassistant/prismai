"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import CommandBar from "./CommandBar"
import EventStream from "./EventStream"
import MetricsHUD from "./MetricsHUD"
import SessionGrid from "./SessionGrid"
import TopologyMap from "./TopologyMap"

interface Props {
  open: boolean
  onClose: () => void
}

function GlitchTitle() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 120)
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative font-mono font-bold tracking-[0.25em] text-sm select-none">
      <span
        className="relative z-10 transition-all"
        style={{ color: '#00FF41', textShadow: '0 0 12px #00FF41, 0 0 24px rgba(0,255,65,0.3)' }}
      >
        HERMES
      </span>
      <span className="mx-3 text-[#00FF41]/30">/</span>
      <span style={{ color: '#00FFFF', textShadow: '0 0 12px #00FFFF' }}>
        MISSION CONTROL
      </span>
      {glitch && (
        <>
          <span
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              color: '#FF0040',
              textShadow: '2px 0 #FF0040',
              clipPath: 'inset(30% 0 50% 0)',
              transform: 'translate(-2px, 0)',
              opacity: 0.8,
            }}
          >
            HERMES / MISSION CONTROL
          </span>
          <span
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              color: '#00FFFF',
              textShadow: '-2px 0 #00FFFF',
              clipPath: 'inset(60% 0 10% 0)',
              transform: 'translate(2px, 0)',
              opacity: 0.8,
            }}
          >
            HERMES / MISSION CONTROL
          </span>
        </>
      )}
    </div>
  )
}

function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-50"
      style={{
        background:
          'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
      }}
    />
  )
}

function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  )
}

export default function MissionControl({ open, onClose }: Props) {
  const [runId, setRunId] = useState('')
  const [activeRunId, setActiveRunId] = useState<string | null>(null)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function watchRun() {
    const id = runId.trim()
    if (id) setActiveRunId(id)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mc-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9000]"
          style={{ backgroundColor: '#000000' }}
        >
          <ScanlineOverlay />
          <GridBackground />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex flex-col h-full"
          >
            {/* ── Header ── */}
            <div
              className="shrink-0 flex items-center justify-between px-6 py-3"
              style={{
                borderBottom: '1px solid rgba(0,255,65,0.12)',
                background: 'rgba(0,255,65,0.02)',
              }}
            >
              <GlitchTitle />

              <div className="flex items-center gap-6">
                {/* Run ID input */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#00FF41]/40 tracking-widest">
                    RUN ID
                  </span>
                  <input
                    type="text"
                    value={runId}
                    onChange={(e) => setRunId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && watchRun()}
                    placeholder="run_…"
                    className="w-36 bg-transparent border rounded px-2 py-0.5 text-[11px] font-mono text-[#00FFFF] placeholder:text-[#00FFFF]/20 outline-none caret-[#00FFFF]"
                    style={{ borderColor: 'rgba(0,255,255,0.2)' }}
                  />
                  <button
                    onClick={watchRun}
                    className="text-[9px] font-mono px-2 py-0.5 rounded tracking-widest"
                    style={{
                      border: '1px solid rgba(0,255,255,0.25)',
                      color: '#00FFFF',
                      background: 'rgba(0,255,255,0.05)',
                    }}
                  >
                    WATCH
                  </button>
                  {activeRunId && (
                    <button
                      onClick={() => { setActiveRunId(null); setRunId('') }}
                      className="text-[9px] font-mono px-2 py-0.5 rounded tracking-widest"
                      style={{
                        border: '1px solid rgba(255,0,64,0.25)',
                        color: '#FF0040',
                        background: 'rgba(255,0,64,0.05)',
                      }}
                    >
                      STOP
                    </button>
                  )}
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded font-mono text-sm transition-all"
                  style={{
                    border: '1px solid rgba(0,255,65,0.2)',
                    color: '#00FF41',
                    background: 'rgba(0,255,65,0.03)',
                  }}
                  aria-label="Close mission control"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 grid min-h-0 p-4 gap-4" style={{
              gridTemplateColumns: '220px 1fr 200px',
              gridTemplateRows: '1fr auto',
            }}>

              {/* Left column: Topology + Metrics */}
              <div className="flex flex-col gap-4 min-h-0">
                <div
                  className="p-3 rounded"
                  style={{ border: '1px solid rgba(0,255,65,0.1)', background: 'rgba(0,255,65,0.02)' }}
                >
                  <TopologyMap />
                </div>
                <div
                  className="p-3 rounded"
                  style={{ border: '1px solid rgba(0,255,65,0.1)', background: 'rgba(0,255,65,0.02)' }}
                >
                  <MetricsHUD />
                </div>
              </div>

              {/* Center: Event Stream */}
              <div
                className="p-4 rounded min-h-0 flex flex-col"
                style={{ border: '1px solid rgba(0,255,65,0.1)', background: 'rgba(0,0,0,0.5)' }}
              >
                <EventStream runId={activeRunId} />
              </div>

              {/* Right column: Sessions */}
              <div
                className="p-3 rounded min-h-0"
                style={{ border: '1px solid rgba(0,255,65,0.1)', background: 'rgba(0,255,65,0.02)' }}
              >
                <SessionGrid
                  activeSessionId={activeSessionId}
                  onSelect={setActiveSessionId}
                />
              </div>

              {/* Bottom: Command Bar spans all 3 columns */}
              <div
                className="col-span-3 p-3 rounded"
                style={{ border: '1px solid rgba(0,255,65,0.12)', background: 'rgba(0,255,65,0.02)' }}
              >
                <CommandBar sessionId={activeSessionId} />
              </div>
            </div>

            {/* ── Footer ── */}
            <div
              className="shrink-0 flex items-center justify-between px-6 py-2"
              style={{ borderTop: '1px solid rgba(0,255,65,0.08)' }}
            >
              <span className="text-[9px] font-mono text-[#00FF41]/20 tracking-widest">
                PRISMAI / HERMES MISSION CONTROL
              </span>
              <span className="text-[9px] font-mono text-[#00FF41]/20 tracking-widest">
                ESC TO EXIT  ·  proxy → 127.0.0.1:8642
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
