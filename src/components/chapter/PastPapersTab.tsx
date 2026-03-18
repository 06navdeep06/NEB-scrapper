import { FileText, Download, Eye } from 'lucide-react'
import Link from 'next/link'
import type { PastPaper } from '@/types'

export default function PastPapersTab({ papers }: { papers: PastPaper[] }) {
  if (!papers || papers.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No past papers yet</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
          Past NEB board papers for this chapter will be added soon.
        </p>
        <Link href="/past-papers" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          View all past papers →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {papers.map((paper) => (
        <div
          key={paper.id}
          className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{paper.title}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-500 dark:text-slate-400">NEB Board · {paper.year}</span>
              {paper.hasSolutions && (
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                  ✓ Solutions
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <Eye className="h-3.5 w-3.5" /> View
            </a>
            <a
              href={paper.pdfUrl}
              download
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> PDF
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
