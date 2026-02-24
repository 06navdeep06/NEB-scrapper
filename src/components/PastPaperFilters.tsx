'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PastPaperFilters({ subjects }: { subjects: any[] }) {
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
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-8 border border-gray-100 dark:border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white sm:text-sm p-2 border"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white sm:text-sm p-2 border"
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
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Filter
          </button>
          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
