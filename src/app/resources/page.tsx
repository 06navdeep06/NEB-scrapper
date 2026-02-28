import { FileText, Download, Beaker, HelpCircle, Image, Code } from 'lucide-react'
import Link from 'next/link'

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Syllabus',
      description: 'Official NEB Grade 11 & 12 Science Syllabus',
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      items: [
        { title: 'Grade 11 Physics Syllabus', size: '2.4 MB' },
        { title: 'Grade 12 Chemistry Syllabus', size: '1.8 MB' },
        { title: 'Grade 11 Math Syllabus', size: '1.5 MB' },
      ]
    },
    {
      title: 'Practical Resources',
      description: 'Lab manuals and practical exam guidelines',
      icon: <Beaker className="h-8 w-8 text-emerald-600" />,
      items: [
        { title: 'Physics Lab Manual', size: '5.2 MB' },
        { title: 'Chemistry Salt Analysis Guide', size: '3.1 MB' },
        { title: 'Biology Practical Handbook', size: '4.5 MB' },
      ]
    },
    {
      title: 'Viva Questions',
      description: 'Commonly asked viva questions with answers',
      icon: <HelpCircle className="h-8 w-8 text-purple-600" />,
      items: [
        { title: 'Physics Viva Questions', size: '1.2 MB' },
        { title: 'Chemistry Viva Questions', size: '1.1 MB' },
      ]
    },
    {
      title: 'Important Diagrams',
      description: 'High-quality labeled diagrams for exams',
      icon: <Image className="h-8 w-8 text-orange-600" />,
      items: [
        { title: 'Biology Diagram Collection', size: '8.5 MB' },
        { title: 'Physics Circuit Diagrams', size: '2.3 MB' },
      ]
    },
    {
      title: 'Programming & Computer Science',
      description: 'C, HTML, SQL, and QBASIC resources',
      icon: <Code className="h-8 w-8 text-indigo-600" />,
      items: [
        { title: '50+ C Programs Solved', size: '2.1 MB' },
        { title: 'HTML5 & CSS3 Cheat Sheet', size: '1.4 MB' },
        { title: 'SQL Queries for Beginners', size: '1.2 MB' },
        { title: 'QBASIC Practical Manual', size: '1.8 MB' },
      ]
    }
  ]

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent)] pointer-events-none">
        <div className="h-40 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
      </div>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 dark:from-indigo-400 dark:via-violet-400 dark:to-emerald-400">Student Resources</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Download syllabus, practical manuals, and other essential materials.</p>
        <div className="mt-6">
          <Link 
            href="/quick-revision"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-colors"
          >
            Go to Quick Revision Section
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((section, idx) => (
          <div key={idx} className="relative bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-sm">
            <div className="absolute -top-16 -right-20 h-48 w-48 bg-gradient-to-tr from-indigo-500 via-violet-500 to-emerald-500 opacity-10 blur-2xl" />
            <div className="p-6 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 flex items-center">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm mr-4 ring-1 ring-slate-100 dark:ring-slate-700">
                {section.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{section.description}</p>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center justify-between group">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3 group-hover:text-indigo-600 transition-colors" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-3">{item.size}</span>
                      <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
