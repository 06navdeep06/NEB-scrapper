import Link from 'next/link'
import { getSubjectBySlug, getChaptersBySubjectId } from '@/lib/data'
import { ArrowLeft, BookOpen, Clock, ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function SubjectChaptersPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  
  const subject = await getSubjectBySlug(slug)

  if (!subject) {
    notFound()
  }

  const chapters = await getChaptersBySubjectId(subject.id)
  
  // Group chapters by grade
  const grade11Chapters = chapters.filter(c => c.grade === 11).sort((a, b) => a.number - b.number)
  const grade12Chapters = chapters.filter(c => c.grade === 12).sort((a, b) => a.number - b.number)
  const otherChapters = chapters.filter(c => !c.grade).sort((a, b) => a.number - b.number)

  const renderChapterList = (chaptersList: typeof chapters, title: string) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
        <span className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></span>
        {title}
      </h2>
      <div className="grid gap-4">
        {chaptersList.map((chapter) => (
          <Link 
            href={`/subjects/${slug}/${chapter.id}`} 
            key={chapter.id}
            className="group block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg border border-indigo-100 dark:border-indigo-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                  {chapter.number}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 line-clamp-2">
                    {chapter.description}
                  </p>
                  <div className="flex items-center mt-3 text-xs font-medium text-slate-400 dark:text-slate-500 space-x-4">
                    <span className="flex items-center bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      <Clock className="mr-1.5 h-3 w-3" />
                      {chapter.estimatedHours} hours
                    </span>
                    <span className="flex items-center bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded">
                      <BookOpen className="mr-1.5 h-3 w-3" />
                      Notes Available
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/subjects" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Subjects
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              {/* Icon placeholder or dynamic icon could go here */}
              <BookOpen className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {subject.name}
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {subject.description}
          </p>
        </div>

        {grade11Chapters.length > 0 && renderChapterList(grade11Chapters, 'Grade 11 Syllabus')}
        {grade12Chapters.length > 0 && renderChapterList(grade12Chapters, 'Grade 12 Syllabus')}
        {otherChapters.length > 0 && renderChapterList(otherChapters, 'Chapters')}

        {chapters.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No chapters found</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Content for this subject is being prepared. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
