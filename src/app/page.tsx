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
      <section className="bg-slate-50 dark:bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/30 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-8 border border-indigo-100 dark:border-indigo-800">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            Updated for NEB 2082 Syllabus
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900 dark:text-white">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Science</span> <br className="hidden sm:block" />
            Board Exams
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
            The most comprehensive learning platform for Grade 11 & 12 students. 
            Access curated notes, solved past papers, and interactive mock tests.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Link href="/subjects" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 flex items-center justify-center transform hover:-translate-y-1">
              <Book className="mr-2 h-5 w-5" /> Start Learning
            </Link>
            <Link href="/mock-test" className="bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center">
              <Award className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" /> Take Mock Test
            </Link>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-12">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">5+</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">Major Subjects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">50+</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">Chapter Notes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">1000+</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">Practice Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">8 Years</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">Past Papers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Explore Study Materials
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Select your subject to access chapter-wise notes, formulas, derivations, and important questions tailored for NEB exams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects?.map((subject) => (
              <Link href={`/subjects/${subject.slug}`} key={subject.id} className="group h-full">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 flex flex-col items-center text-center h-full border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/5 relative overflow-hidden group-hover:-translate-y-1">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-slate-100 dark:ring-slate-700">
                    {getIcon(subject.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{subject.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {subject.description}
                  </p>
                  <div className="w-full pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
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
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Comprehensive Notes</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Detailed chapter-wise notes covering all theoretical concepts, derivations, and solved examples to clear your concepts.
              </p>
              <Link href="/subjects" className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center group">
                Read Notes <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Past Papers & Solutions</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Access 8 years of past NEB board exam questions with detailed step-by-step solved answers to guide your preparation.
              </p>
              <Link href="/past-papers" className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center group">
                Practice Papers <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-6 text-violet-600 dark:text-violet-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Mock Tests</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Practice with timed chapter-wise and full-syllabus mock tests. Get instant scores and weak topic analysis.
              </p>
              <Link href="/mock-test" className="text-violet-600 font-medium hover:text-violet-700 inline-flex items-center group">
                Start Test <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Ace Your Exams?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of students using our platform to boost their NEB scores.
            Start practicing today for free.
          </p>
          <Link href="/quick-revision" className="inline-block bg-white text-indigo-900 font-bold py-4 px-10 rounded-full hover:bg-indigo-50 transition duration-300 transform hover:scale-105 shadow-xl">
            Quick Revision Guide
          </Link>
        </div>
      </section>
    </div>
  )
}
