import Link from 'next/link'
import { subjects } from '@/lib/data'
import { ArrowRight, Book, Clock, FileText, Atom, FlaskConical, Calculator, Monitor, GraduationCap, Award, Search } from 'lucide-react'

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'atom': return <Atom className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
    case 'flask': return <FlaskConical className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
    case 'calculator': return <Calculator className="h-12 w-12 text-violet-600 dark:text-violet-400" />
    case 'monitor': return <Monitor className="h-12 w-12 text-orange-600 dark:text-orange-400" />
    default: return <Book className="h-12 w-12 text-slate-600 dark:text-slate-400" />
  }
}

const getAccent = (iconName: string) => {
  switch (iconName) {
    case 'atom':
      return { glow: 'from-indigo-500 to-sky-500', hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700', text: 'text-indigo-600 dark:text-indigo-400', chip: 'bg-indigo-50 dark:bg-indigo-900/30' }
    case 'flask':
      return { glow: 'from-emerald-500 to-teal-500', hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700', text: 'text-emerald-600 dark:text-emerald-400', chip: 'bg-emerald-50 dark:bg-emerald-900/30' }
    case 'calculator':
      return { glow: 'from-violet-500 to-fuchsia-500', hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700', text: 'text-violet-600 dark:text-violet-400', chip: 'bg-violet-50 dark:bg-violet-900/30' }
    case 'monitor':
      return { glow: 'from-orange-500 to-amber-500', hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-700', text: 'text-orange-600 dark:text-orange-400', chip: 'bg-orange-50 dark:bg-orange-900/30' }
    default:
      return { glow: 'from-slate-400 to-slate-600', hoverBorder: 'hover:border-slate-300 dark:hover:border-slate-700', text: 'text-slate-700 dark:text-slate-300', chip: 'bg-slate-100 dark:bg-slate-800' }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-72 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-rose-600/20 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900" />
        </div>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            NEB Study Materials
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-400 mb-8">
            Browse subjects and open chapter resources below.
          </p>
          
          {/* New Search Bar */}
          <div className="max-w-xl mx-auto relative">
             <input 
               type="text" 
               placeholder="Search chapters, topics..." 
               className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
        </div>
      </section>


      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Explore Study Materials</h2>
            <p className="text-base text-slate-600 dark:text-slate-400">Select a subject to open chapter-wise resources.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects?.map((subject) => {
              const accent = getAccent(subject.icon)
              return (
                <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group h-full">
                  <div className={`relative rounded-2xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-start h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md transition-all duration-300 ${accent.hoverBorder} overflow-hidden group-hover:-translate-y-1`}>
                    <div className={`absolute -top-20 -right-16 h-56 w-56 bg-gradient-to-tr ${accent.glow} opacity-25 group-hover:opacity-50 blur-3xl`} />
                    <div className="w-14 h-14 mb-6 rounded-2xl bg-white dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-700 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                      {getIcon(subject.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{subject.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{subject.description}</p>
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
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Notes</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Chapter-wise theory, derivations, and diagrams.</p>
              <Link href="/subjects" className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center group">
                Read Notes <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Past Papers</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">8 years of papers with solutions.</p>
              <Link href="/past-papers" className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center group">
                Practice Papers <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-6 text-violet-600 dark:text-violet-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Mock Tests</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Timed tests with instant scoring.</p>
              <Link href="/mock-test" className="text-violet-600 font-medium hover:text-violet-700 inline-flex items-center group">
                Start Test <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Removed marketing CTA section to keep the homepage utilitarian */}
    </div>
  )
}
