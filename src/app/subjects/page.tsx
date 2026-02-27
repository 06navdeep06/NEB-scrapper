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

export default function SubjectsPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Browse All Subjects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose a subject to start your learning journey. Access comprehensive notes and materials for Grade 11 and 12.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects?.map((subject) => (
            <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group h-full">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-start h-full hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-6 ring-1 ring-slate-100 dark:ring-slate-700 group-hover:scale-105 transition-transform duration-300">
                  {getIcon(subject.icon)}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  {subject.description}
                </p>
                <div className="w-full pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    {subject.totalChapters} Chapters
                  </span>
                  <span className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    View Content <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
