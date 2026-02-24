import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ArrowRight, Book, Clock, FileText, Atom, FlaskConical, Calculator, Monitor } from 'lucide-react'

// Helper to get icon based on subject slug or name
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'atom': return <Atom className="h-12 w-12 text-blue-600" />;
    case 'flask': return <FlaskConical className="h-12 w-12 text-emerald-600" />;
    case 'calculator': return <Calculator className="h-12 w-12 text-purple-600" />;
    case 'monitor': return <Monitor className="h-12 w-12 text-orange-600" />;
    default: return <Book className="h-12 w-12 text-gray-600" />;
  }
}

export default async function Home() {
  const supabase = await createClient()
  const { data: subjects } = await supabase.from('subjects').select('*').order('name')

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Complete NEB Science <br className="hidden sm:block" />
            Preparation Platform
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100 mb-10">
            Everything you need to ace your Grade 11 & 12 exams. Notes, Past Papers, Mock Tests, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/subjects" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg">
              Start Studying
            </Link>
            <Link href="/past-papers" className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out shadow-lg">
              Past Papers
            </Link>
            <Link href="/mock-test" className="bg-blue-800 border border-blue-400 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-900 transition duration-300 ease-in-out shadow-lg">
              Mock Test
            </Link>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
            Choose Your Subject
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects?.map((subject) => (
              <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center h-full border border-gray-100 dark:border-slate-700">
                  <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(subject.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{subject.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">
                    {subject.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm mt-auto">
                    <span>{subject.total_chapters} Chapters</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 dark:bg-slate-700 rounded-xl">
              <FileText className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Comprehensive Notes</h3>
              <p className="text-gray-600 dark:text-gray-300">Detailed chapter-wise notes covering all theoretical concepts, derivations, and examples.</p>
            </div>
            <div className="p-6 bg-emerald-50 dark:bg-slate-700 rounded-xl">
              <Clock className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Past Papers & Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">Access years of past NEB questions with detailed solved answers to guide your preparation.</p>
            </div>
            <div className="p-6 bg-purple-50 dark:bg-slate-700 rounded-xl">
              <Book className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">Practice with timed chapter-wise and full-syllabus mock tests to check your readiness.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
