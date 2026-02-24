import { createClient } from '@/utils/supabase/server'
import PastPaperFilters from '@/components/PastPaperFilters'
import { FileText, Download, Eye, Filter } from 'lucide-react'

export default async function PastPapersPage({ searchParams }: { searchParams: { subject?: string; year?: string } }) {
  const supabase = await createClient()
  const { subject, year } = await searchParams

  // Fetch subjects for filter
  const { data: subjects } = await supabase.from('subjects').select('id, name').order('name')

  // Build query
  let query = supabase
    .from('past_papers')
    .select(`
      *,
      subjects (name),
      chapters (title)
    `)
    .order('year', { ascending: false })

  if (subject) {
    query = query.eq('subject_id', subject)
  }
  if (year) {
    query = query.eq('year', parseInt(year))
  }

  const { data: papers } = await query

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Past Papers Repository</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Access a comprehensive collection of past NEB board exam papers.
        </p>
      </div>

      <PastPaperFilters subjects={subjects || []} />

      {papers && papers.length > 0 ? (
        <div className="bg-white dark:bg-slate-800 shadow overflow-hidden sm:rounded-md border border-gray-100 dark:border-slate-700">
          <ul className="divide-y divide-gray-200 dark:divide-slate-700">
            {papers.map((paper) => (
              <li key={paper.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition duration-150 ease-in-out">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                        {paper.subjects?.name} - {paper.year}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {paper.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {paper.chapters?.title ? `Chapter: ${paper.chapters.title}` : 'Full Syllabus'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {paper.has_solutions && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Solved
                        </span>
                      )}
                      <div className="flex space-x-2">
                        <a 
                          href={paper.pdf_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-slate-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </a>
                        <a 
                          href={paper.pdf_url} 
                          download
                          className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Download className="h-4 w-4 mr-1" /> PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
