import { mockTests, questions as allQuestions } from '@/lib/data'
import TestInterface from '@/components/TestInterface'
import { notFound } from 'next/navigation'

export default async function MockTestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // Fetch test details
  const test = mockTests.find(t => t.id === id)

  if (!test) notFound()

  // Fetch questions
  const questions = allQuestions.filter(q => q.testId === id)

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{test.title}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          This test has no questions yet. Please check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TestInterface test={test} questions={questions} />
    </div>
  )
}
