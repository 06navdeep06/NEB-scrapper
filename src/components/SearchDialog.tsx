'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, FileText, BookOpen, StickyNote, Loader2 } from 'lucide-react'

interface SearchResult {
  type: string
  id: string
  title: string
  snippet: string
  subjectId?: string
  subjectSlug?: string
  chapterId?: string
  score: number
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const typeIcons: Record<string, React.ReactNode> = {
  subject: <BookOpen className="h-4 w-4 text-indigo-500" />,
  chapter: <FileText className="h-4 w-4 text-emerald-500" />,
  note: <StickyNote className="h-4 w-4 text-amber-500" />,
}

const typeLabels: Record<string, string> = {
  subject: 'Subject',
  chapter: 'Chapter',
  note: 'Note',
}

export default function SearchDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setSelectedIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&limit=10`)
        if (res.ok) {
          const data = await res.json()
          setResults(data.results || [])
        }
      } catch {
        // API unavailable — search static data client-side
        setResults([])
      }
      setLoading(false)
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  const navigateToResult = useCallback((result: SearchResult) => {
    onClose()
    const slug = result.subjectSlug || result.subjectId
    if (result.type === 'subject' && slug) {
      router.push(`/subjects/${slug}`)
    } else if (result.type === 'chapter' && slug && result.chapterId) {
      router.push(`/subjects/${slug}/${result.chapterId}`)
    } else if (result.type === 'note' && slug && result.chapterId) {
      router.push(`/subjects/${slug}/${result.chapterId}?tab=notes`)
    } else {
      router.push('/subjects')
    }
  }, [onClose, router])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIdx(i => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIdx(i => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[selectedIdx]) {
        navigateToResult(results[selectedIdx])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, results, selectedIdx, onClose, navigateToResult])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-xl mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0) }}
            placeholder="Search subjects, chapters, notes..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 outline-none text-base"
          />
          {loading && <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />}
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto py-2">
            {results.map((result, idx) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => navigateToResult(result)}
                className={`w-full flex items-start gap-3 px-5 py-3 text-left transition-colors ${
                  idx === selectedIdx
                    ? 'bg-indigo-50 dark:bg-indigo-950/40'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">{typeIcons[result.type] || typeIcons.note}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                      {result.title}
                    </span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex-shrink-0">
                      {typeLabels[result.type] || result.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {result.snippet}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query.trim() && !loading && results.length === 0 && (
          <div className="py-10 text-center">
            <Search className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400">No results for &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {/* Hint */}
        {!query.trim() && (
          <div className="py-8 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Type to search across all subjects, chapters, and notes
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono">↑↓</kbd> navigate
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono">↵</kbd> select
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono">esc</kbd> close
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
