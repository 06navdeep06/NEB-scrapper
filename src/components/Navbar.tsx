'use client'

import Link from 'next/link'
import { BookOpen, GraduationCap, FileText, Layout, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                NEB Science
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link href="/subjects" className="text-slate-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors dark:text-slate-300 dark:hover:text-indigo-400">
                Subjects
              </Link>
              <Link href="/past-papers" className="text-slate-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors dark:text-slate-300 dark:hover:text-indigo-400">
                Past Papers
              </Link>
              <Link href="/mock-test" className="text-slate-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors dark:text-slate-300 dark:hover:text-indigo-400">
                Mock Test
              </Link>
              <Link href="/resources" className="text-slate-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors dark:text-slate-300 dark:hover:text-indigo-400">
                Resources
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
              Sign In
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-slate-800"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden bg-white/95 backdrop-blur-md dark:bg-slate-900/95`}>
        <div className="pt-2 pb-3 space-y-1 px-2">
          <Link href="/subjects" className="text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-slate-200 dark:hover:bg-slate-800">
            Subjects
          </Link>
          <Link href="/past-papers" className="text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-slate-200 dark:hover:bg-slate-800">
            Past Papers
          </Link>
          <Link href="/mock-test" className="text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-slate-200 dark:hover:bg-slate-800">
            Mock Test
          </Link>
          <Link href="/resources" className="text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors dark:text-slate-200 dark:hover:bg-slate-800">
            Resources
          </Link>
        </div>
        <div className="pt-4 pb-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center px-4">
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
