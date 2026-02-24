import { Zap, Calculator, Atom, Code } from 'lucide-react'
import Link from 'next/link'

export default function QuickRevisionPage() {
  const subjects = [
    {
      name: 'Physics Formulas',
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      color: 'bg-yellow-50 dark:bg-yellow-900/20',
      items: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity', 'Modern Physics']
    },
    {
      name: 'Math Formulas',
      icon: <Calculator className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-900/20',
      items: ['Trigonometry', 'Calculus', 'Vectors', 'Coordinate Geometry', 'Algebra']
    },
    {
      name: 'Chemistry Reactions',
      icon: <Atom className="h-8 w-8 text-emerald-500" />,
      color: 'bg-emerald-50 dark:bg-emerald-900/20',
      items: ['Organic Conversions', 'Inorganic Compounds', 'Physical Chemistry', 'Name Reactions']
    },
    {
      name: 'CS Definitions',
      icon: <Code className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-50 dark:bg-purple-900/20',
      items: ['C Programming', 'Database', 'Network & Web', 'Boolean Algebra']
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quick Revision</h1>
        <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
          Last minute revision tools, formula sheets, and key definitions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {subjects.map((subject, idx) => (
          <div key={idx} className={`${subject.color} rounded-xl p-6 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-slate-600 transition-all`}>
            <div className="bg-white dark:bg-slate-800 w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-6">
              {subject.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{subject.name}</h2>
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
