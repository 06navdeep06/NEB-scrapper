import { subjects, chapters, pastPapers } from '@/lib/data'
import PastPaperFilters from '@/components/PastPaperFilters'
import { FileText, Download, Eye, Filter } from 'lucide-react'

export default async function PastPapersPage({ searchParams }: { searchParams: Promise<{ subject?: string; year?: string }> }) {
  const { subject: subjectFilter, year: yearFilter } = await searchParams

  // Filter and enrich papers
  let papers = pastPapers.map(p => {
    const s = subjects.find(sub => sub.id === p.subjectId)
    const c = chapters.find(chap => chap.id === p.chapterId)
    return {
      ...p,
      subjectName: s?.name,
      chapterTitle: c?.title,
    }
  })

  if (subjectFilter) {
    papers = papers.filter(p => p.subjectId === subjectFilter)
  }
  if (yearFilter) {
    papers = papers.filter(p => p.year === parseInt(yearFilter))
  }

  papers.sort((a, b) => b.year - a.year)

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent)] pointer-events-none">
        <div className="h-40 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 dark:from-indigo-400 dark:via-violet-400 dark:to-emerald-400">Past Papers Repository</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Access a comprehensive collection of past NEB board exam papers.</p>
      </div>

      <PastPaperFilters subjects={subjects || []} />

      {papers && papers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <div key={paper.id} className="relative bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm backdrop-blur-sm hover:-translate-y-1 transition-transform">
              <div className="absolute -top-16 -right-20 h-44 w-44 bg-gradient-to-tr from-indigo-500 via-violet-500 to-emerald-500 opacity-10 blur-2xl" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{paper.subjectName} • {paper.year}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{paper.title}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{paper.chapterTitle ? `Chapter: ${paper.chapterTitle}` : 'Full Syllabus'}</p>
                </div>
                {paper.hasSolutions && (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Solved
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-center justify-end space-x-2">
                <a 
                  href={paper.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 border border-slate-300 dark:border-slate-600 shadow-sm text-xs font-medium rounded text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <Eye className="h-4 w-4 mr-1" /> View
                </a>
                <a 
                  href={paper.pdfUrl} 
                  download
                  className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Download className="h-4 w-4 mr-1" /> PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow border border-gray-100 dark:border-slate-700">
          <Filter className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No papers found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}
    </div>
  )
}
