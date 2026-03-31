import Link from 'next/link'
import { getSubjectBySlug, chapters, notes as allNotes, pastPapers as allPapers, mockTests as allTests } from '@/lib/data'
import { ArrowLeft, BookOpen, FileText, Sigma, BookMarked, ClipboardList, Clock, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { notFound } from 'next/navigation'
import NotesTab from '@/components/chapter/NotesTab'
import PastPapersTab from '@/components/chapter/PastPapersTab'
import MockTestTab from '@/components/chapter/MockTestTab'
import ReadingProgressBar from '@/components/chapter/ReadingProgressBar'
import type { Note, PastPaper, MockTest } from '@/types'

function stripTagsServer(html: string) {
  return html.replace(/<[^>]+>/g, '').trim()
}

function computeChapterStats(notes: Note[]) {
  let totalWords = 0
  let headingCount = 0
  for (const n of notes) {
    const text = stripTagsServer(n.content)
    totalWords += text.split(/\s+/).filter(Boolean).length
    headingCount += (n.content.match(/<h[1-6][\s>]/gi) ?? []).length
  }
  const isComplete = totalWords >= 300 && headingCount >= 2
  const readMins = Math.max(1, Math.round(totalWords / 220))
  return { totalWords, headingCount, isComplete, readMins }
}

const accentMap: Record<string, { color: string; bg: string; border: string; glow: string; chip: string }> = {
  atom:       { color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-950/40',    border: 'border-blue-200 dark:border-blue-800', glow: 'from-blue-500 to-cyan-500',    chip: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300' },
  flask:      { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800', glow: 'from-emerald-500 to-teal-500', chip: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300' },
  calculator: { color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40',  border: 'border-violet-200 dark:border-violet-800', glow: 'from-violet-500 to-purple-500', chip: 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300' },
  monitor:    { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/40',  border: 'border-orange-200 dark:border-orange-800', glow: 'from-orange-500 to-amber-500',  chip: 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300' },
  microscope: { color: 'text-pink-600 dark:text-pink-400',    bg: 'bg-pink-50 dark:bg-pink-950/40',     border: 'border-pink-200 dark:border-pink-800',  glow: 'from-pink-500 to-rose-500',    chip: 'bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300' },
  book:       { color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-950/40',   border: 'border-amber-200 dark:border-amber-800', glow: 'from-amber-500 to-yellow-500', chip: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300' },
}

const tabs = [
  { id: 'notes',       label: 'Notes',        icon: FileText },
  { id: 'formulas',    label: 'Formulas',      icon: Sigma },
  { id: 'past-papers', label: 'Past Papers',   icon: BookMarked },
  { id: 'mock-test',   label: 'Mock Test',     icon: ClipboardList },
]

export default async function ChapterDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; chapter: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { slug, chapter: chapterId } = await params
  const { tab } = await searchParams
  const activeTab = tab || 'notes'

  const subject = await getSubjectBySlug(slug)
  if (!subject) notFound()

  const chapter = chapters.find(c => c.id === chapterId)
  if (!chapter) notFound()

  const a = accentMap[subject.icon] ?? accentMap['book']

  // Compute quality stats from all notes for this chapter (server-side)
  const allChapterNotes = allNotes.filter(n => n.chapterId === chapterId)
  const stats = computeChapterStats(allChapterNotes)

  let notes: Note[] = []
  let papers: PastPaper[] = []
  let tests: MockTest[] = []

  if (activeTab === 'notes') {
    notes = allNotes.filter(n => n.chapterId === chapterId && ['theory', 'derivation', 'diagram'].includes(n.type))
  } else if (activeTab === 'formulas') {
    notes = allNotes.filter(n => n.chapterId === chapterId && n.type === 'formula')
  } else if (activeTab === 'past-papers') {
    papers = allPapers.filter(p => p.chapterId === chapterId).sort((a, b) => b.year - a.year)
  } else if (activeTab === 'mock-test') {
    tests = allTests.filter(t => t.chapterId === chapterId)
  }

  // Find adjacent chapters
  const subjectChapters = chapters
    .filter(c => c.subjectId === subject.id && c.grade === chapter.grade)
    .sort((a, b) => a.number - b.number)
  const currentIdx = subjectChapters.findIndex(c => c.id === chapterId)
  const prevChapter = currentIdx > 0 ? subjectChapters[currentIdx - 1] : null
  const nextChapter = currentIdx < subjectChapters.length - 1 ? subjectChapters[currentIdx + 1] : null

  return (
    <>
      <ReadingProgressBar />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-slate-500 dark:text-slate-400">
          <Link href="/subjects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Subjects</Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <Link href={`/subjects/${slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate max-w-[120px]">{subject.name}</Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{chapter.title}</span>
        </nav>

        {/* Chapter header */}
        <div className={`relative bg-white dark:bg-slate-900 rounded-2xl border p-6 mb-6 shadow-sm overflow-hidden ${a.border}`}>
          <div className={`absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-tr ${a.glow} opacity-[0.08] blur-3xl`} />
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl ${a.bg} ${a.color}`}>
              {chapter.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {chapter.grade && (
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${a.chip}`}>
                    Grade {chapter.grade}
                  </span>
                )}
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {chapter.estimatedHours}h estimated
                </span>
                {stats.totalWords > 0 && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> {stats.readMins} min read
                  </span>
                )}
                {stats.isComplete ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="h-3 w-3" /> Complete Chapter
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    <AlertCircle className="h-3 w-3" /> Needs Improvement
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{chapter.title}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{chapter.description}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <Link
                key={id}
                href={`?tab=${id}`}
                className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === id
                    ? `${a.color} border-b-2 border-current`
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'notes'       && <NotesTab notes={notes} />}
            {activeTab === 'formulas'    && <NotesTab notes={notes} isFormulas />}
            {activeTab === 'past-papers' && <PastPapersTab papers={papers} />}
            {activeTab === 'mock-test'   && <MockTestTab tests={tests} />}
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between gap-4">
          {prevChapter ? (
            <Link
              href={`/subjects/${slug}/${prevChapter.id}`}
              className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm transition-all hover:-translate-y-0.5 group flex-1 max-w-xs"
            >
              <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 group-hover:-translate-x-0.5 transition-all" />
              <div className="min-w-0">
                <div className="text-xs text-slate-400">Previous</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{prevChapter.title}</div>
              </div>
            </Link>
          ) : <div />}

          {nextChapter && (
            <Link
              href={`/subjects/${slug}/${nextChapter.id}`}
              className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm transition-all hover:-translate-y-0.5 group flex-1 max-w-xs ml-auto text-right"
            >
              <div className="min-w-0 flex-1">
                <div className="text-xs text-slate-400">Next</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{nextChapter.title}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          )}
        </div>

      </div>
    </div>
    </>
  )
}
