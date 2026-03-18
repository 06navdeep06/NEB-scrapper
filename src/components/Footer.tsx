import Link from 'next/link'
import { GraduationCap, BookOpen, FileText, ClipboardList, Zap, Library } from 'lucide-react'

const subjectLinks = [
  { href: '/subjects/physics',          label: 'Physics' },
  { href: '/subjects/chemistry',        label: 'Chemistry' },
  { href: '/subjects/mathematics',      label: 'Mathematics' },
  { href: '/subjects/computer-science', label: 'Computer Science' },
  { href: '/subjects/biology',          label: 'Biology' },
  { href: '/subjects/english',          label: 'English' },
  { href: '/subjects/nepali',           label: 'Nepali' },
]

const resourceLinks = [
  { href: '/quick-revision', label: 'Quick Revision',  icon: Zap },
  { href: '/past-papers',    label: 'Past Papers',     icon: FileText },
  { href: '/mock-test',      label: 'Mock Tests',      icon: ClipboardList },
  { href: '/resources',      label: 'Resources',       icon: Library },
]

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-extrabold gradient-text">NEB Science</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Nepal's free study platform for NEB +2 Science students. Notes, formulas, past papers and mock tests for all 7 subjects.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                ✓ 100% Free
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                NEB Aligned
              </span>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">Subjects</h3>
            <ul className="space-y-2.5">
              {subjectLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {resourceLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <Icon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">About</h3>
            <ul className="space-y-2.5 mb-6">
              <li>
                <Link href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
              Content references:{' '}
              <a href="https://nebplus2notes.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">NEB Plus 2 Notes</a>,{' '}
              <a href="https://readersnepal.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Readersnepal</a>.
              Content is for educational purposes only.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} NEB Science Platform. Free for all NEB students in Nepal.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Grade 11 & 12 · Science Faculty · Nepal
          </p>
        </div>
      </div>
    </footer>
  )
}
