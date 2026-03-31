'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

interface TocEntry {
  id: string
  text: string
  level: number
}

interface Props {
  contentSelector?: string
}

export default function TableOfContents({ contentSelector = '.notes-content' }: Props) {
  const [entries, setEntries] = useState<TocEntry[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const containers = document.querySelectorAll<HTMLElement>(contentSelector)
    if (!containers.length) return

    const headings: TocEntry[] = []
    containers.forEach((container) => {
      container.querySelectorAll<HTMLElement>('h2, h3, h4').forEach((el) => {
        const text = el.textContent?.trim() ?? ''
        if (!text) return

        // Assign a stable id if missing
        if (!el.id) {
          el.id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 60)
        }

        headings.push({
          id: el.id,
          text,
          level: parseInt(el.tagName[1], 10),
        })
      })
    })

    setEntries(headings)
  }, [contentSelector])

  useEffect(() => {
    if (!entries.length) return

    const observer = new IntersectionObserver(
      (obs) => {
        const visible = obs.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    entries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [entries])

  if (!entries.length) return null

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-6">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4 text-indigo-500" />
          Table of Contents
        </span>
        <span className="text-slate-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <nav className="px-4 pb-4 max-h-64 overflow-y-auto">
          <ul className="space-y-0.5">
            {entries.map((entry) => (
              <li key={entry.id} style={{ paddingLeft: `${(entry.level - 2) * 14}px` }}>
                <button
                  onClick={() => scrollTo(entry.id)}
                  className={`w-full text-left text-xs py-1 px-2 rounded transition-colors truncate ${
                    activeId === entry.id
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {entry.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
