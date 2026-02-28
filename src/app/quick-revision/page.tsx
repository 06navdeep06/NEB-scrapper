import { Zap, Calculator, Atom, Code } from 'lucide-react'
import Link from 'next/link'

export default function QuickRevisionPage() {
  const subjects = [
    {
      name: 'Physics Formulas',
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      color: 'from-yellow-400 to-amber-500',
      items: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity', 'Modern Physics']
    },
    {
      name: 'Math Formulas',
      icon: <Calculator className="h-8 w-8 text-blue-500" />,
      color: 'from-indigo-500 to-sky-500',
      items: ['Trigonometry', 'Calculus', 'Vectors', 'Coordinate Geometry', 'Algebra']
    },
    {
      name: 'Chemistry Reactions',
      icon: <Atom className="h-8 w-8 text-emerald-500" />,
      color: 'from-emerald-500 to-teal-500',
      items: ['Organic Conversions', 'Inorganic Compounds', 'Physical Chemistry', 'Name Reactions']
    },
    {
      name: 'CS Definitions',
      icon: <Code className="h-8 w-8 text-purple-500" />,
      color: 'from-violet-500 to-fuchsia-500',
      items: ['C Programming', 'Database', 'Network & Web', 'Boolean Algebra']
    }
  ]

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent)] pointer-events-none">
        <div className="h-40 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
      </div>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 dark:from-indigo-400 dark:via-violet-400 dark:to-emerald-400">Quick Revision</h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Last minute revision tools, formula sheets, and key definitions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {subjects.map((subject, idx) => (
          <div key={idx} className="relative rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <div className={`absolute -top-16 -right-20 h-44 w-44 bg-gradient-to-tr ${subject.color} opacity-25 hover:opacity-50 blur-2xl`} />
            <div className="bg-white dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 ring-1 ring-slate-100 dark:ring-slate-700">
              {subject.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{subject.name}</h2>
            <ul className="space-y-3 mb-6">
              {subject.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
            <Link 
              href={`/subjects`} 
              className="block w-full text-center py-2 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm"
            >
              View All
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
