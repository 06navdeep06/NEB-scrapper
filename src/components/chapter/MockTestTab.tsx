import { ClipboardList, Clock, Target, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { MockTest } from '@/types'

const difficultyConfig = {
  easy:   { label: 'Easy',   color: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  medium: { label: 'Medium', color: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300',         dot: 'bg-amber-500'   },
  hard:   { label: 'Hard',   color: 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300',                 dot: 'bg-red-500'     },
}

export default function MockTestTab({ tests }: { tests: MockTest[] }) {
  if (!tests || tests.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No mock tests yet</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
          Mock tests for this chapter are being prepared. Check out the full test library.
        </p>
        <Link href="/mock-test" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          Browse All Tests <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {tests.map((test) => {
        const d = difficultyConfig[test.difficulty] ?? difficultyConfig.medium
        return (
          <div key={test.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <ClipboardList className="h-4.5 w-4.5" style={{width:'18px', height:'18px'}} />
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${d.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${d.dot}`} />
                  {d.label}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-3">{test.title}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {test.durationMinutes} min
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-3.5 w-3.5" /> {test.totalMarks} marks
                </span>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <Link
                href={`/mock-test/${test.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                Start Test <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
