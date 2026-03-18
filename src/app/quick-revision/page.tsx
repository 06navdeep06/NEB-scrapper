import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'

const physicsFormulas = [
  { topic: 'Kinematics', formulas: [
    { name: 'Velocity', expr: 'v = u + at' },
    { name: 'Displacement', expr: 's = ut + ½at²' },
    { name: 'Final velocity²', expr: 'v² = u² + 2as' },
    { name: 'Projectile Range', expr: 'R = u²sin2θ / g' },
    { name: 'Max Height', expr: 'H = u²sin²θ / 2g' },
    { name: 'Time of Flight', expr: 'T = 2u sinθ / g' },
  ]},
  { topic: 'Forces & Motion', formulas: [
    { name: 'Newton\'s 2nd Law', expr: 'F = ma' },
    { name: 'Weight', expr: 'W = mg' },
    { name: 'Friction (kinetic)', expr: 'f = μₖN' },
    { name: 'Centripetal acc.', expr: 'a = v²/r = ω²r' },
    { name: 'Centripetal force', expr: 'F = mv²/r' },
    { name: 'Momentum', expr: 'p = mv' },
  ]},
  { topic: 'Work, Energy & Power', formulas: [
    { name: 'Work', expr: 'W = F·s·cosθ' },
    { name: 'KE', expr: 'KE = ½mv²' },
    { name: 'GPE', expr: 'PE = mgh' },
    { name: 'Power', expr: 'P = W/t = Fv' },
    { name: 'Efficiency', expr: 'η = (useful output / input) × 100%' },
  ]},
  { topic: 'Thermodynamics', formulas: [
    { name: 'Heat (calorimetry)', expr: 'Q = mcΔT' },
    { name: 'Latent heat', expr: 'Q = mL' },
    { name: 'Charles\' Law', expr: 'V₁/T₁ = V₂/T₂' },
    { name: 'Boyle\'s Law', expr: 'P₁V₁ = P₂V₂' },
    { name: 'Ideal Gas', expr: 'PV = nRT' },
    { name: 'Thermal expansion', expr: 'ΔL = L₀αΔT' },
  ]},
  { topic: 'Optics', formulas: [
    { name: 'Lens formula', expr: '1/f = 1/v − 1/u' },
    { name: 'Magnification', expr: 'm = v/u = h\'/h' },
    { name: 'Snell\'s law', expr: 'n₁sinθ₁ = n₂sinθ₂' },
    { name: 'YDSE fringe width', expr: 'β = λD/d' },
    { name: 'Brewster\'s law', expr: 'μ = tan(iₚ)' },
    { name: 'Malus law', expr: 'I = I₀cos²θ' },
  ]},
  { topic: 'Electricity', formulas: [
    { name: 'Ohm\'s law', expr: 'V = IR' },
    { name: 'Resistance (series)', expr: 'R = R₁ + R₂ + ...' },
    { name: 'Resistance (parallel)', expr: '1/R = 1/R₁ + 1/R₂ + ...' },
    { name: 'Electric power', expr: 'P = VI = I²R = V²/R' },
    { name: 'Potentiometer', expr: 'E₁/E₂ = l₁/l₂' },
    { name: 'Bohr energy', expr: 'Eₙ = −13.6/n² eV' },
  ]},
]

