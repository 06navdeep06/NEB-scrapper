import { mockTests, chapters, subjects } from '@/lib/data'
import Link from 'next/link'
import { ClipboardList, Clock, Target, ChevronRight, BookOpen, Zap } from 'lucide-react'

const difficultyConfig = {
  easy:   { label: 'Easy',   chip: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500', bar: 'from-emerald-400 to-teal-400' },
  medium: { label: 'Medium', chip: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300',         dot: 'bg-amber-500',   bar: 'from-amber-400 to-orange-400' },
  hard:   { label: 'Hard',   chip: 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300',                 dot: 'bg-red-500',     bar: 'from-red-400 to-rose-400'    },
}

const tips = [
  { icon: '⏱️', title: 'Time it right', desc: 'Each test is strictly timed. Practice under real exam conditions.' },
  { icon: '📋', title: 'NEB pattern', desc: 'Questions follow actual NEB board exam format and difficulty.' },
  { icon: '✅', title: 'Instant results', desc: 'Get your score immediately after submission with answer review.' },
  { icon: '📈', title: 'Track progress', desc: 'Identify weak chapters and focus your study time better.' },
]

export default function MockTestPage() {
  const tests = mockTests.map(t => {
    const c = chapters.find(ch => ch.id === t.chapterId)
    const s = subjects.find(sub => sub.id === c?.subjectId)
    return { ...t, chapterTitle: c?.title, subjectName: s?.name }
  })

  const hardTests   = tests.filter(t => t.difficulty === 'hard')
  const mediumTests = tests.filter(t => t.difficulty === 'medium')
  const easyTests   = tests.filter(t => t.difficulty === 'easy')

  const renderTestCard = (test: typeof tests[number]) => {
    const d = difficultyConfig[test.difficulty] ?? difficultyConfig.medium
    return (
      <div key={test.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
        {/* Color bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${d.bar}`} />
        <div className="p-5 flex flex-col flex-1">
          {/* Subject + difficulty */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 truncate">{test.subjectName}</span>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${d.chip}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${d.dot}`} />
              {d.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1">{test.title}</h3>
          {test.chapterTitle && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">{test.chapterTitle}</p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-auto">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {test.durationMinutes} min</span>
            <span className="flex items-center gap-1"><Target className="h-3.5 w-3.5" /> {test.totalMarks} marks</span>
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <span className="text-xs text-slate-400">Timed · Auto-scored</span>
          <Link
            href={`/mock-test/${test.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group-hover:gap-2"
          >
            Start <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-violet-100 dark:bg-violet-950/60 rounded-lg flex items-center justify-center text-violet-600 dark:text-violet-400">
              <ClipboardList className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Practice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Mock Tests</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            Timed exams in NEB board format. Get instant scores, review answers, and identify your weak areas.
          </p>
        </div>

        {/* Tips row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {tips.map(t => (
            <div key={t.title} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="text-xl mb-2">{t.icon}</div>
              <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">{t.title}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.desc}</div>
            </div>
          ))}
        </div>

        {/* Tests grid */}
        {tests.length > 0 ? (
          <div>
            {hardTests.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-red-400 rounded" /> Full Syllabus / Hard
                  <span className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{hardTests.map(renderTestCard)}</div>
              </div>
            )}
            {mediumTests.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-amber-400 rounded" /> Chapter-wise / Medium
                  <span className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{mediumTests.map(renderTestCard)}</div>
              </div>
            )}
            {easyTests.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-emerald-400 rounded" /> Beginner / Easy
                  <span className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{easyTests.map(renderTestCard)}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <ClipboardList className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white">No tests available yet</h3>
            <p className="text-sm text-slate-400 mt-1">Mock tests are being prepared. Check back soon.</p>
          </div>
        )}

        {/* Coming soon banner */}
        <div className="mt-10 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">More tests coming soon</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Chapter-wise MCQ tests for all subjects (Physics, Chemistry, Math, CS, Biology) are being added.
              In the meantime, study chapter notes to prepare.
            </p>
          </div>
          <Link href="/subjects" className="ml-auto flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap">
            Study Notes <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}
