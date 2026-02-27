import { Book, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function MockTestTab({ tests }: { tests: any[] }) {
  if (!tests || tests.length === 0) {
    return (
      <div className="text-center py-12">
        <Book className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No mock tests available</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Mock tests for this chapter will be added soon.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tests.map((test) => (
        <div key={test.id} className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg border border-gray-100 dark:border-slate-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Book className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)} Difficulty
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {test.title}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700/50 px-5 py-3">
            <div className="text-sm flex justify-between items-center">
              <div className="flex space-x-4 text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {test.durationMinutes} mins
                </span>
                <span className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {test.totalMarks} marks
                </span>
              </div>
              <Link
                href={`/mock-test/${test.id}`}
                className="font-medium text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Start Test
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
