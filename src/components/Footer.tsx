import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#3c005e] border-t border-indigo-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-indigo-200">
              &copy; {new Date().getFullYear()} Copyright Readersnepal
            </span>
          </div>
          <div className="flex space-x-6 text-sm text-indigo-200">
             <span className="text-xs">
              NEB new course class 11 - Physics
             </span>
             <span className="text-xs">
              NEB new course class 11 - Chemistry
             </span>
             <Link href="#" className="hover:text-white transition-colors">
               Privacy Policy
             </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
