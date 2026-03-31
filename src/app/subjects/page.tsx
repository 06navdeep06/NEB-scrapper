import Link from 'next/link'
import { subjects } from '@/lib/data'
import { ArrowRight, Atom, FlaskConical, Calculator, Monitor, Microscope, BookMarked, BookOpen, TrendingUp, Briefcase } from 'lucide-react'

const subjectMeta: Record<string, {
  icon: React.ReactNode
  color: string
  bg: string
  border: string
  hoverBorder: string
  glow: string
  badge: string
}> = {
  atom: {
    icon: <Atom className="h-7 w-7" />,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-100 dark:border-blue-900/50',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    glow: 'from-blue-500 to-cyan-500',
    badge: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300',
  },
  flask: {
    icon: <FlaskConical className="h-7 w-7" />,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-100 dark:border-emerald-900/50',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    glow: 'from-emerald-500 to-teal-500',
    badge: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300',
  },
  calculator: {
    icon: <Calculator className="h-7 w-7" />,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    border: 'border-violet-100 dark:border-violet-900/50',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700',
    glow: 'from-violet-500 to-purple-500',
    badge: 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300',
  },
  monitor: {
    icon: <Monitor className="h-7 w-7" />,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-100 dark:border-orange-900/50',
    hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-700',
    glow: 'from-orange-500 to-amber-500',
    badge: 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300',
  },
  microscope: {
    icon: <Microscope className="h-7 w-7" />,
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
    border: 'border-pink-100 dark:border-pink-900/50',
    hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-700',
    glow: 'from-pink-500 to-rose-500',
    badge: 'bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300',
  },
  book: {
    icon: <BookMarked className="h-7 w-7" />,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-100 dark:border-amber-900/50',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-700',
    glow: 'from-amber-500 to-yellow-500',
    badge: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300',
  },
  'trending-up': {
    icon: <TrendingUp className="h-7 w-7" />,
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    border: 'border-teal-100 dark:border-teal-900/50',
    hoverBorder: 'hover:border-teal-300 dark:hover:border-teal-700',
    glow: 'from-teal-500 to-cyan-500',
    badge: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300',
  },
  briefcase: {
    icon: <Briefcase className="h-7 w-7" />,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-100 dark:border-indigo-900/50',
    hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700',
    glow: 'from-indigo-500 to-blue-500',
    badge: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300',
  },
}

const SCIENCE_SLUGS = ['physics', 'chemistry', 'biology', 'mathematics', 'computer-science']
const MANAGEMENT_SLUGS = ['economics', 'business-studies']
const LANG_SLUGS = ['english', 'nepali']

export default function SubjectsPage() {
  const scienceSubjects = subjects.filter(s => SCIENCE_SLUGS.includes(s.slug))
  const managementSubjects = subjects.filter(s => MANAGEMENT_SLUGS.includes(s.slug))
  const langSubjects = subjects.filter(s => LANG_SLUGS.includes(s.slug))

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-950/60 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">All Subjects</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          NEB +2 Subjects
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Select a subject to explore chapter-wise notes, formulas, past papers, and mock tests.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Science & Technical */}
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-slate-300 dark:bg-slate-600 rounded" />
            Science & Technical
            <span className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {scienceSubjects.map((subject) => {
              const meta = subjectMeta[subject.icon] ?? subjectMeta['book']
              return (
                <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group">
                  <div className={`relative rounded-2xl border bg-white dark:bg-slate-900 p-6 flex flex-col h-full shadow-sm transition-all duration-300 overflow-hidden ${meta.border} ${meta.hoverBorder} group-hover:-translate-y-1 group-hover:shadow-lg`}>
                    {/* Glow */}
                    <div className={`absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-tr ${meta.glow} opacity-[0.07] group-hover:opacity-[0.14] blur-2xl transition-opacity`} />

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${meta.bg} ${meta.color} group-hover:scale-105 transition-transform shadow-sm`}>
                      {meta.icon}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{subject.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{subject.description}</p>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${meta.badge}`}>
                        {subject.totalChapters} chapters
                      </span>
                      <span className={`flex items-center gap-1 text-sm font-semibold ${meta.color} group-hover:gap-2 transition-all`}>
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Management subjects */}
        {managementSubjects.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-slate-300 dark:bg-slate-600 rounded" />
              Management
              <span className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {managementSubjects.map((subject) => {
                const meta = subjectMeta[subject.icon] ?? subjectMeta['book']
                return (
                  <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group">
                    <div className={`relative rounded-2xl border bg-white dark:bg-slate-900 p-6 flex flex-col h-full shadow-sm transition-all duration-300 overflow-hidden ${meta.border} ${meta.hoverBorder} group-hover:-translate-y-1 group-hover:shadow-lg`}>
                      <div className={`absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-tr ${meta.glow} opacity-[0.07] group-hover:opacity-[0.14] blur-2xl transition-opacity`} />
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${meta.bg} ${meta.color} group-hover:scale-105 transition-transform shadow-sm`}>
                        {meta.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{subject.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{subject.description}</p>
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${meta.badge}`}>
                          {subject.totalChapters} chapters
                        </span>
                        <span className={`flex items-center gap-1 text-sm font-semibold ${meta.color} group-hover:gap-2 transition-all`}>
                          Explore <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Language subjects */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-slate-300 dark:bg-slate-600 rounded" />
            Language
            <span className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {langSubjects.map((subject) => {
              const meta = subjectMeta[subject.icon] ?? subjectMeta['book']
              return (
                <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group">
                  <div className={`relative rounded-2xl border bg-white dark:bg-slate-900 p-6 flex items-center gap-5 shadow-sm transition-all duration-200 overflow-hidden ${meta.border} ${meta.hoverBorder} group-hover:-translate-y-1 group-hover:shadow-md`}>
                    <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-tr ${meta.glow} opacity-[0.07] group-hover:opacity-[0.14] blur-2xl transition-opacity`} />
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${meta.bg} ${meta.color}`}>
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{subject.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">{subject.description}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${meta.badge}`}>
                        {subject.totalChapters} ch
                      </span>
                      <ArrowRight className={`h-4 w-4 ${meta.color} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
