import Link from 'next/link'
import { subjects } from '@/lib/data'
import { ArrowRight, Book, Atom, FlaskConical, Calculator, Monitor } from 'lucide-react'

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'atom': return <Atom className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />;
    case 'flask': return <FlaskConical className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />;
    case 'calculator': return <Calculator className="h-10 w-10 text-violet-600 dark:text-violet-400" />;
    case 'monitor': return <Monitor className="h-10 w-10 text-orange-600 dark:text-orange-400" />;
    default: return <Book className="h-10 w-10 text-slate-600 dark:text-slate-400" />;
  }
}

const getAccent = (iconName: string) => {
  switch (iconName) {
    case 'atom':
      return {
        glow: 'from-indigo-500 to-sky-500',
        hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700',
        chip: 'bg-indigo-50 dark:bg-indigo-900/30',
        text: 'text-indigo-600 dark:text-indigo-400'
      }
    case 'flask':
      return {
        glow: 'from-emerald-500 to-teal-500',
        hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
        chip: 'bg-emerald-50 dark:bg-emerald-900/30',
        text: 'text-emerald-600 dark:text-emerald-400'
      }
    case 'calculator':
      return {
        glow: 'from-violet-500 to-fuchsia-500',
        hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700',
        chip: 'bg-violet-50 dark:bg-violet-900/30',
        text: 'text-violet-600 dark:text-violet-400'
      }
    case 'monitor':
      return {
        glow: 'from-orange-500 to-amber-500',
        hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-700',
        chip: 'bg-orange-50 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400'
      }
    default:
      return {
        glow: 'from-slate-400 to-slate-600',
        hoverBorder: 'hover:border-slate-300 dark:hover:border-slate-700',
        chip: 'bg-slate-100 dark:bg-slate-800',
        text: 'text-slate-600 dark:text-slate-400'
      }
  }
}

export default function SubjectsPage() {
  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen py-24">
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent)] pointer-events-none">
        <div className="h-40 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">Subjects</h1>
          <p className="text-base text-slate-600 dark:text-slate-400">Open a subject to view chapters and notes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects?.map((subject) => {
            const accent = getAccent(subject.icon)
            return (
              <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group h-full">
                <div className={`relative rounded-2xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-start h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md transition-all duration-300 ${accent.hoverBorder} overflow-hidden group-hover:-translate-y-1`}>
                  <div className={`absolute -top-20 -right-16 h-56 w-56 bg-gradient-to-tr ${accent.glow} opacity-25 group-hover:opacity-50 blur-3xl`} />
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-white dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-700 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                    {getIcon(subject.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    {subject.description}
                  </p>
                  <div className="mt-auto w-full pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className={`text-sm font-semibold text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full ${accent.chip}`}>
                      {subject.totalChapters} Chapters
                    </span>
                    <span className={`flex items-center font-medium text-sm ${accent.text} group-hover:translate-x-1 transition-transform`}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
