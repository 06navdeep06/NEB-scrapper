import { pastPapers } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Eye, Download } from 'lucide-react'

const resolveDrive = (url: string) => {
  const m = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (m && m[1]) return `https://drive.google.com/uc?export=download&id=${m[1]}`
  return null
}

const findPdfLink = async (url: string) => {
  if (url.toLowerCase().includes('.pdf')) return url
  const driveDirect = resolveDrive(url)
  if (driveDirect) return driveDirect
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const html = await res.text()
    const pdfMatch = html.match(/href="([^"]+\.pdf[^"]*)"/i) || html.match(/href='([^']+\.pdf[^']*)'/i)
    if (pdfMatch && pdfMatch[1]) return pdfMatch[1]
    const driveMatch = html.match(/href="https?:\/\/drive\.google\.com\/file\/d\/([^/]+)\/[^"]*"/i)
    if (driveMatch && driveMatch[1]) return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`
  } catch {}
  return null
}

export default async function PastPaperViewerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const paper = pastPapers.find(p => p.id === id)
  if (!paper) notFound()

  const pdfLink = await findPdfLink(paper.pdfUrl)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{paper.title}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{paper.year}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={pdfLink || paper.pdfUrl}
            className="inline-flex items-center px-3 py-1.5 border border-slate-300 dark:border-slate-600 shadow-sm text-xs font-medium rounded text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
            target="_blank"
          >
            <Eye className="h-4 w-4 mr-1" /> Open Source
          </Link>
          <a
            href={pdfLink || paper.pdfUrl}
            download
            className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-4 w-4 mr-1" /> Download
          </a>
        </div>
      </div>
      {pdfLink ? (
        <object
          data={pdfLink}
          type="application/pdf"
          className="w-full h-[80vh] border border-slate-200 dark:border-slate-700 rounded-lg"
        >
          <iframe src={pdfLink} className="w-full h-[80vh]" />
        </object>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
          <p className="text-slate-700 dark:text-slate-300">
            Unable to resolve a direct PDF link. Use Open Source to view on the provider site.
          </p>
        </div>
      )}
    </div>
  )
}
