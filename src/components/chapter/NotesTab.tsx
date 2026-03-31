import { FileText, Sigma, BookOpen, FlaskConical, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Note } from '@/types'
import TableOfContents from './TableOfContents'

interface NoteWithQuality extends Note {
  word_count?: number
  heading_count?: number
  is_complete?: boolean
  quality_score?: number
}

interface Props {
  notes: NoteWithQuality[]
  isFormulas?: boolean
  showToc?: boolean
}

const typeConfig = {
  theory: {
    label: 'Theory',
    icon: <BookOpen className="h-3.5 w-3.5" />,
    chip: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300',
    border: 'border-l-indigo-400 dark:border-l-indigo-600',
  },
  formula: {
    label: 'Formula',
    icon: <Sigma className="h-3.5 w-3.5" />,
    chip: 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300',
    border: 'border-l-violet-400 dark:border-l-violet-600',
  },
  derivation: {
    label: 'Derivation',
    icon: <FileText className="h-3.5 w-3.5" />,
    chip: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300',
    border: 'border-l-blue-400 dark:border-l-blue-600',
  },
  diagram: {
    label: 'Diagram',
    icon: <FlaskConical className="h-3.5 w-3.5" />,
    chip: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300',
    border: 'border-l-emerald-400 dark:border-l-emerald-600',
  },
}

const STUB_THRESHOLD = 300

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, '').trim()
}

function estimatedReadTime(wordCount: number): string {
  const mins = Math.max(1, Math.round(wordCount / 220))
  return `${mins} min read`
}

function QualityBadge({ isComplete, qualityScore }: { isComplete: boolean; qualityScore?: number }) {
  if (isComplete) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
        <CheckCircle2 className="h-3 w-3" />
        Complete
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
      <AlertCircle className="h-3 w-3" />
      Needs Improvement
    </span>
  )
}

function NoteCard({ note }: { note: NoteWithQuality }) {
  const cfg = typeConfig[note.type] ?? typeConfig.theory
  const wordCount = note.word_count ?? stripTags(note.content).split(/\s+/).filter(Boolean).length
  const stub = wordCount < STUB_THRESHOLD / 5  // ~60 words threshold for stub
  const isComplete = note.is_complete ?? (!stub && wordCount >= 300)

  return (
    <div
      className={`rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 ${cfg.border} bg-white dark:bg-slate-900 shadow-sm overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex-1 min-w-0 mr-3">
          {note.title}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
          {!stub && wordCount > 0 && (
            <>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Clock className="h-3 w-3" />
                {estimatedReadTime(wordCount)}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                {wordCount.toLocaleString()} words
              </span>
            </>
          )}
          <QualityBadge isComplete={isComplete} qualityScore={note.quality_score} />
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.chip}`}>
            {cfg.icon}
            {cfg.label}
          </span>
        </div>
      </div>

      {stub ? (
        /* Stub content — show what we have + an "expanding soon" notice */
        <div className="px-5 py-5">
          <div className="notes-content text-sm sm:text-base mb-4">
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <Clock className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              Full detailed notes for this section are being prepared. Check back soon for complete content.
            </p>
          </div>
        </div>
      ) : (
        /* Full content */
        <div className="px-5 py-5 notes-content text-sm sm:text-base">
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
          {note.source_url && (
            <p className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-600">
              Source:{' '}
              <a
                href={note.source_url.split(',')[0].trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600 dark:hover:text-slate-400"
              >
                {note.source_url.split(',')[0].trim()}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function NotesTab({ notes, isFormulas, showToc = true }: Props) {
  if (!notes || notes.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          {isFormulas
            ? <Sigma className="h-6 w-6 text-slate-400" />
            : <FileText className="h-6 w-6 text-slate-400" />
          }
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
          {isFormulas ? 'No formula sheets yet' : 'No notes yet'}
        </h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
          {isFormulas
            ? 'Formula sheets for this chapter will be added soon.'
            : 'Detailed notes for this chapter are being prepared. Check back soon!'
          }
        </p>
      </div>
    )
  }

  const hasFullContent = notes.some(n => {
    const wc = n.word_count ?? stripTags(n.content).split(/\s+/).filter(Boolean).length
    return wc >= 60
  })

  return (
    <div className="space-y-5">
      {showToc && !isFormulas && hasFullContent && <TableOfContents />}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}
