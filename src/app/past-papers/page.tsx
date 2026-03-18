import { subjects, chapters, pastPapers } from '@/lib/data'
import PastPaperFilters from '@/components/PastPaperFilters'
import { FileText, Download, Eye, BookOpen, Info } from 'lucide-react'

export default async function PastPapersPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; year?: string }>
}) {
  const { subject: subjectFilter, year: yearFilter } = await searchParams

  let papers = pastPapers.map(p => {
    const s = subjects.find(sub => sub.id === p.subjectId)
    const c = chapters.find(chap => chap.id === p.chapterId)
    return { ...p, subjectName: s?.name, chapterTitle: c?.title }
  })

  if (subjectFilter) papers = papers.filter(p => p.subjectId === subjectFilter)
  if (yearFilter)    papers = papers.filter(p => p.year === parseInt(yearFilter))
  papers.sort((a, b) => b.year - a.year)

  const yearsList = [2082, 2081, 2080, 2079, 2078, 2077, 2076, 2075]

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950/60 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Past NEB Papers</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            Board exam papers from 2075–2082 BS. Filter by subject or year. Download PDFs and practice with solved answers where available.
          </p>
        </div>

        {/* Year quick filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a href="/past-papers" className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${!yearFilter ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300'}`}>
            All Years
          </a>
          {yearsList.map(y => (
            <a key={y} href={`/past-papers?year=${y}`}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${yearFilter === String(y) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300'}`}
            >
              {y}
            </a>
          ))}
        </div>

        <PastPaperFilters subjects={subjects || []} />

        {papers && papers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {papers.map((paper) => (
              <div key={paper.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden">
                {/* Subject color strip */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                      <FileText className="h-4.5 w-4.5" style={{width:'18px',height:'18px'}} />
                    </div>
                    {paper.hasSolutions && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                        ✓ Solved
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    {paper.subjectName} · {paper.year} BS
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1">{paper.title}</h3>
                  {paper.chapterTitle && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">Chapter: {paper.chapterTitle}</p>
                  )}
                </div>
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 bg-slate-50 dark:bg-slate-800/40">
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-white dark:bg-slate-900"
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
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No papers found</h3>
            <p className="text-sm text-slate-400">Try adjusting your filters, or check back soon for more papers.</p>
            <a href="/past-papers" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              Clear filters →
            </a>
          </div>
        )}

        {/* Info note */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-300">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>
            Past papers are linked from NEB official sources. If a PDF link does not open, the paper may not yet be in our database.
            Chapter-wise notes and mock tests are always available under <a href="/subjects" className="font-semibold underline">Subjects</a>.
          </p>
        </div>

      </div>
    </div>
  )
}
