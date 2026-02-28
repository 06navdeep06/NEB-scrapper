import Link from 'next/link'
import { subjects, chapters } from '@/lib/data'
import { Search, User, Clock, Eye, MessageSquare, ArrowRight } from 'lucide-react'

// Mock data generator for the UI to match the screenshot
const getRecentNotes = () => {
  // Select a few chapters to display as "Recent Notes"
  const featuredChapters = chapters.slice(0, 6); // Just take first 6 for demo
  
  return featuredChapters.map(chapter => {
    const subject = subjects.find(s => s.id === chapter.subjectId);
    return {
      id: chapter.id,
      subjectName: subject?.name || 'Subject',
      grade: chapter.grade,
      title: chapter.title,
      author: 'Admin',
      timeAgo: '1 year ago',
      views: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 50),
      previewText: chapter.description
    };
  });
};

export default function Home() {
  const recentNotes = getRecentNotes();

  return (
    <div className="flex flex-col min-h-screen bg-[#4a0072]">
      {/* Hero / Search Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-indigo-200 text-lg font-medium">Login to post your Note</p>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Enter search query
            </h1>
            
            <div className="relative max-w-2xl mx-auto mt-8">
              <input
                type="text"
                placeholder="Search.."
                className="w-full px-6 py-4 rounded-lg bg-[#5d008f] text-white placeholder-indigo-300 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2">
                <Search className="h-6 w-6 text-indigo-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter / Sort Bar (Visual only) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6">
        <div className="flex items-center justify-between text-indigo-200 text-sm">
          <div className="flex items-center space-x-2 border-l-4 border-orange-500 pl-3">
            <span className="font-medium">Your notes.</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
            <span className="uppercase tracking-wide text-xs font-bold">Sort By: Date Added (Newest)</span>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNotes.map((note) => (
            <Link href={`/subjects/${note.subjectName.toLowerCase()}/${note.id}`} key={note.id} className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Card Header */}
                <div className="bg-[#3c005e] px-4 py-3 text-center border-b border-indigo-900">
                  <h3 className="text-white text-sm font-medium">
                    NEB new course class {note.grade} - {note.subjectName}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h4 className="text-center text-lg font-bold text-gray-800 mb-4 group-hover:text-[#4a0072] transition-colors">
                    {note.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4 border-b border-gray-100 pb-2">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{note.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{note.timeAgo}</span>
                    </div>
                  </div>

                  {/* Handwritten Note Preview Mockup */}
                  <div className="relative bg-gray-50 rounded-lg p-3 mb-4 h-32 overflow-hidden border border-gray-200">
                    <div className="font-handwriting text-gray-600 text-sm leading-relaxed opacity-80" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                      {note.previewText}
                      <br />
                      ... The fundamental concept of {note.title.toLowerCase()} involves understanding the underlying principles of...
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>
                    
                    {/* Floating Stats Badge on Image */}
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center space-x-2">
                      <span className="flex items-center"><Eye className="h-3 w-3 mr-1" /> {note.views}</span>
                      <span className="flex items-center"><MessageSquare className="h-3 w-3 mr-1" /> {note.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-[#4a0072] px-4 py-2 flex items-center justify-between">
                  <span className="text-[10px] text-indigo-200">NEB new course class {note.grade} - {note.subjectName}</span>
                  <ArrowRight className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
