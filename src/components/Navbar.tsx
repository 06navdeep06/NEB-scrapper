'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-[#4a0072] text-white border-b border-indigo-900 sticky top-0 z-50 transition-all duration-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-bold tracking-tight text-white">
                Readersnepal
              </span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link href="/subjects" className="text-indigo-100 hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                E-Notes
              </Link>
              <Link href="/mock-test" className="text-indigo-100 hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                Online Exams
              </Link>
              <Link href="/past-papers" className="text-indigo-100 hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                Your Notes
              </Link>
              <Link href="/resources" className="text-indigo-100 hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                Readers Club
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 focus:outline-none"
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
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden bg-[#3c005e]`}>
        <div className="pt-2 pb-3 space-y-1 px-2">
          <Link href="/subjects" className="text-indigo-100 hover:bg-indigo-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            E-Notes
          </Link>
          <Link href="/mock-test" className="text-indigo-100 hover:bg-indigo-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Online Exams
          </Link>
          <Link href="/past-papers" className="text-indigo-100 hover:bg-indigo-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Your Notes
          </Link>
          <Link href="/resources" className="text-indigo-100 hover:bg-indigo-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Readers Club
          </Link>
        </div>
      </div>
    </nav>
  )
}