const mathFormulas = [
  { topic: 'Calculus — Derivatives', formulas: [
    { name: 'd/dx(xⁿ)', expr: 'nxⁿ⁻¹' },
    { name: 'd/dx(eˣ)', expr: 'eˣ' },
    { name: 'd/dx(ln x)', expr: '1/x' },
    { name: 'd/dx(sin x)', expr: 'cos x' },
    { name: 'd/dx(cos x)', expr: '−sin x' },
    { name: 'Chain rule', expr: 'dy/dx = (dy/du)(du/dx)' },
  ]},
  { topic: 'Calculus — Integration', formulas: [
    { name: '∫xⁿ dx', expr: 'xⁿ⁺¹/(n+1) + C' },
    { name: '∫eˣ dx', expr: 'eˣ + C' },
    { name: '∫sin x dx', expr: '−cos x + C' },
    { name: '∫cos x dx', expr: 'sin x + C' },
    { name: '∫1/x dx', expr: 'ln|x| + C' },
    { name: '∫by parts', expr: '∫u dv = uv − ∫v du' },
  ]},
  { topic: 'Algebra & Series', formulas: [
    { name: 'AP nth term', expr: 'Tₙ = a + (n−1)d' },
    { name: 'AP sum', expr: 'Sₙ = n/2[2a + (n−1)d]' },
    { name: 'GP nth term', expr: 'Tₙ = ar^(n−1)' },
    { name: 'GP sum', expr: 'Sₙ = a(rⁿ−1)/(r−1)' },
    { name: 'P(n,r)', expr: 'n!/(n−r)!' },
    { name: 'C(n,r)', expr: 'n!/[r!(n−r)!]' },
  ]},
  { topic: 'Trigonometry', formulas: [
    { name: 'sin²θ + cos²θ', expr: '= 1' },
    { name: '1 + tan²θ', expr: '= sec²θ' },
    { name: 'sin(A+B)', expr: 'sinA cosB + cosA sinB' },
    { name: 'cos(A+B)', expr: 'cosA cosB − sinA sinB' },
    { name: 'sin 2A', expr: '2 sinA cosA' },
    { name: 'cos 2A', expr: 'cos²A − sin²A' },
  ]},
  { topic: 'Vectors', formulas: [
    { name: 'Dot product', expr: 'A·B = |A||B|cosθ' },
    { name: 'Cross product', expr: '|A×B| = |A||B|sinθ' },
    { name: 'Magnitude', expr: '|A| = √(Aₓ²+Aᵧ²+A_z²)' },
    { name: 'Unit vector', expr: 'â = A/|A|' },
  ]},
]

const chemReactions = [
  { topic: 'Important Reactions', formulas: [
    { name: 'Williamson synthesis', expr: 'R−X + R′−ONa → R−O−R′ + NaX' },
    { name: 'Esterification', expr: 'RCOOH + R′OH → RCOOR′ + H₂O' },
    { name: 'Saponification', expr: 'RCOOR′ + NaOH → RCOONa + R′OH' },
    { name: 'Aldol condensation', expr: '2CH₃CHO → CH₃CH(OH)CH₂CHO' },
    { name: 'Cannizzaro reaction', expr: '2HCHO + NaOH → HCOONa + CH₃OH' },
    { name: 'Kolbe\'s reaction', expr: 'PhONa + CO₂ → PhOH + PhCOONa' },
  ]},
  { topic: 'Physical Chemistry Formulas', formulas: [
    { name: 'Moles', expr: 'n = mass/molar mass' },
    { name: 'Avogadro', expr: 'N = n × 6.022×10²³' },
    { name: 'pH', expr: 'pH = −log[H⁺]' },
    { name: 'Titration', expr: 'N₁V₁ = N₂V₂' },
    { name: 'Molarity', expr: 'M = moles/volume(L)' },
    { name: 'Rate law', expr: 'rate = k[A]ˣ[B]ʸ' },
  ]},
  { topic: 'Key Definitions', formulas: [
    { name: 'Oxidation', expr: 'Loss of electrons (OIL)' },
    { name: 'Reduction', expr: 'Gain of electrons (RIG)' },
    { name: 'Lewis acid', expr: 'Electron pair acceptor' },
    { name: 'Lewis base', expr: 'Electron pair donor' },
    { name: 'Electrophile', expr: 'Electron deficient species' },
    { name: 'Nucleophile', expr: 'Electron rich species' },
  ]},
]

