'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TestInterface({ test, questions }: { test: any, questions: any[] }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleOptionSelect = (questionId: string, option: string) => {
    if (isSubmitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
  }

  const handleSubmit = () => {
    let calculatedScore = 0
    questions.forEach((q) => {
      const userAnswer = (answers[q.id] || '').trim().toLowerCase()
      const correctAnswer = String(q.correctAnswer).trim().toLowerCase()
      
      if (userAnswer === correctAnswer) {
        calculatedScore += q.marks
      }
    })
    setScore(calculatedScore)
    setIsSubmitted(true)
    
    // Save to local storage
    try {
      const results = JSON.parse(localStorage.getItem('testResults') || '[]')
      results.push({
        testId: test.id,
        score: calculatedScore,
        totalMarks: test.totalMarks,
        date: new Date().toISOString()
      })
      localStorage.setItem('testResults', JSON.stringify(results))
    } catch (e) {
      console.error('Failed to save result', e)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">Test Completed!</h2>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            You scored <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> out of <span className="font-bold">{test.totalMarks}</span>
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => router.push('/mock-test')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Tests
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 transition-colors"
            >
              Retake Test
            </button>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-slate-700/50 px-8 py-6 border-t border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Review Answers</h3>
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="border-b border-gray-200 dark:border-slate-600 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-slate-600 text-xs font-medium mr-3 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">{q.question}</p>
                    <div className="mt-2 space-y-1">
                      <p className={`text-sm ${answers[q.id] === q.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        Your answer: {answers[q.id] || 'Skipped'}
                      </p>
                      {answers[q.id] !== q.correctAnswer && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Correct answer: {q.correctAnswer}
                        </p>
                      )}
                      {q.explanation && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
                          Explanation: {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 p-4 mb-6 flex justify-between items-center sticky top-20 z-10">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
            {test.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <div className={`flex items-center px-4 py-2 rounded-full font-mono font-medium ${timeLeft < 300 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
          <Clock className="h-4 w-4 mr-2" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-100 dark:border-slate-700 overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
            <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300">
              {currentQuestion.marks} Marks
            </span>
          </div>

          <div className="space-y-3">
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
              (currentQuestion.options as string[]).map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(currentQuestion.id, option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion.id] === option
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                      : 'border-gray-200 hover:border-blue-300 dark:border-slate-600 dark:hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                      answers[currentQuestion.id] === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    }`}>
                      {answers[currentQuestion.id] === option && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </div>
                </button>
              ))
            ) : (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleOptionSelect(currentQuestion.id, e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 dark:bg-slate-700/50 px-6 py-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              currentQuestionIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-slate-600'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </button>
          
          <div className="flex space-x-2">
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Map */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Question Map</h3>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`h-8 w-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                currentQuestionIndex === idx
                  ? 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-500'
                  : answers[q.id]
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-slate-600'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
