import { createClient } from '@/utils/supabase/server'
import TestInterface from '@/components/TestInterface'
import { notFound } from 'next/navigation'

export default async function MockTestDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { id } = await params

  // Fetch test details
  const { data: test } = await supabase
    .from('mock_tests')
    .select('*')
    .eq('id', id)
    .single()

  if (!test) notFound()

  // Fetch questions
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('test_id', id)

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