const csDefinitions = [
  { topic: 'C Programming', formulas: [
    { name: 'printf', expr: 'printf("format", vars);' },
    { name: 'scanf', expr: 'scanf("%d", &var);' },
    { name: 'Array declaration', expr: 'int arr[10];' },
    { name: 'Pointer', expr: 'int *p = &var;' },
    { name: 'Struct', expr: 'struct Name { int x; };' },
    { name: 'fopen', expr: 'FILE *f = fopen("file","r");' },
  ]},
  { topic: 'SQL Commands', formulas: [
    { name: 'CREATE', expr: 'CREATE TABLE t (col TYPE);' },
    { name: 'INSERT', expr: 'INSERT INTO t VALUES (...);' },
    { name: 'SELECT', expr: 'SELECT col FROM t WHERE cond;' },
    { name: 'UPDATE', expr: 'UPDATE t SET col=val WHERE cond;' },
    { name: 'DELETE', expr: 'DELETE FROM t WHERE cond;' },
    { name: 'JOIN', expr: 'SELECT * FROM t1 INNER JOIN t2 ON t1.id=t2.id;' },
  ]},
  { topic: 'Boolean Algebra', formulas: [
    { name: 'AND', expr: 'A · B = 1 only if A=1 AND B=1' },
    { name: 'OR', expr: 'A + B = 0 only if A=0 AND B=0' },
    { name: 'NOT', expr: 'Ā = complement of A' },
    { name: 'De Morgan 1', expr: '(A·B)̄ = Ā + B̄' },
    { name: 'De Morgan 2', expr: '(A+B)̄ = Ā · B̄' },
    { name: 'NAND universal', expr: 'NAND can implement any gate' },
  ]},
  { topic: 'Networking Key Terms', formulas: [
    { name: 'OSI layers', expr: 'Physical, Data Link, Network, Transport, Session, Presentation, Application' },
    { name: 'TCP/IP layers', expr: 'Network Access, Internet, Transport, Application' },
    { name: 'IP address', expr: '32-bit (IPv4) or 128-bit (IPv6)' },
    { name: 'Bandwidth', expr: 'Amount of data per unit time (bps)' },
    { name: 'Protocol', expr: 'Set of rules governing communication' },
    { name: 'DNS', expr: 'Translates domain names to IP addresses' },
  ]},
]

interface FormulaCard {
  topic: string
  formulas: { name: string; expr: string }[]
}

function Section({ title, color, bg, border, dot, cards, slug }: {
  title: string; color: string; bg: string; border: string; dot: string
  cards: FormulaCard[]; slug: string
}) {
  return (
    <div className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${dot}`} />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{title}</h2>
        </div>
        <Link href={`/subjects/${slug}`} className={`text-sm font-semibold ${color} hover:underline flex items-center gap-1`}>
          Full notes <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.topic} className={`rounded-2xl border ${border} ${bg} p-5`}>
            <h3 className={`font-bold text-sm mb-3 ${color}`}>{card.topic}</h3>
            <div className="space-y-2">
              {card.formulas.map((f) => (
                <div key={f.name} className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 min-w-[90px] pt-0.5 flex-shrink-0">{f.name}</span>
                  <code className="text-xs bg-white/70 dark:bg-slate-800/60 rounded px-2 py-0.5 font-mono text-slate-800 dark:text-slate-200 flex-1">{f.expr}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function QuickRevisionPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950/60 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Quick Reference</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            Quick Revision Sheets
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            All critical formulas, key reactions, and important definitions — organized by subject.
            Perfect for last-minute exam revision.
          </p>
        </div>

        {/* Jump links */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['Physics', 'Mathematics', 'Chemistry', 'Computer Science'].map((s) => (
            <a key={s} href={`#${s.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {s}
            </a>
          ))}
        </div>

        <div id="physics">
          <Section
            title="Physics Formulas"
            color="text-blue-600 dark:text-blue-400"
            bg="bg-blue-50/60 dark:bg-blue-950/20"
            border="border-blue-200 dark:border-blue-900"
            dot="bg-blue-500"
            cards={physicsFormulas}
            slug="physics"
          />
        </div>

        <div id="mathematics">
          <Section
            title="Mathematics Formulas"
            color="text-violet-600 dark:text-violet-400"
            bg="bg-violet-50/60 dark:bg-violet-950/20"
            border="border-violet-200 dark:border-violet-900"
            dot="bg-violet-500"
            cards={mathFormulas}
            slug="mathematics"
          />
        </div>

        <div id="chemistry">
          <Section
            title="Chemistry Reactions & Formulas"
            color="text-emerald-600 dark:text-emerald-400"
            bg="bg-emerald-50/60 dark:bg-emerald-950/20"
            border="border-emerald-200 dark:border-emerald-900"
            dot="bg-emerald-500"
            cards={chemReactions}
            slug="chemistry"
          />
        </div>

        <div id="computer-science">
          <Section
            title="Computer Science Reference"
            color="text-orange-600 dark:text-orange-400"
            bg="bg-orange-50/60 dark:bg-orange-950/20"
            border="border-orange-200 dark:border-orange-900"
            dot="bg-orange-500"
            cards={csDefinitions}
            slug="computer-science"
          />
        </div>

      </div>
    </div>
  )
}
