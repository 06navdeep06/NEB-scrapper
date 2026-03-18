import { FileText, Sigma, BookOpen, AlertCircle } from 'lucide-react'
import type { Note } from '@/types'

interface Props {
  notes: Note[]
  isFormulas?: boolean
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
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    chip: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300',
    border: 'border-l-emerald-400 dark:border-l-emerald-600',
  },
}

export default function NotesTab({ notes, isFormulas }: Props) {
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

  return (
    <div className="space-y-5">
      {notes.map((note) => {
        const cfg = typeConfig[note.type] ?? typeConfig.theory
        return (
          <div
            key={note.id}
            className={`rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 ${cfg.border} bg-white dark:bg-slate-900 shadow-sm overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{note.title}</h3>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-3 ${cfg.chip}`}>
                {cfg.icon}
                {cfg.label}
              </span>
            </div>
            {/* Content */}
            <div className="px-5 py-5 notes-content text-sm sm:text-base">
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
