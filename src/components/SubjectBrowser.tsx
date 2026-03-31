'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Atom, FlaskConical, Calculator, Monitor, Microscope, BookMarked, TrendingUp, Briefcase } from 'lucide-react'
import type { Subject } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  atom:         <Atom className="h-6 w-6" />,
  flask:        <FlaskConical className="h-6 w-6" />,
  calculator:   <Calculator className="h-6 w-6" />,
  monitor:      <Monitor className="h-6 w-6" />,
  microscope:   <Microscope className="h-6 w-6" />,
  book:         <BookMarked className="h-6 w-6" />,
  'trending-up': <TrendingUp className="h-6 w-6" />,
  briefcase:    <Briefcase className="h-6 w-6" />,
}

const colorMap: Record<string, { color: string; bg: string; border: string; glow: string }> = {
  atom:         { color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-950/40',    border: 'border-blue-200 dark:border-blue-900',    glow: 'from-blue-500 to-cyan-500'    },
  flask:        { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-900', glow: 'from-emerald-500 to-teal-500' },
  calculator:   { color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40',  border: 'border-violet-200 dark:border-violet-900', glow: 'from-violet-500 to-purple-500' },
  monitor:      { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/40',  border: 'border-orange-200 dark:border-orange-900', glow: 'from-orange-500 to-amber-500'  },
  microscope:   { color: 'text-pink-600 dark:text-pink-400',    bg: 'bg-pink-50 dark:bg-pink-950/40',     border: 'border-pink-200 dark:border-pink-900',    glow: 'from-pink-500 to-rose-500'    },
  book:         { color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-950/40',   border: 'border-amber-200 dark:border-amber-900',  glow: 'from-amber-500 to-yellow-500' },
  'trending-up': { color: 'text-teal-600 dark:text-teal-400',   bg: 'bg-teal-50 dark:bg-teal-950/40',    border: 'border-teal-200 dark:border-teal-900',    glow: 'from-teal-500 to-cyan-500'    },
  briefcase:    { color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-200 dark:border-indigo-900', glow: 'from-indigo-500 to-blue-500'  },
}

const FACULTY_SUBJECTS: Record<string, Record<string, string[]>> = {
  Science: {
    11: ['physics', 'chemistry', 'mathematics', 'biology', 'computer-science', 'english', 'nepali'],
    12: ['physics', 'chemistry', 'mathematics', 'biology', 'computer-science', 'english', 'nepali'],
  },
  Management: {
    11: ['economics', 'business-studies', 'english', 'nepali'],
    12: ['economics', 'business-studies', 'english', 'nepali'],
  },
}

interface Props {
  subjects: Subject[]
}

export default function SubjectBrowser({ subjects }: Props) {
  const [grade, setGrade] = useState<'11' | '12'>('11')
  const [faculty, setFaculty] = useState<'Science' | 'Management'>('Science')
  const [query, setQuery] = useState('')

  const allowedSlugs = FACULTY_SUBJECTS[faculty]?.[grade] ?? []

  const filtered = subjects.filter(s => {
    const inFaculty = allowedSlugs.includes(s.slug)
    const matchesQuery = !query.trim() ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
    return inFaculty && matchesQuery
  })

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Browse by Class & Faculty
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Select your class and faculty to see relevant subjects
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Grade selector */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 px-2">Class</span>
            {(['11', '12'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  grade === g
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Grade {g}
              </button>
            ))}
          </div>

          {/* Faculty selector */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 px-2">Faculty</span>
            {(['Science', 'Management'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFaculty(f)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  faculty === f
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Inline search */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm w-full sm:w-56">
            <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Filter subjects..."
              className="bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 outline-none w-full"
            />
          </div>
        </div>

        {/* Subject grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(subject => {
              const meta = colorMap[subject.icon] ?? colorMap['book']
              return (
                <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group">
                  <div className={`relative rounded-2xl border bg-white dark:bg-slate-900 p-5 flex flex-col h-full shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg overflow-hidden ${meta.border}`}>
                    <div className={`absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-tr ${meta.glow} opacity-[0.07] group-hover:opacity-[0.15] blur-2xl transition-opacity`} />
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${meta.bg} ${meta.color}`}>
                      {iconMap[subject.icon] ?? iconMap['book']}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{subject.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1 line-clamp-2">{subject.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                        {subject.totalChapters} chapters
                      </span>
                      <ArrowRight className={`h-3.5 w-3.5 ${meta.color} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No subjects found for {faculty} — Grade {grade}</p>
            <p className="text-xs mt-1 opacity-70">More subjects coming soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}
