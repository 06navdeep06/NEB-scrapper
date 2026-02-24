import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, BookOpen, Clock, ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function SubjectChaptersPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { slug } = await params

  // Fetch subject details
  const { data: subject } = await supabase
    .from('subjects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!subject) {
    notFound()
  }

  // Fetch chapters for the subject
  const { data: chapters } = await supabase
    .from('chapters')
    .select('*')
    .eq('subject_id', subject.id)
    .order('chapter_number', { ascending: true })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/subjects" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Subjects
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          {subject.name}
          <span className="ml-4 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full dark:bg-slate-800 dark:text-gray-400">
            {subject.total_chapters} Chapters
          </span>
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">{subject.description}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {chapters && chapters.length > 0 ? (
            chapters.map((chapter) => (
              <Link 
                href={`/subjects/${slug}/${chapter.id}`} 
                key={chapter.id}
                className="block hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150"
              >
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg">
                      {chapter.chapter_number}
                    </div>
                    <div className="ml-4 truncate">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{chapter.title}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {chapter.estimated_hours} hours
                        </span>
                        {chapter.description && (
                          <span className="hidden sm:inline-block truncate max-w-md">
                             • {chapter.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No chapters found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Chapters for this subject haven't been added yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
