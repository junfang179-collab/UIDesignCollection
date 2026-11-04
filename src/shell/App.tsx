import { useCallback, useEffect, useRef, useState } from 'react'
import { projects, srcOf } from './projects'
import './shell.css'

const pad = (i: number) => String(i + 1).padStart(2, '0')

function initialIndex() {
  const fromUrl = new URLSearchParams(window.location.search).get('p')
  const fromStore = (() => {
    try {
      return localStorage.getItem('collection:project')
    } catch {
      return null
    }
  })()
  for (const key of [fromUrl, fromStore]) {
    if (!key) continue
    const hit = projects.findIndex((p) => p.dir === key)
    if (hit >= 0) return hit
  }
  return 0
}

export default function App() {
  const [index, setIndex] = useState(initialIndex)
  const [open, setOpen] = useState(true)
  const [veiled, setVeiled] = useState(true)
  const [veilOn, setVeilOn] = useState(true)

  const frameRef = useRef<HTMLIFrameElement | null>(null)
  const pendingRef = useRef<string | null>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const timers = useRef<number[]>([])

  const current = projects[index]

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const select = useCallback((next: number) => {
    setIndex((prev) => {
      const i = (next + projects.length) % projects.length
      if (i === prev) return prev
      setVeiled(true)
      setVeilOn(true)
      return i
    })
  }, [])

  useEffect(() => {
    const src = srcOf(current)
    pendingRef.current = src
    document.title = `${current.name} · Design Collection`
    try {
      localStorage.setItem('collection:project', current.dir)
    } catch {
      /* 忽略隐私模式下的写入失败 */
    }
    const url = new URL(window.location.href)
    url.searchParams.set('p', current.dir)
    window.history.replaceState(null, '', url)
    itemRefs.current[index]?.scrollIntoView({ block: 'nearest' })
  }, [current, index])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (!open) return
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        select(index + 1)
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        select(index - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, select])

  const handleLoad = () => {
    const frame = frameRef.current
    if (!frame || !pendingRef.current) return
    if (!frame.src.endsWith(pendingRef.current.replace(/^\//, ''))) return
    clearTimers()
    timers.current = [
      window.setTimeout(() => setVeilOn(false), 120),
      window.setTimeout(() => setVeiled(false), 420),
    ]
  }

  useEffect(() => clearTimers, [])

  return (
    <div className="shell">
      <iframe
        ref={frameRef}
        className="stage"
        src={srcOf(current)}
        title={current.name}
        onLoad={handleLoad}
      />

      {veiled && (
        <div
          className={`veil${veilOn ? ' is-on' : ''}`}
          style={{ ['--accent' as string]: current.accent }}
        >
          <span className="spinner" />
        </div>
      )}

      <aside
        className={`dock${open ? ' is-open' : ''}`}
        style={{ ['--accent' as string]: current.accent }}
        aria-hidden={!open}
      >
        <header className="dock-head">
          <p className="dock-eyebrow">
            <span>Design Collection</span>
            <span className="dock-count">{projects.length} Projects</span>
          </p>
          <h2>选择一个项目</h2>
        </header>

        <nav className="dock-list" aria-label="项目列表">
          {projects.map((p, i) => {
            const active = i === index
            return (
              <button
                key={p.dir}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                type="button"
                className={`item${active ? ' is-active' : ''}`}
                style={{ ['--accent' as string]: p.accent }}
                aria-current={active ? 'true' : undefined}
                onClick={() => select(i)}
                tabIndex={open ? 0 : -1}
              >
                <span className="item-idx">{pad(i)}</span>
                <span className="item-body">
                  <span className="item-name">{p.name}</span>
                  <span className="item-meta">{p.subtitle}</span>
                </span>
                <span className="item-tag">{p.tag}</span>
              </button>
            )
          })}
        </nav>

        <footer className="dock-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 切换
          </span>
          <span>
            <kbd>Esc</kbd> 收起
          </span>
        </footer>
      </aside>

      <button
        type="button"
        className={`launcher${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? '收起项目面板' : '展开项目面板'}
      >
        <span className="launcher-hint">{projects.length} 个项目</span>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g className="icon-grid" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
            <rect x="3.5" y="3.5" width="7" height="7" rx="2.2" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="2.2" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="2.2" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="2.2" />
          </g>
          <g className="icon-x" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
          </g>
        </svg>
      </button>
    </div>
  )
}
