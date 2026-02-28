'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import type { Subject } from '@/types'

export default function PastPaperFilters({ subjects }: { subjects: Subject[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '')
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '')

  const years = Array.from({ length: 8 }, (_, i) => 2082 - i)

  const handleFilter = () => {
    const params = new URLSearchParams()
    if (selectedSubject) params.set('subject', selectedSubject)
    if (selectedYear) params.set('year', selectedYear)
    router.push(`/past-papers?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedSubject('')
    setSelectedYear('')
    router.push('/past-papers')
  }

  return (
    <div className="relative bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl shadow mb-8 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
      <div className="absolute -top-16 -right-20 h-44 w-44 bg-gradient-to-tr from-indigo-500 via-violet-500 to-emerald-500 opacity-10 blur-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white sm:text-sm px-3 py-2 border"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Year</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white sm:text-sm px-3 py-2 border"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end space-x-2">
          <button
            onClick={handleFilter}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
          >
            Filter
          </button>
          <button
            onClick={clearFilters}
            className="flex-1 bg-slate-200 text-slate-700 px-4 py-2 rounded-full hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
