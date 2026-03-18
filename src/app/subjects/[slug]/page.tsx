import Link from 'next/link'
import { getSubjectBySlug, getChaptersBySubjectId } from '@/lib/data'
import { ArrowLeft, BookOpen, Clock, ChevronRight, FileText, Sigma, ClipboardList } from 'lucide-react'
import { notFound } from 'next/navigation'

const accentMap: Record<string, {
  color: string; bg: string; border: string; hoverBorder: string; glow: string; barGrad: string; chipBg: string
}> = {
  atom: {
    color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-100 dark:border-blue-900/40', hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    glow: 'from-blue-500 to-cyan-500', barGrad: 'from-blue-500 to-cyan-400', chipBg: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300',
  },
  flask: {
    color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-100 dark:border-emerald-900/40', hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    glow: 'from-emerald-500 to-teal-500', barGrad: 'from-emerald-500 to-teal-400', chipBg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300',
  },
  calculator: {
    color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40',
    border: 'border-violet-100 dark:border-violet-900/40', hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700',
    glow: 'from-violet-500 to-purple-500', barGrad: 'from-violet-500 to-purple-400', chipBg: 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300',
  },
  monitor: {
    color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-100 dark:border-orange-900/40', hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-700',
    glow: 'from-orange-500 to-amber-500', barGrad: 'from-orange-500 to-amber-400', chipBg: 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300',
  },
  microscope: {
    color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/40',
    border: 'border-pink-100 dark:border-pink-900/40', hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-700',
    glow: 'from-pink-500 to-rose-500', barGrad: 'from-pink-500 to-rose-400', chipBg: 'bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300',
  },
  book: {
    color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-100 dark:border-amber-900/40', hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-700',
    glow: 'from-amber-500 to-yellow-500', barGrad: 'from-amber-500 to-yellow-400', chipBg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300',
  },
}

export default async function SubjectChaptersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const subject = await getSubjectBySlug(slug)
  if (!subject) notFound()

  const chapters = await getChaptersBySubjectId(subject.id)
  const a = accentMap[subject.icon] ?? accentMap['book']

  const grade11 = chapters.filter(c => c.grade === 11).sort((x, y) => x.number - y.number)
  const grade12 = chapters.filter(c => c.grade === 12).sort((x, y) => x.number - y.number)
  const other   = chapters.filter(c => !c.grade).sort((x, y) => x.number - y.number)

  const renderSection = (list: typeof chapters, label: string) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <div className={`h-6 w-1.5 rounded-full bg-gradient-to-b ${a.barGrad}`} />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{label}</h2>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${a.chipBg}`}>{list.length} chapters</span>
      </div>
      <div className="grid gap-3">
        {list.map((chapter) => (
          <Link
            href={`/subjects/${slug}/${chapter.id}`}
            key={chapter.id}
            className={`group relative flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl border p-5 shadow-sm transition-all duration-200 overflow-hidden ${a.border} ${a.hoverBorder} hover:-translate-y-0.5 hover:shadow-md`}
          >
            {/* Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-tr ${a.glow} opacity-[0.06] group-hover:opacity-[0.12] blur-2xl transition-opacity`} />

            {/* Chapter number */}
            <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg ${a.bg} ${a.color} group-hover:scale-105 transition-transform`}>
              {chapter.number}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm sm:text-base">
                {chapter.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {chapter.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                  <Clock className="h-3 w-3" /> {chapter.estimatedHours}h study time
                </span>
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md ${a.chipBg}`}>
                  <BookOpen className="h-3 w-3" /> Notes
                </span>
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md ${a.chipBg}`}>
                  <Sigma className="h-3 w-3" /> Formulas
                </span>
              </div>
            </div>

            {/* Arrow */}
            <ChevronRight className={`flex-shrink-0 h-5 w-5 text-slate-300 dark:text-slate-600 group-hover:${a.color.split(' ')[0]} group-hover:translate-x-1 transition-all`} />
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link href="/subjects" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          All Subjects
        </Link>

        {/* Subject header */}
        <div className="flex items-start gap-4 mb-10 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${a.bg} ${a.color}`}>
            <BookOpen className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{subject.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base leading-relaxed">{subject.description}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${a.chipBg}`}>
                <FileText className="h-3 w-3" /> {chapters.length} Total Chapters
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${a.chipBg}`}>
                <ClipboardList className="h-3 w-3" /> Mock Tests Available
              </span>
            </div>
          </div>
        </div>

        {grade11.length > 0 && renderSection(grade11, 'Grade 11 Syllabus')}
        {grade12.length > 0 && renderSection(grade12, 'Grade 12 Syllabus')}
        {other.length   > 0 && renderSection(other,   'All Chapters')}

        {chapters.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white">No chapters yet</h3>
            <p className="text-sm text-slate-400 mt-1">Content for this subject is being prepared. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
