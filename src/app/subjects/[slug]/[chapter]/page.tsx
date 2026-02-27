import Link from 'next/link'
import { getSubjectBySlug, chapters, notes as allNotes, pastPapers as allPapers, mockTests as allTests } from '@/lib/data'
import { ArrowLeft, BookOpen, FileText, Book, Sigma } from 'lucide-react'
import { notFound } from 'next/navigation'
import NotesTab from '@/components/chapter/NotesTab'
import PastPapersTab from '@/components/chapter/PastPapersTab'
import MockTestTab from '@/components/chapter/MockTestTab'

export default async function ChapterDetailPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string; chapter: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { slug, chapter: chapterId } = await params
  const { tab } = await searchParams
  const activeTab = tab || 'notes'

  // Fetch subject and chapter details
  const subject = await getSubjectBySlug(slug)

  if (!subject) notFound()

  const chapter = chapters.find(c => c.id === chapterId)

  if (!chapter) notFound()

  // Fetch content based on tab
  let notes: any[] = []
  let papers: any[] = []
  let tests: any[] = []

  if (activeTab === 'notes') {
    notes = allNotes.filter(n => n.chapterId === chapterId && ['theory', 'derivation', 'diagram'].includes(n.type))
  } else if (activeTab === 'formulas') {
    notes = allNotes.filter(n => n.chapterId === chapterId && n.type === 'formula')
  } else if (activeTab === 'past-papers') {
    papers = allPapers.filter(p => p.chapterId === chapterId).sort((a, b) => b.year - a.year)
  } else if (activeTab === 'mock-test') {
    tests = allTests.filter(t => t.chapterId === chapterId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href={`/subjects/${slug}`} className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to {subject.name}
        </Link>
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl mr-4">
            {chapter.number}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {chapter.title}
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{chapter.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          <Link
            href={`?tab=notes`}
            className={`${
              activeTab === 'notes'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FileText className="mr-2 h-4 w-4" />
            Notes
          </Link>
          <Link
            href={`?tab=formulas`}
            className={`${
              activeTab === 'formulas'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Sigma className="mr-2 h-4 w-4" />
            Formulas
          </Link>
          <Link
            href={`?tab=past-papers`}
            className={`${
              activeTab === 'past-papers'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Past Papers
          </Link>
          <Link
            href={`?tab=mock-test`}
            className={`${
              activeTab === 'mock-test'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Book className="mr-2 h-4 w-4" />
            Mock Test
          </Link>
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'notes' && <NotesTab notes={notes} />}
        {activeTab === 'formulas' && <NotesTab notes={notes} />}
        {activeTab === 'past-papers' && <PastPapersTab papers={papers} />}
        {activeTab === 'mock-test' && <MockTestTab tests={tests} />}
      </div>
    </div>
  )
}
