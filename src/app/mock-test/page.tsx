import { mockTests, chapters, subjects } from '@/lib/data'
import Link from 'next/link'
import { Book, Clock, AlertCircle, ChevronRight } from 'lucide-react'

export default function MockTestPage() {
  
  // Fetch tests with chapter and subject info
  const tests = mockTests.map(t => {
    const c = chapters.find(chap => chap.id === t.chapterId)
    const s = subjects.find(sub => sub.id === c?.subjectId)
    return {
      ...t,
      chapterTitle: c?.title,
      subjectName: s?.name,
    }
  })

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent)] pointer-events-none">
        <div className="h-40 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 dark:from-indigo-400 dark:via-violet-400 dark:to-emerald-400">Mock Tests</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Challenge yourself with chapter-wise and full syllabus mock tests.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tests && tests.length > 0 ? (
          tests.map((test) => (
            <div key={test.id} className="relative bg-white/80 dark:bg-slate-800/80 overflow-hidden shadow rounded-2xl border border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-transform backdrop-blur-sm">
              <div className="absolute -top-16 -right-20 h-44 w-44 bg-gradient-to-tr from-indigo-500 via-violet-500 to-emerald-500 opacity-10 blur-2xl" />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Book className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                        {test.subjectName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {test.chapterTitle}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${test.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                      test.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {test.difficulty}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                    {test.title}
                  </h3>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700/50 px-5 py-3 border-t border-gray-100 dark:border-slate-700">
                <div className="text-sm flex justify-between items-center">
                  <div className="flex space-x-4 text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {test.durationMinutes}m
                    </span>
                    <span className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {test.totalMarks} marks
                    </span>
                  </div>
                  <Link
                    href={`/mock-test/${test.id}`}
                    className="flex items-center font-medium text-indigo-700 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Start <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tests available</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Check back later for new mock tests.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
