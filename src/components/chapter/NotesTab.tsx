import { FileText, ChevronRight } from 'lucide-react'

export default function NotesTab({ notes }: { notes: any[] }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notes available</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Notes for this chapter will be added soon.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <div key={note.id} className="bg-white dark:bg-slate-800 shadow sm:rounded-lg overflow-hidden border border-gray-100 dark:border-slate-700">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {note.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400 capitalize">
              {note.type}
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6 prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </div>
        </div>
      ))}
    </div>
  )
}
