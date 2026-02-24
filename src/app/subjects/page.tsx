import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ArrowRight, Book, Atom, FlaskConical, Calculator, Monitor } from 'lucide-react'

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'atom': return <Atom className="h-12 w-12 text-blue-600" />;
    case 'flask': return <FlaskConical className="h-12 w-12 text-emerald-600" />;
    case 'calculator': return <Calculator className="h-12 w-12 text-purple-600" />;
    case 'monitor': return <Monitor className="h-12 w-12 text-orange-600" />;
    default: return <Book className="h-12 w-12 text-gray-600" />;
  }
}

export default async function SubjectsPage() {
  const supabase = await createClient()
  const { data: subjects } = await supabase.from('subjects').select('*').order('name')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Subjects</h1>
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
  )
}
