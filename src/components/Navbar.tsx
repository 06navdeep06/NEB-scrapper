'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GraduationCap, BookOpen, FileText, ClipboardList, Zap, Library, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/subjects',       label: 'Subjects',       icon: BookOpen },
  { href: '/quick-revision', label: 'Quick Revision',  icon: Zap },
  { href: '/past-papers',    label: 'Past Papers',     icon: FileText },
  { href: '/mock-test',      label: 'Mock Tests',      icon: ClipboardList },
  { href: '/resources',      label: 'Resources',       icon: Library },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-indigo-300 dark:group-hover:shadow-indigo-900 transition-shadow">
              <GraduationCap className="h-4.5 w-4.5 text-white" style={{width:'18px', height:'18px'}} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-extrabold gradient-text tracking-tight">NEB Science</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase">+2 Study Platform</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/mock-test"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-indigo-300 dark:hover:shadow-indigo-900 hover:-translate-y-0.5 transition-all duration-200"
            >
              <ClipboardList className="h-3.5 w-3.5" />
              Take a Test
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              )
            })}
            <div className="pt-2 pb-1">
              <Link
                href="/mock-test"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-lg"
              >
                <ClipboardList className="h-4 w-4" />
                Take a Mock Test
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
