import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              NEB Science
            </span>
            <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-sm dark:text-slate-400">
              A comprehensive study platform for NEB +2 Science students. 
              Get access to notes, past papers, mock tests, and more.
              <br/><br/>
              Data sourced from <a href="https://nebplus2notes.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">NEB Plus 2 Notes</a> and <a href="https://readersnepal.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Readersnepal</a>.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/subjects" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-white">
                  Subjects
                </Link>
              </li>
              <li>
                <Link href="/past-papers" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-white">
                  Past Papers
                </Link>
              </li>
              <li>
                <Link href="/mock-test" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-white">
                  Mock Tests
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
          <p className="text-sm text-slate-400 text-center">
            &copy; {new Date().getFullYear()} NEB Science Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
