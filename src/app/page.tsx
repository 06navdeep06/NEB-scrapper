import Link from 'next/link'
import { subjects } from '@/lib/data'
import {
  ArrowRight, BookOpen, FileText, ClipboardList, Zap,
  CheckCircle2, Star, TrendingUp, Award
} from 'lucide-react'
import SubjectBrowser from '@/components/SubjectBrowser'

const features = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400',
    title: 'Chapter-wise Notes',
    desc: 'Detailed theory, derivations, diagrams — all written for NEB exam pattern. Read online, no download needed.',
    href: '/subjects',
    cta: 'Read Notes',
    ctaColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    title: 'Quick Revision',
    desc: 'Formula sheets, key reactions, important definitions — designed for last-minute revision before exams.',
    href: '/quick-revision',
    cta: 'Revise Now',
    ctaColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    title: 'Past NEB Papers',
    desc: '8 years of board exam papers (2075–2082 BS). Filter by subject and year. With solutions where available.',
    href: '/past-papers',
    cta: 'Browse Papers',
    ctaColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    color: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400',
    title: 'Mock Tests',
    desc: 'Timed tests matching NEB exam format. Auto-scoring with instant results. Track your weak areas.',
    href: '/mock-test',
    cta: 'Start Test',
    ctaColor: 'text-violet-600 dark:text-violet-400',
  },
]

const stats = [
  { value: '500+', label: 'Study Notes', icon: <BookOpen className="h-4 w-4" /> },
  { value: '7',    label: 'Subjects',    icon: <Star className="h-4 w-4" /> },
  { value: '8yrs', label: 'Past Papers', icon: <FileText className="h-4 w-4" /> },
  { value: '100%', label: 'Free',        icon: <CheckCircle2 className="h-4 w-4" /> },
]

const highlights = [
  'NEB Syllabus aligned — Grade 11 & 12',
  'Physics, Chemistry, Math, CS, Biology, English & Nepali',
  'Formula sheets for every chapter',
  'Past board papers (2075–2082 BS)',
  'Timed mock tests with instant scoring',
  'Works on mobile — study anywhere',
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-4">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-white/50 to-white dark:from-slate-950/0 dark:via-slate-950/50 dark:to-slate-950" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-full text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            Nepal's Free NEB Science Study Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5 animate-fade-up leading-tight">
            Everything you need to{' '}
            <span className="gradient-text">ace NEB +2</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 animate-fade-up leading-relaxed">
            Notes, formula sheets, past papers, and mock tests — for all 7 NEB Science subjects.
            Completely free. No login required.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 animate-fade-up">
            <Link
              href="/subjects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-300 dark:hover:shadow-indigo-900 hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              Start Studying <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/quick-revision"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:-translate-y-0.5 transition-all duration-200 text-sm shadow-sm"
            >
              <Zap className="h-4 w-4 text-amber-500" /> Quick Revision
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-up">
            {stats.map((s) => (
              <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-indigo-500 mb-1">
                  {s.icon}
                </div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Everything in one place
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">No need to visit multiple websites. All NEB resources, here.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md transition-all duration-200 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{f.desc}</p>
                <Link href={f.href} className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${f.ctaColor} group-hover:gap-2 transition-all`}>
                  {f.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subject Browser (Class / Faculty selector) ── */}
      <SubjectBrowser subjects={subjects} />

      {/* ── Why this platform ── */}
      <section className="py-16 px-4 bg-gradient-to-br from-indigo-600 to-violet-700">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Designed specifically for NEB students
              </h2>
              <p className="text-indigo-200 text-base leading-relaxed mb-6">
                Every note, formula, and test is aligned with the NEB CDC syllabus.
                No irrelevant content — just what you need to score well.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-300 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-indigo-100">{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <TrendingUp className="h-5 w-5" />, title: 'Score Higher', desc: 'Practice with actual NEB exam patterns' },
                { icon: <Zap className="h-5 w-5" />, title: 'Study Smart', desc: 'Formula sheets for last-minute revision' },
                { icon: <ClipboardList className="h-5 w-5" />, title: 'Test Yourself', desc: 'Timed mock exams with instant results' },
                { icon: <Award className="h-5 w-5" />, title: 'Free Forever', desc: 'No subscription, no hidden cost' },
              ].map((c) => (
                <div key={c.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white mb-3">
                    {c.icon}
                  </div>
                  <div className="font-bold text-white text-sm mb-1">{c.title}</div>
                  <div className="text-xs text-indigo-200">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Ready to start studying?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Pick a subject and start reading notes right now — no sign-up needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/subjects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all text-sm"
            >
              <BookOpen className="h-4 w-4" /> Browse All Subjects
            </Link>
            <Link
              href="/mock-test"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:-translate-y-0.5 transition-all text-sm shadow-sm"
            >
              <ClipboardList className="h-4 w-4" /> Take Mock Test
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
