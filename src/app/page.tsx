import Link from 'next/link'
import { subjects } from '@/lib/data'
import { ArrowRight, Book, Clock, FileText, Atom, FlaskConical, Calculator, Monitor, GraduationCap, Award, Users } from 'lucide-react'

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

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-blue-800/50 rounded-full px-4 py-1 text-sm font-medium text-blue-100 mb-6 backdrop-blur-sm border border-blue-500/30">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            Updated for NEB 2082 Syllabus
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Science</span> <br className="hidden sm:block" />
            Board Exams
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 mb-10 leading-relaxed">
            The most comprehensive learning platform for Grade 11 & 12 students. 
            Access curated notes, solved past papers, and interactive mock tests.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Link href="/subjects" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <Book className="mr-2 h-5 w-5" /> Start Learning
            </Link>
            <Link href="/mock-test" className="bg-white text-blue-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition duration-300 ease-in-out shadow-lg flex items-center justify-center">
              <Award className="mr-2 h-5 w-5 text-blue-600" /> Take Mock Test
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-blue-500/30 pt-8">
            <div>
              <div className="text-3xl font-bold text-white">4+</div>
              <div className="text-blue-200 text-sm">Major Subjects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-blue-200 text-sm">Chapter Notes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-blue-200 text-sm">Practice Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">8 Years</div>
              <div className="text-blue-200 text-sm">Past Papers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Explore Study Materials
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Select your subject to access chapter-wise notes, formulas, derivations, and important questions tailored for NEB exams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects?.map((subject) => (
              <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group h-full">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center h-full border border-gray-100 dark:border-slate-700 group-hover:border-blue-200 dark:group-hover:border-blue-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {getIcon(subject.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{subject.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                    {subject.description}
                  </p>
                  <div className="w-full pt-6 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    <span>{subject.totalChapters} Chapters</span>
                    <span className="flex items-center group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-blue-50 dark:bg-slate-700/30 rounded-2xl border border-blue-100 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <FileText className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Comprehensive Notes</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Detailed chapter-wise notes covering all theoretical concepts, derivations, and solved examples to clear your concepts.
              </p>
              <Link href="/subjects" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center">
                Read Notes <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="p-8 bg-emerald-50 dark:bg-slate-700/30 rounded-2xl border border-emerald-100 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Past Papers & Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Access 8 years of past NEB board exam questions with detailed step-by-step solved answers to guide your preparation.
              </p>
              <Link href="/past-papers" className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center">
                Practice Papers <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="p-8 bg-purple-50 dark:bg-slate-700/30 rounded-2xl border border-purple-100 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Practice with timed chapter-wise and full-syllabus mock tests. Get instant scores and weak topic analysis.
              </p>
              <Link href="/mock-test" className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center">
                Start Test <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Ready to Ace Your Exams?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students using our platform to boost their NEB scores.
            Start practicing today for free.
          </p>
          <Link href="/quick-revision" className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            Quick Revision Guide
          </Link>
        </div>
      </section>
    </div>
  )
}
