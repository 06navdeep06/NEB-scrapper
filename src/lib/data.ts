
import { Subject, Chapter, PastPaper, Note, MockTest, Question } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'phy',
    name: 'Physics',
    slug: 'physics',
    icon: 'atom',
    description: 'Mechanics, Thermodynamics, Electricity & Magnetism, and Modern Physics.',
    totalChapters: 11,
  },
  {
    id: 'chem',
    name: 'Chemistry',
    slug: 'chemistry',
    icon: 'flask',
    description: 'Physical, Organic, and Inorganic Chemistry concepts and reactions.',
    totalChapters: 9,
  },
  {
    id: 'bio',
    name: 'Biology',
    slug: 'biology',
    icon: 'microscope',
    description: 'Botany and Zoology: Cell biology, Genetics, Ecology, and Human Physiology.',
    totalChapters: 6,
  },
  {
    id: 'math',
    name: 'Mathematics',
    slug: 'mathematics',
    icon: 'calculator',
    description: 'Calculus, Algebra, Coordinate Geometry, and Vectors.',
    totalChapters: 8,
  },
  {
    id: 'cs',
    name: 'Computer Science',
    slug: 'computer-science',
    icon: 'monitor',
    description: 'C Programming, Web Technology (HTML/CSS), Database (SQL), and Python.',
    totalChapters: 8,
  },
  {
    id: 'eng',
    name: 'English',
    slug: 'english',
    icon: 'book',
    description: 'Language Development and Literature (Grade 11 & 12).',
    totalChapters: 24,
  },
  {
    id: 'nep',
    name: 'Nepali',
    slug: 'nepali',
    icon: 'book',
    description: 'Compulsory Nepali chapters and exercises (Grade 11 & 12).',
    totalChapters: 24,
  },
];

export const mockTests: MockTest[] = [
  {
    id: 'test-phy-2080-model',
    chapterId: 'phy-12-1',
    title: 'NEB Grade 12 Physics Model Exam 2080 (Full Syllabus)',
    durationMinutes: 60,
    totalMarks: 75,
    difficulty: 'hard',
  },
  {
    id: 'test-chem-2080-model',
    chapterId: 'chem-12-1',
    title: 'NEB Grade 12 Chemistry Model Exam 2080 (Full Syllabus)',
    durationMinutes: 60,
    totalMarks: 75,
    difficulty: 'hard',
  },
  {
    id: 'test-bio-1',
    chapterId: 'bio-12-2',
    title: 'Genetics & Molecular Biology Quiz',
    durationMinutes: 20,
    totalMarks: 20,
    difficulty: 'medium',
  },
  {
    id: 'test-math-1',
    chapterId: 'math-12-2',
    title: 'Calculus: Derivatives & Integrals',
    durationMinutes: 30,
    totalMarks: 30,
    difficulty: 'hard',
  },
];

export const chapters: Chapter[] = [
  // Physics - Grade 11
  { id: 'phy-11-1', subjectId: 'phy', number: 1, title: 'Units and Measurement', description: 'Fundamental and derived units, dimensions, and error analysis.', estimatedHours: 4, grade: 11 },
  { id: 'phy-11-2', subjectId: 'phy', number: 2, title: 'Vectors and Scalars', description: 'Vector addition, subtraction, dot and cross products.', estimatedHours: 6, grade: 11 },
  { id: 'phy-11-3', subjectId: 'phy', number: 3, title: 'Kinematics', description: 'Motion in one and two dimensions, projectile motion.', estimatedHours: 8, grade: 11 },
  { id: 'phy-11-4', subjectId: 'phy', number: 4, title: 'Laws of Motion', description: 'Newtons laws, friction, and circular motion.', estimatedHours: 8, grade: 11 },
  { id: 'phy-11-5', subjectId: 'phy', number: 5, title: 'Work, Energy and Power', description: 'Work done by constant and variable forces, kinetic and potential energy.', estimatedHours: 7, grade: 11 },
  { id: 'phy-11-6', subjectId: 'phy', number: 6, title: 'Heat and Thermodynamics', description: 'Heat transfer, thermal expansion, ideal gas laws, and calorimetry.', estimatedHours: 10, grade: 11 },
  { id: 'phy-11-7', subjectId: 'phy', number: 7, title: 'Optics', description: 'Reflection, refraction, lenses, and optical instruments.', estimatedHours: 10, grade: 11 },
  { id: 'phy-11-8', subjectId: 'phy', number: 8, title: 'Electricity and Magnetism', description: 'Electrostatics, capacitors, and DC circuits.', estimatedHours: 12, grade: 11 },
  
  // Physics - Grade 12
  { id: 'phy-12-1', subjectId: 'phy', number: 6, title: 'Wave Optics', description: 'Interference, Diffraction, Polarization of light.', estimatedHours: 10, grade: 12 },
  { id: 'phy-12-2', subjectId: 'phy', number: 7, title: 'Current Electricity', description: 'Ohm’s law, Kirchhoff’s laws, Potentiometer.', estimatedHours: 12, grade: 12 },
  { id: 'phy-12-3', subjectId: 'phy', number: 8, title: 'Modern Physics', description: 'Photoelectric effect, Bohr’s model, X-rays.', estimatedHours: 10, grade: 12 },
  { id: 'phy-12-4', subjectId: 'phy', number: 9, title: 'Mechanics (Rotational & Fluids)', description: 'Rotational dynamics, SHM, fluid statics, viscosity, surface tension.', estimatedHours: 12, grade: 12 },
  { id: 'phy-12-5', subjectId: 'phy', number: 10, title: 'Thermodynamics', description: 'First and Second laws, heat engines, entropy.', estimatedHours: 8, grade: 12 },
  { id: 'phy-12-6', subjectId: 'phy', number: 11, title: 'Magnetic Effects of Current', description: 'Biot-Savart law, Ampere’s law, moving charges.', estimatedHours: 10, grade: 12 },

  // Chemistry - Grade 11
  { id: 'chem-11-1', subjectId: 'chem', number: 1, title: 'Stoichiometry', description: 'Mole concept, chemical equations, and calculations.', estimatedHours: 6, grade: 11 },
  { id: 'chem-11-2', subjectId: 'chem', number: 2, title: 'Atomic Structure', description: 'Bohr model, quantum numbers, and electronic configuration.', estimatedHours: 8, grade: 11 },
  { id: 'chem-11-3', subjectId: 'chem', number: 3, title: 'Chemical Bonding', description: 'Ionic, covalent, and coordinate bonds, VSEPR theory.', estimatedHours: 10, grade: 11 },
  { id: 'chem-11-4', subjectId: 'chem', number: 4, title: 'States of Matter', description: 'Gaseous state, liquid state, and solid state properties.', estimatedHours: 8, grade: 11 },
  { id: 'chem-11-5', subjectId: 'chem', number: 5, title: 'Chemical Equilibrium', description: 'Reversible reactions, Le Chateliers principle, and equilibrium constant.', estimatedHours: 8, grade: 11 },
  { id: 'chem-11-6', subjectId: 'chem', number: 6, title: 'Organic Chemistry I', description: 'IUPAC naming, Isomerism, Hydrocarbons (Alkanes, Alkenes, Alkynes).', estimatedHours: 12, grade: 11 },
  { id: 'chem-11-7', subjectId: 'chem', number: 7, title: 'Applied Chemistry', description: 'Modern chemical industries and environmental chemistry.', estimatedHours: 6, grade: 11 },
  
  // Chemistry - Grade 12
  { id: 'chem-12-1', subjectId: 'chem', number: 5, title: 'Volumetric Analysis', description: 'Titration, acid-base reactions, redox titration.', estimatedHours: 8, grade: 12 },
  { id: 'chem-12-2', subjectId: 'chem', number: 6, title: 'Organic Chemistry II', description: 'Haloalkanes, Alcohols, Phenols, Ethers.', estimatedHours: 15, grade: 12 },
  { id: 'chem-12-3', subjectId: 'chem', number: 7, title: 'Transition Metals', description: 'Properties of d-block elements, coordination compounds.', estimatedHours: 8, grade: 12 },
  { id: 'chem-12-4', subjectId: 'chem', number: 8, title: 'Heavy Metals', description: 'Extraction and properties of Fe, Cu, Zn, Hg, Ag.', estimatedHours: 10, grade: 12 },
  { id: 'chem-12-5', subjectId: 'chem', number: 9, title: 'Biochemistry', description: 'Carbohydrates, proteins, lipids, nucleic acids.', estimatedHours: 6, grade: 12 },

  // Biology - Grade 11
  { id: 'bio-11-1', subjectId: 'bio', number: 1, title: 'Cell Biology', description: 'Structure and function of cell organelles, cell division.', estimatedHours: 8, grade: 11 },
  { id: 'bio-11-2', subjectId: 'bio', number: 2, title: 'Genetics', description: 'Mendelian genetics, DNA structure, and replication.', estimatedHours: 10, grade: 11 },
  { id: 'bio-11-3', subjectId: 'bio', number: 3, title: 'Biodiversity', description: 'Five kingdom classification, Monera, Protista, Fungi, Plantae, Animalia.', estimatedHours: 12, grade: 11 },
  { id: 'bio-11-4', subjectId: 'bio', number: 4, title: 'Biota and Environment', description: 'Ecology, ecosystem dynamics, and conservation.', estimatedHours: 8, grade: 11 },

  // Biology - Grade 12
  { id: 'bio-12-1', subjectId: 'bio', number: 3, title: 'Human Physiology', description: 'Digestion, respiration, circulation, and excretion systems.', estimatedHours: 15, grade: 12 },
  { id: 'bio-12-2', subjectId: 'bio', number: 4, title: 'Genetics and Evolution', description: 'Molecular basis of inheritance, Evolution theories.', estimatedHours: 12, grade: 12 },
  { id: 'bio-12-3', subjectId: 'bio', number: 5, title: 'Plant Physiology', description: 'Water relations, photosynthesis, respiration, hormones.', estimatedHours: 10, grade: 12 },
  { id: 'bio-12-4', subjectId: 'bio', number: 6, title: 'Applied Biology', description: 'Biotechnology, tissue culture, and economic biology.', estimatedHours: 8, grade: 12 },

  // Math - Grade 11
  { id: 'math-11-1', subjectId: 'math', number: 1, title: 'Sequence and Series', description: 'AP, GP, HP, and special series.', estimatedHours: 6, grade: 11 },
  { id: 'math-11-2', subjectId: 'math', number: 2, title: 'Matrices and Determinants', description: 'Properties, inverse, and system of linear equations.', estimatedHours: 8, grade: 11 },
  { id: 'math-11-3', subjectId: 'math', number: 3, title: 'Calculus: Limits and Continuity', description: 'Concept of limits, continuity, and derivatives.', estimatedHours: 12, grade: 11 },

  // Math - Grade 12
  { id: 'math-12-1', subjectId: 'math', number: 4, title: 'Permutation and Combination', description: 'Counting principles, binomial theorem.', estimatedHours: 8, grade: 12 },
  { id: 'math-12-2', subjectId: 'math', number: 5, title: 'Integrals', description: 'Definite and indefinite integrals, applications.', estimatedHours: 15, grade: 12 },
  { id: 'math-12-3', subjectId: 'math', number: 6, title: 'Complex Numbers', description: 'De Moivre’s theorem, roots of unity.', estimatedHours: 6, grade: 12 },
  { id: 'math-12-4', subjectId: 'math', number: 7, title: 'Vectors', description: 'Scalar and vector products, triple products.', estimatedHours: 8, grade: 12 },
  { id: 'math-12-5', subjectId: 'math', number: 8, title: 'Statistics', description: 'Correlation, regression, probability.', estimatedHours: 8, grade: 12 },

  // CS - Grade 11
  { id: 'cs-11-1', subjectId: 'cs', number: 1, title: 'Computer System Architecture', description: 'Logic gates, boolean algebra, and CPU architecture.', estimatedHours: 6, grade: 11 },
  { id: 'cs-11-2', subjectId: 'cs', number: 2, title: 'Web Technology I', description: 'Introduction to HTML, CSS basics.', estimatedHours: 8, grade: 11 },
  { id: 'cs-11-3', subjectId: 'cs', number: 3, title: 'Programming in C', description: 'Flowcharts, Algorithms, C syntax, Control structures.', estimatedHours: 12, grade: 11 },

  // CS - Grade 12
  { id: 'cs-12-1', subjectId: 'cs', number: 4, title: 'Database Management System (SQL)', description: 'DBMS concepts, normalization, and SQL queries.', estimatedHours: 10, grade: 12 },
  { id: 'cs-12-2', subjectId: 'cs', number: 5, title: 'Web Technology II', description: 'PHP, JavaScript basics.', estimatedHours: 10, grade: 12 },
  { id: 'cs-12-3', subjectId: 'cs', number: 6, title: 'Programming in C (Advanced)', description: 'Pointers, Structures, File Handling.', estimatedHours: 12, grade: 12 },
  { id: 'cs-12-4', subjectId: 'cs', number: 7, title: 'Networking', description: 'OSI model, TCP/IP, topologies, security.', estimatedHours: 8, grade: 12 },
  { id: 'cs-12-5', subjectId: 'cs', number: 8, title: 'Software Process Model', description: 'SDLC, Waterfall, Agile models.', estimatedHours: 6, grade: 12 },
  
  // English - Grade 11 (Language Development Units 1–20)
  { id: 'eng-11-1', subjectId: 'eng', number: 1, title: 'Education and Humanity', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-2', subjectId: 'eng', number: 2, title: 'Communication', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-3', subjectId: 'eng', number: 3, title: 'Media and Society', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-4', subjectId: 'eng', number: 4, title: 'History and Culture', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-5', subjectId: 'eng', number: 5, title: 'Life and Love', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-6', subjectId: 'eng', number: 6, title: 'Health and Exercise', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-7', subjectId: 'eng', number: 7, title: 'Ecology and Development', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-8', subjectId: 'eng', number: 8, title: 'Humour and Satire', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-9', subjectId: 'eng', number: 9, title: 'Democracy and Human Rights', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-10', subjectId: 'eng', number: 10, title: 'Home Life and Family Relationship', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-11', subjectId: 'eng', number: 11, title: 'Arts and Creations', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-12', subjectId: 'eng', number: 12, title: 'Fantasy', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-13', subjectId: 'eng', number: 13, title: 'Career and Entrepreneurship', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-14', subjectId: 'eng', number: 14, title: 'Power and Politics', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-15', subjectId: 'eng', number: 15, title: 'War and Peace', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-16', subjectId: 'eng', number: 16, title: 'Critical Thinking', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-17', subjectId: 'eng', number: 17, title: 'Globalisation and Diaspora', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-18', subjectId: 'eng', number: 18, title: 'Immigration and Identity', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-19', subjectId: 'eng', number: 19, title: 'Travel and Tourism', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  { id: 'eng-11-20', subjectId: 'eng', number: 20, title: 'Science and Technology', description: 'Language Development unit exercises and summary.', estimatedHours: 4, grade: 11 },
  // English - Grade 11 Literature (category chapters)
  { id: 'eng-11-lit-ss', subjectId: 'eng', number: 21, title: 'Short Stories (Overview)', description: '7 stories: The Selfish Giant, The Oval Portrait, etc.', estimatedHours: 6, grade: 11 },
  { id: 'eng-11-lit-poems', subjectId: 'eng', number: 22, title: 'Poems (Overview)', description: '5 poems: Corona Says, A Red, Red Rose, etc.', estimatedHours: 5, grade: 11 },
  { id: 'eng-11-lit-essays', subjectId: 'eng', number: 23, title: 'Essays (Overview)', description: '5 essays: Sharing Tradition, How to Live Before You Die, etc.', estimatedHours: 6, grade: 11 },
  { id: 'eng-11-lit-plays', subjectId: 'eng', number: 24, title: 'One Act Plays (Overview)', description: '3 plays: Trifles, A Sunny Morning, Refund.', estimatedHours: 5, grade: 11 },
  // Nepali - Grade 11 (12 chapters)
  { id: 'nep-11-1', subjectId: 'nep', number: 1, title: 'वीर पुर्खा (कविता)', description: 'कविता — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-2', subjectId: 'nep', number: 2, title: 'गाउँको माया (सामाजिक कथा)', description: 'कथा — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-3', subjectId: 'nep', number: 3, title: 'संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध)', description: 'निबन्ध — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-4', subjectId: 'nep', number: 4, title: 'योगमाया (राष्ट्रिय जीवनी)', description: 'जीवनी — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-5', subjectId: 'nep', number: 5, title: 'साथीलाई चिठी (चिठी)', description: 'चिठी — अभ्यास र सार', estimatedHours: 3, grade: 11 },
  { id: 'nep-11-6', subjectId: 'nep', number: 6, title: 'त्यो फेरि फर्कला ? (मनोवैज्ञानिक कथा)', description: 'कथा — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-7', subjectId: 'nep', number: 7, title: 'पर्यापर्यटनका सम्भावना र आयाम (वस्तुपरक निबन्ध)', description: 'निबन्ध — अभ्यास र सार', estimatedHours: 6, grade: 11 },
  { id: 'nep-11-8', subjectId: 'nep', number: 8, title: 'लौ आयो ताजा खबर (लघु नाटक)', description: 'नाटक — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-9', subjectId: 'nep', number: 9, title: 'सफलताको कथा (रिपोर्ताजमूलक रचना)', description: 'रिपोर्टाज — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-10', subjectId: 'nep', number: 10, title: 'कृषिशालामा एक दिन (संवाद)', description: 'संवाद — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-11', subjectId: 'nep', number: 11, title: 'रारा भ्रमण (दैनिकी)', description: 'दैनिकी — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  { id: 'nep-11-12', subjectId: 'nep', number: 12, title: 'जलस्रोत र ऊर्जा (वक्तृता)', description: 'वक्तृता — अभ्यास र सार', estimatedHours: 4, grade: 11 },
  // Nepali - Grade 12 (12 chapters)
  { id: 'nep-12-1', subjectId: 'nep', number: 13, title: 'आमाको सपना', description: 'कविता/रचना — अभ्यास र सार', estimatedHours: 4, grade: 12 },
  { id: 'nep-12-2', subjectId: 'nep', number: 14, title: 'विरहिणी दमयन्ती', description: 'महाभारत पात्र — अभ्यास र सार', estimatedHours: 4, grade: 12 },
  { id: 'nep-12-3', subjectId: 'nep', number: 15, title: 'घनघस्याको उकालो काट्ता', description: 'कथा/रचना — अभ्यास र सार', estimatedHours: 4, grade: 12 },
  { id: 'nep-12-4', subjectId: 'nep', number: 16, title: 'व्यावसायिक पत्र', description: 'पत्र — अभ्यास र सार', estimatedHours: 3, grade: 12 },
  { id: 'nep-12-5', subjectId: 'nep', number: 17, title: 'एक चिहान', description: 'कथा — अभ्यास र सार', estimatedHours: 4, grade: 12 },
  { id: 'nep-12-6', subjectId: 'nep', number: 18, title: 'स्टिफन विलियम हकिङ', description: 'व्यक्तित्व — अभ्यास र सार', estimatedHours: 3, grade: 12 },
  { id: 'nep-12-7', subjectId: 'nep', number: 19, title: 'हामीलाई बोलाउँछन् हिमचुली', description: 'रचना — अभ्यास र सार', estimatedHours: 4, grade: 12 },
  { id: 'nep-12-8', subjectId: 'nep', number: 20, title: 'मातृत्व', description: 'रचना — अभ्यास र सार', estimatedHours: 4, grade: 12 },
  { id: 'nep-12-9', subjectId: 'nep', number: 21, title: 'गोर्खे', description: 'रचना — अभ्यास र सार', estimatedHours: 4, grade: 12 },
  { id: 'nep-12-10', subjectId: 'nep', number: 22, title: 'नेपाली पहिचान', description: 'रचना — अभ्यास र सार', estimatedHours: 4, grade: 12 },
  { id: 'nep-12-11', subjectId: 'nep', number: 23, title: 'सहकारी', description: 'रचना — अभ्यास र सार', estimatedHours: 3, grade: 12 },
  { id: 'nep-12-12', subjectId: 'nep', number: 24, title: 'जीवन मार्ग', description: 'रचना — अभ्यास र सार', estimatedHours: 4, grade: 12 },
];

export const notes: Note[] = [
  {
    id: 'note-phy-11-1',
    chapterId: 'phy-11-1',
    type: 'theory',
    title: 'Introduction to Units',
    content: 'Physical quantities are classified into fundamental and derived quantities. The SI system is the standard used globally. Fundamental units include Meter (m), Kilogram (kg), Second (s), Ampere (A), Kelvin (K), Mole (mol), and Candela (cd).',
  },
  {
    id: 'note-phy-11-2',
    chapterId: 'phy-11-1',
    type: 'formula',
    title: 'Dimensional Analysis Formulas',
    content: '<ul><li>Dimension of Force = [MLT^-2]</li><li>Dimension of Energy = [ML^2T^-2]</li><li>Dimension of Power = [ML^2T^-3]</li><li>Dimension of Pressure = [ML^-1T^-2]</li></ul>',
  },
  {
    id: 'note-chem-11-1',
    chapterId: 'chem-11-1',
    type: 'theory',
    title: 'The Mole Concept',
    content: 'One mole contains 6.022 x 10^23 particles. This number is known as Avogadros constant. Molar mass is the mass of one mole of a substance in grams.',
  },
  {
    id: 'note-cs-11-3-1',
    chapterId: 'cs-11-3',
    type: 'theory',
    title: 'Introduction to C',
    content: 'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system. It was developed by Dennis Ritchie at Bell Labs.',
  },
  {
    id: 'note-cs-11-3-2',
    chapterId: 'cs-11-3',
    type: 'theory',
    title: 'Control Structures',
    content: 'Control structures in C include: <ul><li><strong>if-else</strong>: Conditional execution</li><li><strong>switch</strong>: Multi-way branching</li><li><strong>loops</strong>: for, while, do-while</li></ul>',
  },
  {
    id: 'note-cs-11-2-1',
    chapterId: 'cs-11-2',
    type: 'theory',
    title: 'HTML Structure',
    content: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. Key tags include &lt;html&gt;, &lt;head&gt;, &lt;body&gt;, &lt;div&gt;, &lt;span&gt;.',
  },
  {
    id: 'note-cs-12-1-1',
    chapterId: 'cs-12-1',
    type: 'theory',
    title: 'SQL Commands',
    content: 'SQL commands are grouped into: <ul><li><strong>DDL</strong>: CREATE, ALTER, DROP</li><li><strong>DML</strong>: SELECT, INSERT, UPDATE, DELETE</li><li><strong>DCL</strong>: GRANT, REVOKE</li></ul>',
  },
  {
    id: 'note-phy-11-2-1',
    chapterId: 'phy-11-2',
    type: 'theory',
    title: 'Scalars and Vectors',
    content: '<p>Scalars have magnitude only (e.g., mass, temperature). Vectors have magnitude and direction (e.g., displacement, velocity, force). A vector is represented graphically by an arrow; its length denotes magnitude and its orientation denotes direction.</p><p>Vector addition follows the parallelogram or triangle law. Resultant R of A and B: <em>R = A + B</em>. Subtraction uses <em>A − B = A + (−B)</em>.</p><p>Dot product: <em>A · B = |A||B|cosθ</em>. Cross product: <em>A × B = |A||B|sinθ n̂</em>.</p>',
  },
  {
    id: 'note-phy-11-2-2',
    chapterId: 'phy-11-2',
    type: 'formula',
    title: 'Vector Identities',
    content: '<ul><li>Unit vector: <em>â = A/|A|</em></li><li>Magnitude of cross product: <em>|A × B| = |A||B|sinθ</em></li><li>Scalar projection: <em>comp<sub>B</sub>(A) = (A · B)/|B|</em></li><li>Vector projection: <em>proj<sub>B</sub>(A) = ((A · B)/|B|^2) B</em></li></ul>',
  },
  {
    id: 'note-phy-11-3-1',
    chapterId: 'phy-11-3',
    type: 'theory',
    title: 'Kinematics Basics',
    content: '<p>Kinematics describes motion without considering causes. Key quantities: displacement, velocity, and acceleration.</p><p>For uniform acceleration in one dimension, motion is described by the equations of motion. Projectile motion decomposes into independent horizontal and vertical components.</p>',
  },
  {
    id: 'note-phy-11-3-2',
    chapterId: 'phy-11-3',
    type: 'formula',
    title: 'Equations of Motion',
    content: '<ul><li><em>v = u + at</em></li><li><em>s = ut + ½at^2</em></li><li><em>v^2 = u^2 + 2as</em></li><li>Projectile time of flight: <em>T = (2u sinθ)/g</em></li><li>Range: <em>R = (u^2 sin2θ)/g</em></li></ul>',
  },
  {
    id: 'note-chem-11-2-1',
    chapterId: 'chem-11-2',
    type: 'theory',
    title: 'Quantum Numbers',
    content: '<p>Each electron in an atom is described by four quantum numbers: n (principal), l (azimuthal), m<sub>l</sub> (magnetic), and m<sub>s</sub> (spin). They define energy level, subshell shape, orientation, and spin.</p><p>Pauli exclusion states no two electrons can have the same set of four quantum numbers. Hund’s rule favors maximum multiplicity in degenerate orbitals.</p>',
  },
  {
    id: 'note-math-11-1-1',
    chapterId: 'math-11-1',
    type: 'theory',
    title: 'Arithmetic Progression',
    content: '<p>An AP has a constant difference d between consecutive terms. If a is the first term, the n-th term is <em>T<sub>n</sub> = a + (n−1)d</em>.</p><p>Sum of first n terms: <em>S<sub>n</sub> = n/2[2a + (n−1)d]</em>.</p>',
  },
  {
    id: 'note-cs-11-1-1',
    chapterId: 'cs-11-1',
    type: 'theory',
    title: 'Logic Gates Overview',
    content: '<p>Basic gates: AND, OR, NOT; derived gates: NAND, NOR, XOR, XNOR. Truth tables define gate behavior. Boolean algebra simplifies logical expressions for digital circuit design.</p>',
  },
  {
    id: 'note-bio-11-1-1',
    chapterId: 'bio-11-1',
    type: 'theory',
    title: 'Cell Organelles',
    content: '<p>Key organelles: nucleus (genetic control), mitochondria (ATP production), ribosomes (protein synthesis), ER and Golgi (processing and transport), lysosomes (digestion), chloroplasts in plants (photosynthesis).</p>',
  },
  {
    id: 'note-phy-11-1-wiki-1',
    chapterId: 'phy-11-1',
    type: 'theory',
    title: 'SI Base Units Overview',
    content: '<p>The International System of Units (SI) defines seven base units: second (time), metre (length), kilogram (mass), ampere (electric current), kelvin (thermodynamic temperature), mole (amount of substance), and candela (luminous intensity). All other units are derived from these.</p><p>Source: <a href="https://en.wikipedia.org/wiki/SI_base_unit" target="_blank" rel="noopener noreferrer">Wikipedia — SI base unit</a></p>',
  },
  {
    id: 'note-chem-11-1-wiki-1',
    chapterId: 'chem-11-1',
    type: 'theory',
    title: 'Stoichiometry Basics',
    content: '<p>Stoichiometry studies quantitative relationships between reactants and products using balanced chemical equations and the conservation of mass. It relates moles, molar ratios, and masses to predict product amounts and required reactant quantities.</p><p>Source: <a href="https://en.wikipedia.org/wiki/Stoichiometry" target="_blank" rel="noopener noreferrer">Wikipedia — Stoichiometry</a></p>',
  },
  { id: 'note-eng-11-1', chapterId: 'eng-11-1', type: 'theory', title: 'Education and Humanity — Overview', content: '<p>Unit summary and exercises with vocabulary, grammar, and comprehension.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/education-and-humanity/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-2', chapterId: 'eng-11-2', type: 'theory', title: 'Communication — Overview', content: '<p>Unit summary and practice tasks focused on communication skills.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/communication/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-3', chapterId: 'eng-11-3', type: 'theory', title: 'Media and Society — Overview', content: '<p>Unit summary: media influence, society, and critical reading.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/media-and-society/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-4', chapterId: 'eng-11-4', type: 'theory', title: 'History and Culture — Overview', content: '<p>Unit summary with thematic text and comprehension exercises.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/history-and-culture/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-5', chapterId: 'eng-11-5', type: 'theory', title: 'Life and Love — Overview', content: '<p>Unit summary: vocabulary and comprehension about life and love.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/life-and-love/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-6', chapterId: 'eng-11-6', type: 'theory', title: 'Health and Exercise — Overview', content: '<p>Unit summary: health, wellness, and grammar exercises.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/health-and-exercise/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-7', chapterId: 'eng-11-7', type: 'theory', title: 'Ecology and Development — Overview', content: '<p>Unit summary: ecology topics with reading and writing practice.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/ecology-and-development/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-8', chapterId: 'eng-11-8', type: 'theory', title: 'Humour and Satire — Overview', content: '<p>Unit summary with exercises on humour and satire.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/humour-and-satire/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-9', chapterId: 'eng-11-9', type: 'theory', title: 'Democracy and Human Rights — Overview', content: '<p>Unit summary: rights, democracy, and critical thinking tasks.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/democracy-and-human-rights/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-10', chapterId: 'eng-11-10', type: 'theory', title: 'Home Life and Family Relationship — Overview', content: '<p>Unit summary with exercises about family life and relationships.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/home-life-and-family-relationship/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-11', chapterId: 'eng-11-11', type: 'theory', title: 'Arts and Creations — Overview', content: '<p>Unit summary on arts and creative expression.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/arts-and-creations/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-12', chapterId: 'eng-11-12', type: 'theory', title: 'Fantasy — Overview', content: '<p>Unit summary with reading comprehension and vocabulary.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/fantasy/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-13', chapterId: 'eng-11-13', type: 'theory', title: 'Career and Entrepreneurship — Overview', content: '<p>Unit summary on careers and entrepreneurship; practice tasks.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/career-and-entrepreneurship/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-14', chapterId: 'eng-11-14', type: 'theory', title: 'Power and Politics — Overview', content: '<p>Unit summary with exercises on power and politics.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/power-and-politics/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-15', chapterId: 'eng-11-15', type: 'theory', title: 'War and Peace — Overview', content: '<p>Unit summary; reading and writing practice.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/war-and-peace/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-16', chapterId: 'eng-11-16', type: 'theory', title: 'Critical Thinking — Overview', content: '<p>Unit summary developing critical reasoning skills.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/critical-thinking/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-17', chapterId: 'eng-11-17', type: 'theory', title: 'Globalisation and Diaspora — Overview', content: '<p>Unit summary: globalization, diaspora; vocabulary tasks.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/globalisation-and-diaspora/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-18', chapterId: 'eng-11-18', type: 'theory', title: 'Immigration and Identity — Overview', content: '<p>Unit summary; identity themes with exercises.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/immigration-and-identity/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-19', chapterId: 'eng-11-19', type: 'theory', title: 'Travel and Tourism — Overview', content: '<p>Unit summary; reading comprehension on travel/tourism.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/travel-and-tourism/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-20', chapterId: 'eng-11-20', type: 'theory', title: 'Science and Technology — Overview', content: '<p>Unit summary; key vocabulary and comprehension pointers.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/science-and-technology/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-eng-11-lit-ss', chapterId: 'eng-11-lit-ss', type: 'theory', title: 'Short Stories — Overview', content: '<p>7 stories with complete exercise solutions (e.g., The Selfish Giant, The Oval Portrait).</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — English</a></p>' },
  { id: 'note-eng-11-lit-poems', chapterId: 'eng-11-lit-poems', type: 'theory', title: 'Poems — Overview', content: '<p>5 poems with summary and exercises (e.g., Corona Says, A Red, Red Rose).</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — English</a></p>' },
  { id: 'note-eng-11-lit-essays', chapterId: 'eng-11-lit-essays', type: 'theory', title: 'Essays — Overview', content: '<p>5 essays with complete exercises (e.g., Sharing Tradition, How to Live Before You Die).</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — English</a></p>' },
  { id: 'note-eng-11-lit-plays', chapterId: 'eng-11-lit-plays', type: 'theory', title: 'One Act Plays — Overview', content: '<p>3 plays: Trifles, A Sunny Morning, Refund — exercise solutions available.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — English</a></p>' },
  {
    id: 'note-eng-11-20-1',
    chapterId: 'eng-11-20',
    type: 'theory',
    title: 'Science and Technology — Key Vocabulary',
    content: '<p>Freshman: first-year student; Naive: lacking experience; Dorm: student residence; Suitemate: someone sharing suite facilities; Incalculable: cannot be measured; Brag: boast; Disposal: throwing away.</p><p>Exercises and comprehension adapted from NEB Plus 2 Notes.</p><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/science-and-technology/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Science and Technology</a></p>',
  },
  {
    id: 'note-eng-11-20-2',
    chapterId: 'eng-11-20',
    type: 'theory',
    title: 'Science and Technology — Comprehension Summary',
    content: '<p>The piece contrasts a parent\'s college experience with modern tech-driven student life, noting increased connectivity but fragmented real-world interactions.</p><ul><li>Tools: mobile apps, social media, YouTube</li><li>Impacts: reliance on shortcuts, reduced exploration</li></ul><p>Source: <a href="https://nebplus2notes.com/class-11/english/ld/science-and-technology/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>',
  },
  {
    id: 'note-nep-11-7-1',
    chapterId: 'nep-11-7',
    type: 'theory',
    title: 'पर्यापर्यटन — शब्दभण्डार',
    content: '<p>विहङ्गम दृष्टि: चराले जस्तै माथिबाट हेर्ने दृष्टि; तृणहारी: घाँसपात खाने; पर्यापर्यटन: विविधताका कारण हुने पर्यटन; जलक्रीडा: पानीमा खेलिने खेलहरू; पर्यावरणमैत्री: वातावरण सुहाउँदो।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/paryatan-samvawana-ra-aayam/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — पर्यापर्यटनका सम्भावना र आयाम</a></p>',
  },
  {
    id: 'note-nep-11-7-2',
    chapterId: 'nep-11-7',
    type: 'theory',
    title: 'पर्यापर्यटन — बोध/अभिव्यक्ति सार',
    content: '<p>पाठ दस अनुच्छेदमा संरचित छ। पर्यापर्यटनले स्थानीय विविधता, पर्यावरणमैत्री गतिविधि, जलक्रीडा, र पहाडी/तराई क्षेत्रका विशेषताको उपयोग गर्छ।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/paryatan-samvawana-ra-aayam/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>',
  },
  { id: 'note-nep-11-1', chapterId: 'nep-11-1', type: 'theory', title: 'वीर पुर्खा — सार', content: '<p>कविता अध्यायको सार तथा अभ्यास द्रुत पुनरावर्तनका लागि।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-11-2', chapterId: 'nep-11-2', type: 'theory', title: 'गाउँको माया — सार', content: '<p>कथाको सार र मुख्य शब्दावली अभ्यासहरूको झलक।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-11-3', chapterId: 'nep-11-3', type: 'theory', title: 'संस्कृतिको नयाँ यात्रा — सार', content: '<p>आत्मपरक निबन्धको सार र अभ्यास बुँदाहरू।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/sanskriti-ko-naya-yatra/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-nep-11-4', chapterId: 'nep-11-4', type: 'theory', title: 'योगमाया — सार', content: '<p>राष्ट्रिय जीवनी अध्यायको सार र शब्दभण्डार।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-11-5', chapterId: 'nep-11-5', type: 'theory', title: 'साथीलाई चिठी — सार', content: '<p>चिठी अध्यायको मुख्य बुँदाहरू र अभ्यास संकेत।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-11-6', chapterId: 'nep-11-6', type: 'theory', title: 'त्यो फेरि फर्कला ? — सार', content: '<p>मनोवैज्ञानिक कथाको सार र अभ्यास दृष्टान्त।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-11-8', chapterId: 'nep-11-8', type: 'theory', title: 'लौ आयो ताजा खबर — सार', content: '<p>लघु नाटकको सार र अभ्यास बुँदाहरू।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-11-9', chapterId: 'nep-11-9', type: 'theory', title: 'सफलताको कथा — सार', content: '<p>रिपोर्ताजमूलक रचनाको सार र अभ्यास संकेत।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-11-10', chapterId: 'nep-11-10', type: 'theory', title: 'कृषिशालामा एक दिन — सार', content: '<p>संवाद अध्यायको सार र महत्वपूर्ण शब्दभण्डार।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/krishisala-ma-yek-din/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-nep-11-11', chapterId: 'nep-11-11', type: 'theory', title: 'रारा भ्रमण — सार', content: '<p>दैनिकी अध्यायको सार र अभ्यास संकेत।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/rara-vramad/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-nep-11-12', chapterId: 'nep-11-12', type: 'theory', title: 'जलस्रोत र ऊर्जा — सार', content: '<p>वक्तृता अध्यायको सार र अभ्यास बुँदाहरू।</p><p>Source: <a href="https://nebplus2notes.com/class-11/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-12-1', chapterId: 'nep-12-1', type: 'theory', title: 'आमाको सपना — सार', content: '<p>अध्याय सार र अभ्यास झलक।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/aama-ko-sapana/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-nep-12-2', chapterId: 'nep-12-2', type: 'theory', title: 'विरहिणी दमयन्ती — सार', content: '<p>अध्याय सार र अभ्यास संकेत।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/birhidi-damyenti/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-nep-12-3', chapterId: 'nep-12-3', type: 'theory', title: 'घनघस्याको उकालो काट्ता — सार', content: '<p>अध्याय सार र शब्दभण्डार।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-12-4', chapterId: 'nep-12-4', type: 'theory', title: 'व्यावसायिक पत्र — सार', content: '<p>अध्याय सार र अभ्यास बुँदाहरू।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-12-5', chapterId: 'nep-12-5', type: 'theory', title: 'एक चिहान — सार', content: '<p>अध्याय सार र अभ्यास संकेत।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/yek-chihan/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-nep-12-6', chapterId: 'nep-12-6', type: 'theory', title: 'स्टिफन विलियम हकिङ — सार', content: '<p>अध्याय सार र मुख्य बुँदाहरू।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-12-7', chapterId: 'nep-12-7', type: 'theory', title: 'हामीलाई बोलाउँछन् हिमचुली — सार', content: '<p>अध्याय सार र अभ्यास संकेत।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-12-8', chapterId: 'nep-12-8', type: 'theory', title: 'मातृत्व — सार', content: '<p>अध्याय सार र शब्दभण्डार।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-12-9', chapterId: 'nep-12-9', type: 'theory', title: 'गोर्खे — सार', content: '<p>अध्याय सार र अभ्यास संकेत।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-12-10', chapterId: 'nep-12-10', type: 'theory', title: 'नेपाली पहिचान — सार', content: '<p>अध्याय सार र शब्दभण्डार।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/nepali-pahichan/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes</a></p>' },
  { id: 'note-nep-12-11', chapterId: 'nep-12-11', type: 'theory', title: 'सहकारी — सार', content: '<p>अध्याय सार र अभ्यास बुँदाहरू।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-nep-12-12', chapterId: 'nep-12-12', type: 'theory', title: 'जीवन मार्ग — सार', content: '<p>अध्याय सार र अभ्यास संकेत।</p><p>Source: <a href="https://nebplus2notes.com/class-12/nepali/" target="_blank" rel="noopener noreferrer">NEB Plus 2 Notes — Nepali</a></p>' },
  { id: 'note-cs-11-3-rn-1', chapterId: 'cs-11-3', type: 'theory', title: 'C Language — Overview (Readersnepal)', content: '<p>Comprehensive outline: history, features, control structures, arrays, strings, functions, pointers, structures, unions, and file handling.</p><p>Source: <a href="https://readersnepal.com/c-language" target="_blank" rel="noopener noreferrer">Readersnepal — C Language</a></p>' },
  { id: 'note-cs-11-3-rn-2', chapterId: 'cs-11-3', type: 'theory', title: 'C File Handling — Read & Display Records', content: '<p>Examples using FILE*, fopen, fscanf, printf, loops with EOF to read single/multiple records and filter output.</p><p>Source: <a href="https://readersnepal.com/read-and-display-records-in-c" target="_blank" rel="noopener noreferrer">Readersnepal — Read and Display Records in C</a></p>' },
  { id: 'note-cs-11-2-rn-1', chapterId: 'cs-11-2', type: 'theory', title: 'HTML — Overview (Readersnepal)', content: '<p>Definition, purpose, brief history, versions (HTML 1.0 to HTML5), workflow, and .html/.htm extensions.</p><p>Source: <a href="https://readersnepal.com/html" target="_blank" rel="noopener noreferrer">Readersnepal — HTML</a></p>' },
  { id: 'note-cs-11-2-rn-2', chapterId: 'cs-11-2', type: 'theory', title: 'CSS Types — Inline, Internal, External', content: '<p>Advantages of CSS and examples demonstrating inline styles, <style> block in head, and external stylesheet linkage.</p><p>Source: <a href="https://readersnepal.com/types-of-css" target="_blank" rel="noopener noreferrer">Readersnepal — Types of CSS</a></p>' },
  { id: 'note-cs-12-1-rn-1', chapterId: 'cs-12-1', type: 'theory', title: 'SQL — Overview & Basic Commands', content: '<p>DBMS types (Relational vs Non-Relational), SQL basics: CREATE TABLE, INSERT, SELECT with examples.</p><p>Source: <a href="https://readersnepal.com/sql" target="_blank" rel="noopener noreferrer">Readersnepal — SQL</a></p>' },
  { id: 'note-cs-12-1-rn-2', chapterId: 'cs-12-1', type: 'theory', title: 'DDL, DML, DCL — Examples', content: '<p>CREATE/DROP for schema and tables; SELECT/INSERT/UPDATE/DELETE for records; overview of control commands.</p><p>Source: <a href="https://readersnepal.com/ddl-dml-and-dcl-with-example" target="_blank" rel="noopener noreferrer">Readersnepal — DDL, DML, DCL</a></p>' },
  { id: 'note-cs-12-2-rn-1', chapterId: 'cs-12-2', type: 'theory', title: 'JavaScript — Basic Form Validation', content: '<p>Client-side validation using DOM APIs and alert for empty fields; onsubmit/onclick behaviors.</p><p>Source: <a href="https://readersnepal.com/form-validation-in-javascript" target="_blank" rel="noopener noreferrer">Readersnepal — Form Validation in JavaScript</a></p>' },
  { id: 'note-cs-12-2-rn-2', chapterId: 'cs-12-2', type: 'theory', title: 'PHP + MySQL — Store Form Data', content: '<p>Localhost setup with XAMPP, PHP file to connect and insert form inputs into MySQL via phpMyAdmin.</p><p>Source: <a href="https://readersnepal.com/how-to-insert-and-store-data-from-html-form-to-database" target="_blank" rel="noopener noreferrer">Readersnepal — Insert HTML Form to Database</a></p>' },
  { id: 'note-math-11-2-1', chapterId: 'math-11-2', type: 'theory', title: 'Matrices — Core Concepts', content: '<p>Matrix types: zero, identity, diagonal, symmetric; operations: addition, multiplication; determinant properties; inverse via adjoint; system of linear equations using Cramer’s rule.</p>' },
  { id: 'note-math-11-3-1', chapterId: 'math-11-3', type: 'theory', title: 'Calculus — Limits & Continuity', content: '<p>Limit definition, standard limits, continuity criteria, differentiability; basic derivative rules: power, product, quotient, chain.</p>' },
  { id: 'note-math-12-1-1', chapterId: 'math-12-1', type: 'theory', title: 'Permutation & Combination — Essentials', content: '<p>Permutation P(n,r)=n!/(n−r)!; Combination C(n,r)=n!/[r!(n−r)!]; applications to counting; Binomial Theorem: (a+b)^n=∑C(n,r)a^{n−r}b^r.</p>' },
  { id: 'note-math-12-2-1', chapterId: 'math-12-2', type: 'theory', title: 'Integrals — Basics', content: '<p>Indefinite integrals as antiderivatives; standard forms; definite integral properties; basic techniques: substitution, parts; area under curve.</p>' },
  { id: 'note-phy-11-4-1', chapterId: 'phy-11-4', type: 'theory', title: 'Laws of Motion — Summary', content: '<p>Newtons three laws; friction: static vs kinetic; circular motion: centripetal acceleration a= v^2/r; free-body diagrams for problem solving.</p>' },
  { id: 'note-phy-11-5-1', chapterId: 'phy-11-5', type: 'theory', title: 'Work, Energy & Power — Key Points', content: '<p>Work as W=F·s; kinetic and potential energy; work-energy theorem; conservation of mechanical energy; power P=dW/dt.</p>' },
  { id: 'note-phy-12-1-1', chapterId: 'phy-12-1', type: 'theory', title: 'Wave Optics — Overview', content: '<p>Interference: Youngs double-slit; diffraction: single-slit minima; polarization by selective absorption and reflection.</p>' },
  { id: 'note-phy-12-2-1', chapterId: 'phy-12-2', type: 'theory', title: 'Current Electricity — Essentials', content: '<p>Ohm’s law V=IR; series/parallel resistances; Kirchhoff’s rules; potentiometer applications for emf and internal resistance.</p>' },
  { id: 'note-phy-12-3-1', chapterId: 'phy-12-3', type: 'theory', title: 'Modern Physics — Highlights', content: '<p>Photoelectric effect and Einstein equation; Bohr model: quantized orbits; X-rays: production and properties.</p>' },
  { id: 'note-chem-11-3-1', chapterId: 'chem-11-3', type: 'theory', title: 'Chemical Bonding — Overview', content: '<p>Ionic vs covalent bonds; Lewis structures; VSEPR shapes; hybridization sp, sp2, sp3; bond polarity and intermolecular forces.</p>' },
  { id: 'note-chem-11-4-1', chapterId: 'chem-11-4', type: 'theory', title: 'States of Matter — Summary', content: '<p>Gas laws (Boyle, Charles); kinetic molecular theory; phase changes and phase diagrams; properties of liquids and solids.</p>' },
  { id: 'note-chem-12-1-1', chapterId: 'chem-12-1', type: 'theory', title: 'Volumetric Analysis — Basics', content: '<p>Titrations: acid-base, redox; indicators; standard solutions, normality/molarity; calculation of end-point and percent purity.</p>' },
  { id: 'note-chem-12-2-1', chapterId: 'chem-12-2', type: 'theory', title: 'Organic II — Key Reactions', content: '<p>Haloalkanes: nucleophilic substitution; alcohols/phenols: oxidation, esterification; ethers: Williamson synthesis; orientation and reactivity trends.</p>' },
  { id: 'note-bio-11-2-1', chapterId: 'bio-11-2', type: 'theory', title: 'Genetics — Core Ideas', content: '<p>Mendel’s laws; monohybrid and dihybrid crosses; genotype vs phenotype; DNA structure and replication basics.</p>' },
  { id: 'note-bio-12-1-1', chapterId: 'bio-12-1', type: 'theory', title: 'Human Physiology — Digest & Respire', content: '<p>Digestive organs and enzymes; respiratory mechanics and gas exchange; brief overview of circulation and excretion.</p>' },
  { id: 'note-bio-12-2-1', chapterId: 'bio-12-2', type: 'theory', title: 'Genetics & Evolution — Summary', content: '<p>Central dogma; variation and natural selection; Darwinian evolution; evidence from fossils and molecular biology.</p>' },
  { id: 'note-cs-12-3-1', chapterId: 'cs-12-3', type: 'theory', title: 'C Advanced — Pointers, Structures & Files', content: '<p>Pointers: declaration, dereferencing, pointer arithmetic; structures: definition and access; file handling: fopen/fclose, fprintf/fscanf.</p>' },
  // Detailed Physics Grade 12 Notes
  {
    id: 'note-phy-12-1-detailed',
    chapterId: 'phy-12-1',
    type: 'theory',
    title: 'Wave Optics — Detailed Notes',
    content: `
      <h3>Interference</h3>
      <p>The superposition of two coherent light waves resulting in regions of maximum and minimum intensity.</p>
      <ul>
        <li><strong>Young’s Double Slit Experiment (YDSE)</strong>: Demonstrates interference.</li>
        <li><strong>Path Difference</strong>: Δx = d sin θ ≈ dy/D</li>
        <li><strong>Bright Fringes (Maxima)</strong>: Δx = nλ (for n = 0, 1, 2...)</li>
        <li><strong>Dark Fringes (Minima)</strong>: Δx = (n + 0.5)λ</li>
        <li><strong>Fringe Width (β)</strong>: β = λD/d</li>
      </ul>
      <h3>Diffraction</h3>
      <p>The bending of light waves around the corners of an obstacle or through an aperture.</p>
      <ul>
        <li><strong>Single Slit Diffraction</strong>: Central bright maximum flanked by secondary maxima and minima.</li>
        <li><strong>Minima Condition</strong>: a sin θ = nλ (where a is slit width).</li>
      </ul>
      <h3>Polarization</h3>
      <p>Restricting light vibrations to a single plane, proving light is a transverse wave.</p>
      <ul>
        <li><strong>Brewster’s Law</strong>: μ = tan i<sub>p</sub></li>
        <li><strong>Malus’s Law</strong>: I = I<sub>0</sub> cos² θ</li>
      </ul>
    `
  },
  {
    id: 'note-phy-12-2-detailed',
    chapterId: 'phy-12-2',
    type: 'theory',
    title: 'Current Electricity — Detailed Notes',
    content: `
      <h3>Kirchhoff’s Laws</h3>
      <ul>
        <li><strong>First Law (KCL)</strong>: ΣI = 0 (Conservation of Charge). Sum of currents entering a junction equals sum leaving.</li>
        <li><strong>Second Law (KVL)</strong>: ΣΔV = 0 (Conservation of Energy). Algebraic sum of potential changes in a closed loop is zero.</li>
      </ul>
      <h3>Potentiometer</h3>
      <p>A device to measure EMF and internal resistance without drawing current.</p>
      <ul>
        <li><strong>Comparing EMFs</strong>: E<sub>1</sub>/E<sub>2</sub> = l<sub>1</sub>/l<sub>2</sub></li>
        <li><strong>Internal Resistance (r)</strong>: r = R((l<sub>1</sub>/l<sub>2</sub>) - 1)</li>
      </ul>
    `
  },
  {
    id: 'note-phy-12-3-detailed',
    chapterId: 'phy-12-3',
    type: 'theory',
    title: 'Modern Physics — Detailed Notes',
    content: `
      <h3>Photoelectric Effect</h3>
      <p>Emission of electrons when light hits a metal surface.</p>
      <ul>
        <li><strong>Einstein’s Equation</strong>: hν = Φ + K<sub>max</sub></li>
        <li><strong>Stopping Potential</strong>: K<sub>max</sub> = eV<sub>s</sub></li>
      </ul>
      <h3>Bohr’s Atomic Model</h3>
      <ul>
        <li><strong>Quantized Angular Momentum</strong>: L = nh/2π</li>
        <li><strong>Energy Levels</strong>: E<sub>n</sub> = -13.6/n² eV (for Hydrogen)</li>
      </ul>
    `
  },
  // Detailed Chemistry Grade 12 Notes
  {
    id: 'note-chem-12-1-detailed',
    chapterId: 'chem-12-1',
    type: 'theory',
    title: 'Volumetric Analysis — Detailed Notes',
    content: `
      <h3>Titration Types</h3>
      <ul>
        <li><strong>Acid-Base</strong>: Neutralization (Indicators: Phenolphthalein, Methyl Orange).</li>
        <li><strong>Redox</strong>: Electron transfer (e.g., KMnO<sub>4</sub> acting as self-indicator).</li>
      </ul>
      <h3>Concentration Units</h3>
      <ul>
        <li><strong>Normality (N)</strong>: Gram equivalent weight per liter.</li>
        <li><strong>Molarity (M)</strong>: Moles per liter.</li>
        <li><strong>Principle of Volumetry</strong>: N<sub>1</sub>V<sub>1</sub> = N<sub>2</sub>V<sub>2</sub></li>
      </ul>
    `
  },
  {
    id: 'note-chem-12-2-detailed',
    chapterId: 'chem-12-2',
    type: 'theory',
    title: 'Organic Chemistry II — Reaction Mechanisms',
    content: `
      <h3>Nucleophilic Substitution</h3>
      <ul>
        <li><strong>S<sub>N</sub>1</strong>: Unimolecular, two-step, carbocation intermediate, racemization. Favored by tertiary halides.</li>
        <li><strong>S<sub>N</sub>2</strong>: Bimolecular, one-step, transition state, Walden inversion. Favored by primary halides.</li>
      </ul>
      <h3>Key Reactions</h3>
      <ul>
        <li><strong>Williamson Synthesis</strong>: R-X + R'-ONa → R-O-R' + NaX (Ether formation).</li>
        <li><strong>Esterification</strong>: Alcohol + Carboxylic Acid → Ester + Water.</li>
        <li><strong>Aldol Condensation</strong>: Aldehydes/Ketones with α-hydrogen condense with dilute alkali.</li>
      </ul>
    `
  },
  // Detailed CS Grade 12 Notes
  {
    id: 'note-cs-12-2-detailed',
    chapterId: 'cs-12-2',
    type: 'theory',
    title: 'Web Technology II — PHP & JavaScript',
    content: `
      <h3>JavaScript Form Validation</h3>
      <p>Client-side validation to ensure data integrity before submission.</p>
      <ul>
        <li><strong>Accessing Elements</strong>: document.getElementById('id').value</li>
        <li><strong>Common Checks</strong>: Empty fields, email format, password length.</li>
        <li><strong>Events</strong>: onsubmit, onclick, onchange.</li>
      </ul>
      <h3>PHP & MySQL</h3>
      <p>Server-side scripting for dynamic sites.</p>
      <ul>
        <li><strong>Connection</strong>: mysqli_connect('localhost', 'user', 'pass', 'db')</li>
        <li><strong>Insert Data</strong>: INSERT INTO table (col1, col2) VALUES ('val1', 'val2')</li>
      </ul>
    `
  },
  {
    id: 'note-cs-12-3-detailed',
    chapterId: 'cs-12-3',
    type: 'theory',
    title: 'C Advanced — File Handling',
    content: `
      <h3>File Operations</h3>
      <ul>
        <li><strong>Opening</strong>: FILE *fp = fopen("filename.txt", "mode"); (Modes: "r", "w", "a")</li>
        <li><strong>Writing</strong>: fprintf(fp, "format", vars);</li>
        <li><strong>Reading</strong>: fscanf(fp, "format", &vars);</li>
        <li><strong>Closing</strong>: fclose(fp);</li>
      </ul>
      <h3>Pointers & Structures</h3>
      <ul>
        <li><strong>Pointer</strong>: Variable storing memory address (*p).</li>
        <li><strong>Structure</strong>: User-defined data type grouping different variables (struct).</li>
      </ul>
    `
  },
  // Detailed Math Grade 12 Notes
  {
    id: 'note-math-12-2-detailed',
    chapterId: 'math-12-2',
    type: 'theory',
    title: 'Integrals — Detailed Notes',
    content: `
      <h3>Indefinite Integrals</h3>
      <p>Antiderivatives of functions. Standard forms:</p>
      <ul>
        <li>∫ x<sup>n</sup> dx = x<sup>n+1</sup>/(n+1) + C</li>
        <li>∫ e<sup>x</sup> dx = e<sup>x</sup> + C</li>
        <li>∫ (1/x) dx = ln|x| + C</li>
      </ul>
      <h3>Techniques</h3>
      <ul>
        <li><strong>Substitution</strong>: Let u = g(x), du = g'(x)dx.</li>
        <li><strong>Integration by Parts</strong>: ∫ u dv = uv - ∫ v du.</li>
      </ul>
      <h3>Definite Integrals & Area</h3>
      <p>Area under curve y = f(x) from a to b is ∫<sub>a</sub><sup>b</sup> f(x) dx.</p>
    `
  },
  // Detailed Physics Grade 11 Notes
  {
    id: 'note-phy-11-3-detailed',
    chapterId: 'phy-11-3',
    type: 'theory',
    title: 'Kinematics — Detailed Notes',
    content: `
      <h3>Equations of Motion</h3>
      <p>For uniform acceleration:</p>
      <ul>
        <li>v = u + at</li>
        <li>s = ut + ½at²</li>
        <li>v² = u² + 2as</li>
      </ul>
      <h3>Projectile Motion</h3>
      <p>Motion in two dimensions under gravity.</p>
      <ul>
        <li><strong>Time of Flight (T)</strong>: 2u sinθ / g</li>
        <li><strong>Horizontal Range (R)</strong>: u² sin2θ / g</li>
        <li><strong>Max Height (H)</strong>: u² sin²θ / 2g</li>
      </ul>
    `
  },
  {
    id: 'note-phy-11-5-detailed',
    chapterId: 'phy-11-5',
    type: 'theory',
    title: 'Work, Energy & Power — Detailed Notes',
    content: `
      <h3>Work & Energy</h3>
      <ul>
        <li><strong>Work (W)</strong>: F · s = Fs cosθ</li>
        <li><strong>Kinetic Energy (KE)</strong>: ½mv²</li>
        <li><strong>Potential Energy (PE)</strong>: mgh</li>
      </ul>
      <h3>Work-Energy Theorem</h3>
      <p>Work done by all forces equals change in kinetic energy: W = ΔKE.</p>
      <h3>Power</h3>
      <p>Rate of doing work: P = W/t = F · v.</p>
    `
  },
  // Detailed Chemistry Grade 11 Notes
  {
    id: 'note-chem-11-2-detailed',
    chapterId: 'chem-11-2',
    type: 'theory',
    title: 'Atomic Structure — Detailed Notes',
    content: `
      <h3>Quantum Numbers</h3>
      <ul>
        <li><strong>Principal (n)</strong>: Energy shell (1, 2, 3...)</li>
        <li><strong>Azimuthal (l)</strong>: Subshell shape (0 to n-1)</li>
        <li><strong>Magnetic (m)</strong>: Orbital orientation (-l to +l)</li>
        <li><strong>Spin (s)</strong>: Electron spin (+½, -½)</li>
      </ul>
      <h3>Rules</h3>
      <ul>
        <li><strong>Pauli Exclusion</strong>: No two electrons can have same 4 quantum numbers.</li>
        <li><strong>Hund's Rule</strong>: Pairing starts only after each orbital gets one electron.</li>
      </ul>
    `
  },
  {
    id: 'note-chem-11-3-detailed',
    chapterId: 'chem-11-3',
    type: 'theory',
    title: 'Chemical Bonding — Detailed Notes',
    content: `
      <h3>VSEPR Theory</h3>
      <p>Valence Shell Electron Pair Repulsion theory predicts molecular shapes.</p>
      <ul>
        <li><strong>Linear</strong>: sp hybridization (e.g., BeF<sub>2</sub>)</li>
        <li><strong>Trigonal Planar</strong>: sp² hybridization (e.g., BF<sub>3</sub>)</li>
        <li><strong>Tetrahedral</strong>: sp³ hybridization (e.g., CH<sub>4</sub>)</li>
      </ul>
      <h3>Hybridization</h3>
      <p>Mixing of atomic orbitals to form new hybrid orbitals equivalent in energy.</p>
    `
  },
  // Detailed Biology Grade 11 & 12 Notes
  {
    id: 'note-bio-11-1-detailed',
    chapterId: 'bio-11-1',
    type: 'theory',
    title: 'Cell Biology — Detailed Notes',
    content: `
      <h3>Cell Organelles</h3>
      <ul>
        <li><strong>Mitochondria</strong>: Powerhouse, site of Krebs cycle and ETC.</li>
        <li><strong>Ribosomes</strong>: Protein synthesis factories (70S in prokaryotes, 80S in eukaryotes).</li>
        <li><strong>Golgi Body</strong>: Packaging and secretion.</li>
      </ul>
      <h3>Cell Division</h3>
      <ul>
        <li><strong>Mitosis</strong>: Equational division (2n → 2n). Prophase, Metaphase, Anaphase, Telophase.</li>
        <li><strong>Meiosis</strong>: Reductional division (2n → n). Homologous pairing and crossing over in Prophase I.</li>
      </ul>
    `
  },
  {
    id: 'note-bio-12-1-detailed',
    chapterId: 'bio-12-1',
    type: 'theory',
    title: 'Human Physiology — Detailed Notes',
    content: `
      <h3>Digestion</h3>
      <p>Breakdown of food. Enzymes: Pepsin (Stomach), Trypsin/Lipase (Pancreas). Absorption occurs in villi.</p>
      <h3>Respiration</h3>
      <p>Gas exchange in alveoli. O<sub>2</sub> transport: 97% as Oxyhemoglobin. CO<sub>2</sub> transport: 70% as Bicarbonate.</p>
      <h3>Circulation</h3>
      <p>Double circulation. Cardiac cycle (0.8s). SA Node is the pacemaker.</p>
      <h3>Excretion</h3>
      <p>Nephron structure. Urine formation: Ultrafiltration, Reabsorption, Secretion.</p>
    `
  },
  {
    id: 'note-bio-12-2-detailed',
    chapterId: 'bio-12-2',
    type: 'theory',
    title: 'Molecular Genetics — Detailed Notes',
    content: `
      <h3>Central Dogma</h3>
      <p>DNA → mRNA → Protein</p>
      <ul>
        <li><strong>Replication</strong>: Semiconservative. Enzymes: Helicase (unwinds), DNA Polymerase (adds bases).</li>
        <li><strong>Transcription</strong>: DNA to mRNA. Occurs in nucleus.</li>
        <li><strong>Translation</strong>: mRNA to Protein. Occurs in ribosomes. tRNA carries amino acids.</li>
      </ul>
    `
  },
  // --- ENRICHED CONTENT: ENGLISH GRADE 11 ---
  {
    id: 'note-eng-11-lit-overview',
    chapterId: 'eng-11-lit-ss',
    type: 'theory',
    title: 'Short Stories: The Selfish Giant',
    content: `
      <h3>Plot Summary</h3>
      <p>A giant forbids children from playing in his garden, causing it to fall into eternal winter. One day, children sneak in, bringing spring back. The giant realizes his selfishness and befriends them, especially a small boy who turns out to be Christ figure.</p>
      <h3>Themes</h3>
      <p>Redemption, love, selfishness vs. generosity, and the nature of paradise.</p>
    `
  },
  {
    id: 'note-eng-11-grammar-tense',
    chapterId: 'eng-11-1',
    type: 'theory',
    title: 'Grammar: Tense & Aspect',
    content: `
      <h3>Present Tense</h3>
      <p><strong>Simple:</strong> General truths (Water boils at 100°C).</p>
      <p><strong>Continuous:</strong> Happening now (I am writing).</p>
      <p><strong>Perfect:</strong> Completed recently (I have eaten).</p>
      <h3>Past Tense</h3>
      <p><strong>Simple:</strong> Completed action (He left yesterday).</p>
      <p><strong>Continuous:</strong> Ongoing in past (He was sleeping).</p>
    `
  },
  // --- ADDITIONAL CONTENT: NEPALI GRADE 11 ---
  {
    id: 'note-nep-11-bir-purkha',
    chapterId: 'nep-11-1',
    type: 'theory',
    title: 'वीर पुर्खा (कविता) - सारांश',
    content: `
      <h3>मूल भाव</h3>
      <p>यस कवितामा कविले नेपाली वीर पुर्खाहरूको वीरता, साहस र बलिदानको गाथा गाएका छन्। नेपालको सिमाना पूर्वमा टिस्टा र पश्चिममा काँगडासम्म पुर्याउने पुर्खाहरूको योगदानलाई सम्मान गरिएको छ।</p>
      <h3>मुख्य बुँदाहरू</h3>
      <ul>
        <li>नेपालीहरूको वीरता र स्वाभिमान।</li>
        <li>प्राकृतिक कठिनाइहरू (पहाड, नदी) छिचोल्दै अघि बढ्ने साहस।</li>
        <li>इतिहासको गौरवमय क्षणहरूको स्मरण।</li>
      </ul>
    `
  },
  {
    id: 'note-nep-11-gauko-maya',
    chapterId: 'nep-11-2',
    type: 'theory',
    title: 'गाउँको माया (कथा) - समीक्षा',
    content: `
      <h3>कथाको सार</h3>
      <p>यो एक सामाजिक कथा हो जसले वैदेशिक रोजगारी र शहर पस्ने प्रवृत्तिका कारण गाउँहरू रित्तिँदै गएको यथार्थ चित्रण गर्छ। गाउँको अर्गानिक जीवनशैली, आत्मीयता र प्रकृतिप्रेमलाई मुख्य विषय बनाइएको छ।</p>
      <h3>सन्देश</h3>
      <p>गाउँको विकास र संरक्षण गर्नुपर्ने आवश्यकता। आफ्नो माटो र संस्कृतिप्रतिको प्रेम।</p>
    `
  },
  // --- ADDITIONAL CONTENT: ENGLISH GRADE 12 ---
  {
    id: 'note-eng-12-lit-neighbours',
    chapterId: 'eng-12-full',
    type: 'theory',
    title: 'Story: Neighbours (Tim Winton)',
    content: `
      <h3>Summary</h3>
      <p>A young couple moves into a multicultural suburb. Initially prejudiced against their European neighbors, they gradually learn to appreciate the community's warmth and support, especially after the birth of their child.</p>
      <h3>Themes</h3>
      <p>Multiculturalism, transition, prejudice vs. acceptance, and community bonding.</p>
    `
  },
  // --- ADDITIONAL CONTENT: NEPALI GRADE 12 ---
  {
    id: 'note-nep-12-aama-sapana',
    chapterId: 'nep-12-1',
    type: 'theory',
    title: 'आमाको सपना (कविता) - विश्लेषण',
    content: `
      <h3>कवि: गोपालप्रसाद रिमाल</h3>
      <p>यस कवितामा आमा (नेपाल आमा) ले आफ्नो छोरा (नेपाली जनता) सँग क्रान्ति र परिवर्तनको सपना देखेको कुरा व्यक्त गरिएको छ। अन्धकार हटेर सुनौलो बिहानी आउने विश्वास प्रकट गरिएको छ।</p>
      <h3>प्रतीकहरू</h3>
      <ul>
        <li><strong>आमा:</strong> नेपाल राष्ट्र।</li>
        <li><strong>छोरा:</strong> परिवर्तनकारी युवा/जनता।</li>
        <li><strong>सपना:</strong> प्रजातन्त्र र स्वतन्त्रताको प्राप्ति।</li>
      </ul>
    `
  },
  // --- ENRICHED CONTENT: MATHEMATICS ---
  {
    id: 'note-math-11-1-detailed',
    chapterId: 'math-11-1',
    type: 'theory',
    title: 'Sequence & Series — Detailed Notes',
    content: `
      <h3>Arithmetic Progression (AP)</h3>
      <ul>
        <li><strong>nth Term</strong>: t<sub>n</sub> = a + (n-1)d</li>
        <li><strong>Sum</strong>: S<sub>n</sub> = n/2 (2a + (n-1)d)</li>
      </ul>
      <h3>Geometric Progression (GP)</h3>
      <ul>
        <li><strong>nth Term</strong>: t<sub>n</sub> = ar<sup>n-1</sup></li>
        <li><strong>Sum</strong>: S<sub>n</sub> = a(r<sup>n</sup> - 1) / (r - 1)</li>
      </ul>
    `
  },
  {
    id: 'note-math-11-3-detailed',
    chapterId: 'math-11-3',
    type: 'theory',
    title: 'Calculus — Limits & Derivatives',
    content: `
      <h3>Limits</h3>
      <p>Concept of approaching a value. lim(x→a) f(x) = L.</p>
      <h3>Derivatives</h3>
      <p>Rate of change. Standard rules:</p>
      <ul>
        <li>d/dx(x<sup>n</sup>) = nx<sup>n-1</sup></li>
        <li>d/dx(sin x) = cos x</li>
        <li><strong>Product Rule</strong>: (uv)' = u'v + uv'</li>
      </ul>
    `
  },
  // Detailed CS Grade 11 Notes
  {
    id: 'note-cs-11-1-detailed',
    chapterId: 'cs-11-1',
    type: 'theory',
    title: 'Logic Gates — Detailed Notes',
    content: `
      <h3>Basic Gates</h3>
      <ul>
        <li><strong>AND</strong>: Output 1 only if all inputs are 1. (A.B)</li>
        <li><strong>OR</strong>: Output 1 if at least one input is 1. (A+B)</li>
        <li><strong>NOT</strong>: Inverts input. (A')</li>
      </ul>
      <h3>Derived Gates</h3>
      <ul>
        <li><strong>NAND</strong>: NOT of AND. Universal gate.</li>
        <li><strong>XOR</strong>: Output 1 if inputs are different.</li>
      </ul>
    `
  },
  // Detailed Notes for New Physics 11 Chapters
  {
    id: 'note-phy-11-6-detailed',
    chapterId: 'phy-11-6',
    type: 'theory',
    title: 'Heat & Thermodynamics — Detailed Notes',
    content: `
      <h3>Thermal Expansion</h3>
      <p>Expansion of solids/liquids with temperature.</p>
      <ul>
        <li><strong>Linear</strong>: L = L<sub>0</sub>(1 + αΔT)</li>
        <li><strong>Cubical</strong>: V = V<sub>0</sub>(1 + γΔT), where γ ≈ 3α</li>
      </ul>
      <h3>Ideal Gas Laws</h3>
      <ul>
        <li><strong>Boyle’s Law</strong>: PV = constant (at constant T)</li>
        <li><strong>Charles’s Law</strong>: V/T = constant (at constant P)</li>
        <li><strong>Equation</strong>: PV = nRT (R = 8.314 J/mol·K)</li>
      </ul>
    `
  },
  {
    id: 'note-phy-11-7-detailed',
    chapterId: 'phy-11-7',
    type: 'theory',
    title: 'Optics — Reflection & Refraction',
    content: `
      <h3>Reflection</h3>
      <p>Mirror Formula: 1/f = 1/u + 1/v. f is focal length, u is object distance, v is image distance.</p>
      <h3>Refraction</h3>
      <ul>
        <li><strong>Snell’s Law</strong>: n = sin i / sin r</li>
        <li><strong>Lens Maker’s Formula</strong>: 1/f = (n-1)(1/R<sub>1</sub> - 1/R<sub>2</sub>)</li>
        <li><strong>Power</strong>: P = 1/f (Diopters)</li>
      </ul>
    `
  },
  {
    id: 'note-phy-11-8-detailed',
    chapterId: 'phy-11-8',
    type: 'theory',
    title: 'Electrostatics — Detailed Notes',
    content: `
      <h3>Electric Field & Potential</h3>
      <ul>
        <li><strong>Coulomb’s Law</strong>: F = k q<sub>1</sub>q<sub>2</sub> / r²</li>
        <li><strong>Field (E)</strong>: F/q. <strong>Potential (V)</strong>: W/q.</li>
      </ul>
      <h3>Capacitors</h3>
      <p>Device to store charge. C = Q/V.</p>
      <ul>
        <li><strong>Parallel Plate</strong>: C = ε<sub>0</sub>A/d</li>
        <li><strong>Energy</strong>: U = ½CV²</li>
      </ul>
    `
  },
  // Detailed Notes for New Chemistry 11 Chapters
  {
    id: 'note-chem-11-5-detailed',
    chapterId: 'chem-11-5',
    type: 'theory',
    title: 'Chemical Equilibrium — Detailed Notes',
    content: `
      <h3>Equilibrium Constant</h3>
      <p>Ratio of product concentrations to reactant concentrations.</p>
      <ul>
        <li><strong>Kc</strong>: [Products] / [Reactants]</li>
        <li><strong>Kp</strong>: Partial pressures relation. Kp = Kc(RT)<sup>Δn</sup></li>
      </ul>
      <h3>Le Chatelier’s Principle</h3>
      <p>System shifts to counteract changes in concentration, pressure, or temperature.</p>
    `
  },
  {
    id: 'note-chem-11-6-detailed',
    chapterId: 'chem-11-6',
    type: 'theory',
    title: 'Organic Chemistry I — Basics',
    content: `
      <h3>IUPAC Naming</h3>
      <p>Prefix + Root + Suffix. E.g., Ethane, Ethanol.</p>
      <h3>Isomerism</h3>
      <p>Same formula, different structure.</p>
      <ul>
        <li><strong>Structural</strong>: Chain, Position, Functional.</li>
        <li><strong>Stereo</strong>: Cis-trans (Geometrical).</li>
      </ul>
      <h3>Hydrocarbons</h3>
      <p>Alkanes (substitution), Alkenes/Alkynes (addition reactions).</p>
    `
  },
  // Detailed Notes for New Biology 11 Chapters
  {
    id: 'note-bio-11-3-detailed',
    chapterId: 'bio-11-3',
    type: 'theory',
    title: 'Biodiversity — Five Kingdom Classification',
    content: `
      <h3>Whittaker’s Classification (1969)</h3>
      <ul>
        <li><strong>Monera</strong>: Prokaryotes (Bacteria).</li>
        <li><strong>Protista</strong>: Unicellular eukaryotes (Amoeba).</li>
        <li><strong>Fungi</strong>: Chitin cell wall, heterotrophs (Mushroom).</li>
        <li><strong>Plantae</strong>: Cellulose cell wall, autotrophs.</li>
        <li><strong>Animalia</strong>: No cell wall, heterotrophs.</li>
      </ul>
    `
  },
  {
    id: 'note-bio-11-4-detailed',
    chapterId: 'bio-11-4',
    type: 'theory',
    title: 'Ecology — Basics',
    content: `
      <h3>Ecosystem Components</h3>
      <ul>
        <li><strong>Biotic</strong>: Producers, Consumers, Decomposers.</li>
        <li><strong>Abiotic</strong>: Light, Soil, Water, Temperature.</li>
      </ul>
      <h3>Trophic Levels</h3>
      <p>Flow of energy: Producer → Primary Consumer → Secondary Consumer.</p>
    `
  },
  // --- ENRICHED CONTENT: PHYSICS GRADE 11 ---
  {
    id: 'note-phy-11-mech-detailed',
    chapterId: 'phy-11-1',
    type: 'theory',
    title: 'Units & Dimensions - In Depth',
    content: `
      <h3>Fundamental & Derived Units</h3>
      <p><strong>Fundamental:</strong> Mass (kg), Length (m), Time (s), Current (A), Temp (K), Amount (mol), Luminous Intensity (cd).</p>
      <p><strong>Derived:</strong> Force (N = kg·m/s²), Work (J = N·m), Power (W = J/s).</p>
      <h3>Dimensional Analysis</h3>
      <ul>
        <li>Force: [MLT⁻²]</li>
        <li>Work/Energy: [ML²T⁻²]</li>
        <li>Power: [ML²T⁻³]</li>
        <li>Pressure/Stress: [ML⁻¹T⁻²]</li>
      </ul>
      <p><strong>Uses:</strong> Checking equation correctness, deriving relationships, converting units.</p>
    `
  },
  {
    id: 'note-phy-11-vec-detailed',
    chapterId: 'phy-11-2',
    type: 'formula',
    title: 'Vector Algebra Formulas',
    content: `
      <p><strong>Dot Product:</strong> A · B = |A||B|cosθ (Scalar)</p>
      <p><strong>Cross Product:</strong> A × B = |A||B|sinθ n̂ (Vector)</p>
      <p><strong>Resultant:</strong> R = √(A² + B² + 2ABcosθ)</p>
      <p><strong>Direction (α):</strong> tanα = (Bsinθ) / (A + Bcosθ)</p>
    `
  },
  {
    id: 'note-phy-11-kin-detailed',
    chapterId: 'phy-11-3',
    type: 'theory',
    title: 'Kinematics & Projectiles',
    content: `
      <h3>Equations of Motion (Uniform Acc.)</h3>
      <ul>
        <li>v = u + at</li>
        <li>s = ut + ½at²</li>
        <li>v² = u² + 2as</li>
      </ul>
      <h3>Projectile Motion</h3>
      <p><strong>Time of Flight:</strong> T = 2u sinθ / g</p>
      <p><strong>Max Height:</strong> H = u² sin²θ / 2g</p>
      <p><strong>Horizontal Range:</strong> R = u² sin2θ / g</p>
      <p><strong>Max Range:</strong> At θ = 45°, Rmax = u²/g</p>
    `
  },
  {
    id: 'note-phy-11-heat-detailed',
    chapterId: 'phy-11-6',
    type: 'theory',
    title: 'Heat & Thermodynamics Summary',
    content: `
      <h3>Thermal Expansion</h3>
      <p>Linear (α), Superficial (β), Cubical (γ). Relation: β = 2α, γ = 3α.</p>
      <p>L₂ = L₁(1 + αΔT)</p>
      <h3>Gas Laws</h3>
      <ul>
        <li><strong>Boyle's Law:</strong> PV = k (const T)</li>
        <li><strong>Charles's Law:</strong> V/T = k (const P)</li>
        <li><strong>Ideal Gas Eq:</strong> PV = nRT (R = 8.314 J/mol·K)</li>
      </ul>
      <h3>First Law of Thermodynamics</h3>
      <p>dQ = dU + dW (Conservation of Energy)</p>
      <p>Isothermal: dT=0, dU=0 ⇒ dQ = dW</p>
      <p>Adiabatic: dQ=0 ⇒ dU = -dW</p>
    `
  },
  // --- ENRICHED CONTENT: PHYSICS GRADE 12 ---
  {
    id: 'note-phy-12-optics-detailed',
    chapterId: 'phy-12-1',
    type: 'theory',
    title: 'Wave Optics: Interference & Diffraction',
    content: `
      <h3>Young's Double Slit Experiment (YDSE)</h3>
      <p><strong>Path Diff:</strong> Δx = d sinθ ≈ dy/D</p>
      <p><strong>Constructive (Bright):</strong> Δx = nλ</p>
      <p><strong>Destructive (Dark):</strong> Δx = (2n-1)λ/2</p>
      <p><strong>Fringe Width (β):</strong> β = λD/d</p>
      <h3>Polarization</h3>
      <p><strong>Brewster's Law:</strong> μ = tan(ip)</p>
      <p><strong>Malus's Law:</strong> I = I₀ cos²θ</p>
    `
  },
  {
    id: 'note-phy-12-modern-detailed',
    chapterId: 'phy-12-3',
    type: 'theory',
    title: 'Modern Physics Key Concepts',
    content: `
      <h3>Photoelectric Effect</h3>
      <p>Einstein's Eq: hf = Φ + KEmax</p>
      <p>Work Function (Φ) = hf₀ (threshold freq)</p>
      <h3>Bohr's Model</h3>
      <p>Angular Momentum: L = mvr = nh/2π</p>
      <p>Energy Levels: En = -13.6 eV / n²</p>
      <p>Rydberg Formula: 1/λ = R(1/n₁² - 1/n₂²)</p>
    `
  },
  // --- ENRICHED CONTENT: CHEMISTRY GRADE 11 ---
  {
    id: 'note-chem-11-atom-detailed',
    chapterId: 'chem-11-2',
    type: 'theory',
    title: 'Atomic Structure Deep Dive',
    content: `
      <h3>Quantum Numbers</h3>
      <ul>
        <li><strong>Principal (n):</strong> Energy shell (1, 2, 3...)</li>
        <li><strong>Azimuthal (l):</strong> Subshell shape (0=s, 1=p, 2=d, 3=f). 0 to n-1.</li>
        <li><strong>Magnetic (m):</strong> Orbital orientation (-l to +l).</li>
        <li><strong>Spin (s):</strong> Electron spin (+½, -½).</li>
      </ul>
      <h3>Rules</h3>
      <p><strong>Aufbau:</strong> Fill lowest energy first (1s<2s<2p...).</p>
      <p><strong>Pauli Exclusion:</strong> No two electrons same 4 quantum numbers.</p>
      <p><strong>Hund's Rule:</strong> Maximize unpaired spins in degenerate orbitals.</p>
    `
  },
  {
    id: 'note-chem-11-bond-detailed',
    chapterId: 'chem-11-3',
    type: 'theory',
    title: 'Chemical Bonding Theories',
    content: `
      <h3>VSEPR Theory</h3>
      <p>Predicts geometry based on electron pairs repulsion (lp-lp > lp-bp > bp-bp).</p>
      <ul>
        <li>2 bp: Linear (180°)</li>
        <li>3 bp: Trigonal Planar (120°)</li>
        <li>4 bp: Tetrahedral (109.5°)</li>
        <li>3 bp + 1 lp: Pyramidal (NH₃)</li>
        <li>2 bp + 2 lp: Bent (H₂O)</li>
      </ul>
      <h3>Hybridization</h3>
      <p>Mixing atomic orbitals to form new equivalent orbitals (sp, sp², sp³, dsp²).</p>
    `
  },
  // --- ENRICHED CONTENT: CHEMISTRY GRADE 12 ---
  {
    id: 'note-chem-12-vol-detailed',
    chapterId: 'chem-12-1',
    type: 'formula',
    title: 'Volumetric Analysis Formulas',
    content: `
      <p><strong>Normality (N):</strong> Gram Eq. Wt. per Litre.</p>
      <p><strong>Molarity (M):</strong> Moles per Litre.</p>
      <p><strong>Relation:</strong> N = M × n-factor (valency/acidity/basicity)</p>
      <p><strong>Titration Eq:</strong> N₁V₁ = N₂V₂</p>
      <p><strong>% Purity:</strong> (Pure Mass / Impure Mass) × 100</p>
    `
  },
  {
    id: 'note-chem-12-org-detailed',
    chapterId: 'chem-12-2',
    type: 'theory',
    title: 'Organic Mechanisms',
    content: `
      <h3>SN1 vs SN2</h3>
      <p><strong>SN1:</strong> Unimolecular, 2 steps, Carbocation intermediate, Racemization. Favored by tertiary halides, polar protic solvents.</p>
      <p><strong>SN2:</strong> Bimolecular, 1 step, Transition state, Inversion of config (Walden). Favored by primary halides, aprotic solvents.</p>
      <h3>Name Reactions</h3>
      <ul>
        <li><strong>Williamson Ether:</strong> R-X + R'ONa → R-O-R'</li>
        <li><strong>Reimer-Tiemann:</strong> Phenol + CHCl₃ + KOH → Salicylaldehyde</li>
        <li><strong>Cannizzaro:</strong> Aldehydes w/o α-H (HCHO) disproportionate.</li>
        <li><strong>Aldol:</strong> Aldehydes w/ α-H condense to β-hydroxy aldehyde.</li>
      </ul>
    `
  },
  // --- ENRICHED CONTENT: COMPUTER SCIENCE ---
  {
    id: 'note-cs-12-c-detailed',
    chapterId: 'cs-12-3',
    type: 'theory',
    title: 'Advanced C: Pointers & Files',
    content: `
      <h3>Pointers</h3>
      <p>Variable storing memory address. Declaration: <code>int *ptr;</code></p>
      <p>Address of operator (&), Value at address (*).</p>
      <h3>File Handling</h3>
      <p><code>FILE *fp;</code></p>
      <ul>
        <li><code>fopen("file.txt", "w")</code>: Open for writing.</li>
        <li><code>fprintf(fp, "text")</code>: Write formatted output.</li>
        <li><code>fscanf(fp, "%d", &var)</code>: Read formatted input.</li>
        <li><code>fclose(fp)</code>: Close file.</li>
      </ul>
    `
  },
  {
    id: 'note-cs-12-dbms-detailed',
    chapterId: 'cs-12-1',
    type: 'theory',
    title: 'DBMS & SQL Concepts',
    content: `
      <h3>Normalization</h3>
      <p>Process to minimize redundancy. 1NF (Atomic), 2NF (No partial dependency), 3NF (No transitive dependency).</p>
      <h3>SQL Commands</h3>
      <ul>
        <li><strong>DDL:</strong> CREATE, ALTER, DROP, TRUNCATE.</li>
        <li><strong>DML:</strong> INSERT, UPDATE, DELETE, SELECT.</li>
        <li><strong>DCL:</strong> GRANT, REVOKE.</li>
        <li><strong>TCL:</strong> COMMIT, ROLLBACK.</li>
      </ul>
      <p>Ex: <code>SELECT * FROM Students WHERE Grade=12;</code></p>
    `
  },
  {
    id: 'note-cs-web-detailed',
    chapterId: 'cs-12-2',
    type: 'theory',
    title: 'Web Tech II: PHP & JS',
    content: `
      <h3>JavaScript (Client-side)</h3>
      <p>Dynamic interactivity. DOM manipulation: <code>document.getElementById()</code>. Events: <code>onclick</code>, <code>onload</code>.</p>
      <h3>PHP (Server-side)</h3>
      <p>Scripting language. Variables: <code>$var</code>. DB Connection: <code>mysqli_connect()</code>.</p>
      <p>Form Handling: <code>$_GET</code> (visible URL), <code>$_POST</code> (secure).</p>
    `
  },
  // --- ADDITIONAL CONTENT: ENGLISH GRADE 11 ---
  {
    id: 'note-eng-11-lit-overview',
    chapterId: 'eng-11-lit-ss',
    type: 'theory',
    title: 'Short Stories: The Selfish Giant',
    content: `
      <h3>Plot Summary</h3>
      <p>A giant forbids children from playing in his garden, causing it to fall into eternal winter. One day, children sneak in, bringing spring back. The giant realizes his selfishness and befriends them, especially a small boy who turns out to be Christ figure.</p>
      <h3>Themes</h3>
      <p>Redemption, love, selfishness vs. generosity, and the nature of paradise.</p>
    `
  },
  {
    id: 'note-eng-11-grammar-tense',
    chapterId: 'eng-11-1',
    type: 'theory',
    title: 'Grammar: Tense & Aspect',
    content: `
      <h3>Present Tense</h3>
      <p><strong>Simple:</strong> General truths (Water boils at 100°C).</p>
      <p><strong>Continuous:</strong> Happening now (I am writing).</p>
      <p><strong>Perfect:</strong> Completed recently (I have eaten).</p>
      <h3>Past Tense</h3>
      <p><strong>Simple:</strong> Completed action (He left yesterday).</p>
      <p><strong>Continuous:</strong> Ongoing in past (He was sleeping).</p>
    `
  },
  // --- ADDITIONAL CONTENT: NEPALI GRADE 11 ---
  {
    id: 'note-nep-11-bir-purkha',
    chapterId: 'nep-11-1',
    type: 'theory',
    title: 'वीर पुर्खा (कविता) - सारांश',
    content: `
      <h3>मूल भाव</h3>
      <p>यस कवितामा कविले नेपाली वीर पुर्खाहरूको वीरता, साहस र बलिदानको गाथा गाएका छन्। नेपालको सिमाना पूर्वमा टिस्टा र पश्चिममा काँगडासम्म पुर्याउने पुर्खाहरूको योगदानलाई सम्मान गरिएको छ।</p>
      <h3>मुख्य बुँदाहरू</h3>
      <ul>
        <li>नेपालीहरूको वीरता र स्वाभिमान।</li>
        <li>प्राकृतिक कठिनाइहरू (पहाड, नदी) छिचोल्दै अघि बढ्ने साहस।</li>
        <li>इतिहासको गौरवमय क्षणहरूको स्मरण।</li>
      </ul>
    `
  },
  {
    id: 'note-nep-11-gauko-maya',
    chapterId: 'nep-11-2',
    type: 'theory',
    title: 'गाउँको माया (कथा) - समीक्षा',
    content: `
      <h3>कथाको सार</h3>
      <p>यो एक सामाजिक कथा हो जसले वैदेशिक रोजगारी र शहर पस्ने प्रवृत्तिका कारण गाउँहरू रित्तिँदै गएको यथार्थ चित्रण गर्छ। गाउँको अर्गानिक जीवनशैली, आत्मीयता र प्रकृतिप्रेमलाई मुख्य विषय बनाइएको छ।</p>
      <h3>सन्देश</h3>
      <p>गाउँको विकास र संरक्षण गर्नुपर्ने आवश्यकता। आफ्नो माटो र संस्कृतिप्रतिको प्रेम।</p>
    `
  },
  // --- ADDITIONAL CONTENT: ENGLISH GRADE 12 ---
  {
    id: 'note-eng-12-lit-neighbours',
    chapterId: 'eng-12-full',
    type: 'theory',
    title: 'Story: Neighbours (Tim Winton)',
    content: `
      <h3>Summary</h3>
      <p>A young couple moves into a multicultural suburb. Initially prejudiced against their European neighbors, they gradually learn to appreciate the community's warmth and support, especially after the birth of their child.</p>
      <h3>Themes</h3>
      <p>Multiculturalism, transition, prejudice vs. acceptance, and community bonding.</p>
    `
  },
  // --- ADDITIONAL CONTENT: NEPALI GRADE 12 ---
  {
    id: 'note-nep-12-aama-sapana',
    chapterId: 'nep-12-1',
    type: 'theory',
    title: 'आमाको सपना (कविता) - विश्लेषण',
    content: `
      <h3>कवि: गोपालप्रसाद रिमाल</h3>
      <p>यस कवितामा आमा (नेपाल आमा) ले आफ्नो छोरा (नेपाली जनता) सँग क्रान्ति र परिवर्तनको सपना देखेको कुरा व्यक्त गरिएको छ। अन्धकार हटेर सुनौलो बिहानी आउने विश्वास प्रकट गरिएको छ।</p>
      <h3>प्रतीकहरू</h3>
      <ul>
        <li><strong>आमा:</strong> नेपाल राष्ट्र।</li>
        <li><strong>छोरा:</strong> परिवर्तनकारी युवा/जनता।</li>
        <li><strong>सपना:</strong> प्रजातन्त्र र स्वतन्त्रताको प्राप्ति।</li>
      </ul>
    `
  },
  // --- ENRICHED CONTENT: MATHEMATICS ---
  {
    id: 'note-math-11-calc-detailed',
    chapterId: 'math-11-3',
    type: 'formula',
    title: 'Calculus: Limits & Derivatives',
    content: `
      <h3>Limits</h3>
      <p>lim(x→a) (xⁿ - aⁿ)/(x - a) = n·aⁿ⁻¹</p>
      <p>lim(x→0) (sin x)/x = 1</p>
      <p>lim(x→0) (eˣ - 1)/x = 1</p>
      <h3>Derivatives</h3>
      <ul>
        <li>d/dx(xⁿ) = nxⁿ⁻¹</li>
        <li>d/dx(sin x) = cos x</li>
        <li>d/dx(ln x) = 1/x</li>
        <li>Product Rule: d/dx(uv) = u'v + uv'</li>
      </ul>
    `
  },
  {
    id: 'note-math-12-int-detailed',
    chapterId: 'math-12-2',
    type: 'formula',
    title: 'Integrals: Standard Forms',
    content: `
      <h3>Indefinite Integrals</h3>
      <ul>
        <li>∫ xⁿ dx = xⁿ⁺¹/(n+1) + C</li>
        <li>∫ (1/x) dx = ln|x| + C</li>
        <li>∫ eˣ dx = eˣ + C</li>
      </ul>
      <h3>Integration by Parts</h3>
      <p>∫ u v dx = u ∫v dx - ∫(u' ∫v dx) dx</p>
      <p>Order of choice (ILATE): Inverse, Log, Alg, Trig, Exp.</p>
    `
  },
  // --- ENRICHED CONTENT: BIOLOGY ---
  {
    id: 'note-bio-12-gen-detailed',
    chapterId: 'bio-12-2',
    type: 'theory',
    title: 'Genetics: Molecular Basis',
    content: `
      <h3>DNA Structure</h3>
      <p>Double helix model (Watson & Crick). Nucleotides: Sugar + Phosphate + Nitrogen Base (A, T, G, C).</p>
      <p>Base Pairing: A=T (2 H-bonds), G≡C (3 H-bonds).</p>
      <h3>Central Dogma</h3>
      <p>DNA → (Transcription) → mRNA → (Translation) → Protein.</p>
      <h3>Mendel's Laws</h3>
      <p>1. Law of Dominance.</p>
      <p>2. Law of Segregation (Purity of Gametes).</p>
      <p>3. Law of Independent Assortment.</p>
    `
  },
  // --- ADDITIONAL CONTENT: PHYSICS GRADE 11 ---
  {
    id: 'note-phy-11-electrostatics-detailed',
    chapterId: 'phy-11-8',
    type: 'theory',
    title: 'Electrostatics — Gauss Law & Potential',
    content: `
      <h3>Gauss's Law</h3>
      <p>Total flux Φ through a closed surface is q/ε₀. Φ = ∮ E·dA = q/ε₀.</p>
      <h3>Applications</h3>
      <ul>
        <li><strong>Line Charge:</strong> E = λ / (2πε₀r)</li>
        <li><strong>Sheet Charge:</strong> E = σ / (2ε₀)</li>
        <li><strong>Spherical Shell:</strong> E = 0 (inside), E = kQ/r² (outside)</li>
      </ul>
      <h3>Electric Potential</h3>
      <p>Work done to move unit positive charge. V = kQ/r. Equipotential surfaces are perpendicular to E-field lines.</p>
    `
  },
  {
    id: 'note-phy-11-waves-detailed',
    chapterId: 'phy-11-7', 
    type: 'theory',
    title: 'Waves & Sound — Doppler Effect',
    content: `
      <h3>Doppler Effect</h3>
      <p>Apparent change in frequency due to relative motion.</p>
      <p>f' = f (v ± v₀) / (v ∓ vₛ)</p>
      <ul>
        <li>Observer towards source: (+) numerator.</li>
        <li>Source towards observer: (-) denominator.</li>
      </ul>
      <h3>Stationary Waves</h3>
      <p>Formed by superposition of two identical waves traveling in opposite directions. Nodes (zero amplitude), Antinodes (max amplitude).</p>
      <p>Open Pipe: f = nv/2L (All harmonics). Closed Pipe: f = nv/4L (Odd harmonics only).</p>
    `
  },
  // --- ADDITIONAL CONTENT: PHYSICS GRADE 12 ---
  {
    id: 'note-phy-12-current-detailed',
    chapterId: 'phy-12-2',
    type: 'theory',
    title: 'Current Electricity — Circuits',
    content: `
      <h3>Kirchhoff's Laws</h3>
      <ul>
        <li><strong>KCL (Junction Rule):</strong> ΣI = 0 (Conservation of Charge).</li>
        <li><strong>KVL (Loop Rule):</strong> ΣΔV = 0 (Conservation of Energy).</li>
      </ul>
      <h3>Potentiometer</h3>
      <p>Measures EMF accurately (no current drawn). Principle: V ∝ l.</p>
      <p>Comparison of EMFs: E₁/E₂ = l₁/l₂. Internal Resistance: r = R(l₁/l₂ - 1).</p>
      <h3>Wheatstone Bridge</h3>
      <p>Balanced condition: P/Q = R/S. No current flows through galvanometer.</p>
    `
  },
  {
    id: 'note-phy-12-mag-detailed',
    chapterId: 'phy-12-6',
    type: 'theory',
    title: 'Magnetic Effects — Biot-Savart & Ampere',
    content: `
      <h3>Biot-Savart Law</h3>
      <p>dB = (μ₀/4π) (I dl sinθ / r²).</p>
      <p><strong>Straight Wire:</strong> B = μ₀I / 2πr (Infinite length).</p>
      <p><strong>Circular Loop (Center):</strong> B = μ₀I / 2R.</p>
      <h3>Ampere's Circuital Law</h3>
      <p>∮ B·dl = μ₀ I_enclosed. Used for Solenoid (B = μ₀nI) and Toroid.</p>
      <h3>Force on Conductor</h3>
      <p>F = I(L × B) = BIL sinθ. Force between parallel wires: F/L = μ₀I₁I₂ / 2πd.</p>
    `
  },
  {
    id: 'note-phy-12-ac-detailed',
    chapterId: 'phy-12-2',
    type: 'theory',
    title: 'Alternating Current (AC)',
    content: `
      <h3>LCR Series Circuit</h3>
      <p>Impedance Z = √[R² + (X_L - X_C)²]. Phase φ = tan⁻¹((X_L - X_C)/R).</p>
      <p><strong>Resonance:</strong> X_L = X_C ⇒ f = 1 / (2π√LC). Z is minimum (R), Current is maximum.</p>
      <p><strong>Power:</strong> P = V_rms I_rms cosφ (cosφ = Power Factor = R/Z).</p>
    `
  },
  // --- ADDITIONAL CONTENT: CHEMISTRY GRADE 11 ---
  {
    id: 'note-chem-11-states-detailed',
    chapterId: 'chem-11-4',
    type: 'theory',
    title: 'States of Matter — Real Gases',
    content: `
      <h3>Ideal vs Real Gases</h3>
      <p>Ideal gases follow PV=nRT at all conditions. Real gases deviate at high P and low T.</p>
      <h3>Van der Waals Equation</h3>
      <p>(P + an²/V²)(V - nb) = nRT</p>
      <ul>
        <li><strong>a:</strong> Intermolecular attraction correction.</li>
        <li><strong>b:</strong> Volume correction (excluded volume).</li>
      </ul>
      <h3>Dalton's Law</h3>
      <p>Total Pressure P_total = P₁ + P₂ + ... + Pₙ (Partial pressures).</p>
    `
  },
  {
    id: 'note-chem-11-ionic-detailed',
    chapterId: 'chem-11-5',
    type: 'theory',
    title: 'Ionic Equilibrium — pH & Buffers',
    content: `
      <h3>Ostwald's Dilution Law</h3>
      <p>Degree of dissociation α = √(Ka/C) for weak electrolytes.</p>
      <h3>pH Concept</h3>
      <p>pH = -log[H⁺]. pH + pOH = 14.</p>
      <h3>Buffer Solutions</h3>
      <p>Resist pH change. Henderson-Hasselbalch Eq:</p>
      <p>Acidic Buffer: pH = pKa + log([Salt]/[Acid]).</p>
      <p>Basic Buffer: pOH = pKb + log([Salt]/[Base]).</p>
    `
  },
  // --- ADDITIONAL CONTENT: CHEMISTRY GRADE 12 ---
  {
    id: 'note-chem-12-heavy-detailed',
    chapterId: 'chem-12-4',
    type: 'theory',
    title: 'Heavy Metals — Extraction',
    content: `
      <h3>Iron (Fe) — Hematite</h3>
      <p><strong>Blast Furnace:</strong> Reduction by CO.</p>
      <ul>
        <li>Zone of Reduction: Fe₂O₃ + CO → Fe.</li>
        <li>Zone of Fusion: Limestone (Flux) + Silica (Impurity) → Slag (CaSiO₃).</li>
      </ul>
      <h3>Copper (Cu) — Copper Pyrites</h3>
      <p><strong>Process:</strong> Froth Flotation → Roasting → Smelting (Matte: Cu₂S + FeS) → Bessemerization (Blister Copper) → Refining.</p>
      <h3>Zinc (Zn) — Zinc Blende</h3>
      <p>Roasting (ZnO) → Carbon Reduction (Vertical Retort Process).</p>
    `
  },
  {
    id: 'note-chem-12-trans-detailed',
    chapterId: 'chem-12-3',
    type: 'theory',
    title: 'Transition Metals (d-block)',
    content: `
      <h3>General Properties</h3>
      <ul>
        <li><strong>Variable Oxidation States:</strong> ns and (n-1)d electrons participate.</li>
        <li><strong>Color:</strong> d-d transition of unpaired electrons.</li>
        <li><strong>Magnetic Properties:</strong> Paramagnetic due to unpaired electrons. Magnetic Moment μ = √[n(n+2)] BM.</li>
        <li><strong>Complex Formation:</strong> Small size, high charge, vacant d-orbitals.</li>
      </ul>
      <h3>Lanthanide Contraction</h3>
      <p>Poor shielding by 4f electrons causes atomic size to decrease steadily, making Zr/Hf similar.</p>
    `
  },
  // --- ADDITIONAL CONTENT: BIOLOGY GRADE 11 ---
  {
    id: 'note-bio-11-botany-families',
    chapterId: 'bio-11-3',
    type: 'theory',
    title: 'Botany — Angiosperm Families',
    content: `
      <h3>Cruciferae (Brassicaceae)</h3>
      <p>Mustard Family. Flower: Tetramerous, Cruciform corolla. Stamens: Tetradynamous (2+4). Fruit: Siliqua.</p>
      <p>Floral Formula: ⊕ ⚥ K2+2 C4 A2+4 G(2).</p>
      <h3>Solanaceae</h3>
      <p>Potato Family. Flower: Pentamerous. Anthers: Epipetalous. Ovary: Obliquely placed, swollen placenta.</p>
      <p>Floral Formula: ⊕ ⚥ K(5) C(5) A5 G(2).</p>
      <h3>Leguminosae (Papilionaceae)</h3>
      <p>Pea Family. Corolla: Papilionaceous (Vexillary aestivation - Standard, Wings, Keel). Stamens: Diadelphous (9)+1.</p>
      <p>Floral Formula: % ⚥ K(5) C1+2+(2) A(9)+1 G1.</p>
    `
  },
  // --- ADDITIONAL CONTENT: BIOLOGY GRADE 12 ---
  {
    id: 'note-bio-12-nervous-detailed',
    chapterId: 'bio-12-1',
    type: 'theory',
    title: 'Nervous System — Synapse & Reflex',
    content: `
      <h3>Synaptic Transmission</h3>
      <p>Electrical signal → Ca²⁺ influx → Neurotransmitter release (Acetylcholine) → Binds to receptors → Na⁺ influx → Depolarization.</p>
      <h3>Reflex Arc</h3>
      <p>Receptor → Sensory Neuron → CNS (Interneuron) → Motor Neuron → Effector (Muscle). Involuntary and rapid.</p>
    `
  },
  {
    id: 'note-bio-12-endo-detailed',
    chapterId: 'bio-12-1',
    type: 'theory',
    title: 'Endocrine System — Hormones',
    content: `
      <h3>Pituitary Gland (Master Gland)</h3>
      <ul>
        <li><strong>Anterior:</strong> GH (Growth), TSH, ACTH, FSH/LH (Gonads), Prolactin.</li>
        <li><strong>Posterior:</strong> ADH (Water balance), Oxytocin (Birth/Milk).</li>
      </ul>
      <h3>Other Glands</h3>
      <ul>
        <li><strong>Thyroid:</strong> Thyroxine (T3/T4) - Metabolism.</li>
        <li><strong>Pancreas:</strong> Insulin (Beta cells - lowers glucose), Glucagon (Alpha cells - raises glucose).</li>
        <li><strong>Adrenal:</strong> Adrenaline (Flight/Fight), Cortisol (Stress).</li>
      </ul>
    `
  },
  {
    id: 'note-bio-12-applied-detailed',
    chapterId: 'bio-12-4',
    type: 'theory',
    title: 'Applied Biology — Biotech',
    content: `
      <h3>Tissue Culture</h3>
      <p>Growing cells in sterile medium (nutrient agar). Totipotency: Ability of a cell to generate whole plant.</p>
      <p>Steps: Explant → Callus → Organogenesis → Plantlet → Hardening.</p>
      <h3>Recombinant DNA Technology</h3>
      <p>1. Isolation of DNA. 2. Cutting with Restriction Endonucleases (Molecular Scissors). 3. Ligation (DNA Ligase) into Vector (Plasmid). 4. Transformation into Host (E. coli). 5. Selection & Culture.</p>
    `
  },
  // --- ADDITIONAL CONTENT: COMPUTER SCIENCE GRADE 11 ---
  {
    id: 'note-cs-11-num-detailed',
    chapterId: 'cs-11-1',
    type: 'theory',
    title: 'Number Systems & Boolean Algebra',
    content: `
      <h3>Conversions</h3>
      <ul>
        <li><strong>Binary to Decimal:</strong> Sum of digit × 2ⁿ.</li>
        <li><strong>Decimal to Binary:</strong> Repeated division by 2.</li>
        <li><strong>Hexadecimal:</strong> Base 16 (0-9, A-F). 1 Hex digit = 4 Binary bits.</li>
      </ul>
      <h3>Logic Gates</h3>
      <ul>
        <li><strong>Universal Gates:</strong> NAND, NOR (Can implement any Boolean function).</li>
        <li><strong>XOR:</strong> Output 1 if inputs are different.</li>
      </ul>
      <h3>Boolean Laws</h3>
      <p>De Morgan's: (A+B)' = A'.B' and (A.B)' = A' + B'.</p>
    `
  },
  // --- ADDITIONAL CONTENT: COMPUTER SCIENCE GRADE 12 ---
  {
    id: 'note-cs-12-net-detailed',
    chapterId: 'cs-12-4',
    type: 'theory',
    title: 'Networking — OSI Model',
    content: `
      <h3>OSI Reference Model (7 Layers)</h3>
      <ol>
        <li><strong>Physical:</strong> Bits, Cables, Hubs.</li>
        <li><strong>Data Link:</strong> Frames, MAC Address, Switch.</li>
        <li><strong>Network:</strong> Packets, IP Address, Router.</li>
        <li><strong>Transport:</strong> Segments, TCP/UDP (Reliability).</li>
        <li><strong>Session:</strong> Session management.</li>
        <li><strong>Presentation:</strong> Encryption, Compression.</li>
        <li><strong>Application:</strong> HTTP, FTP, SMTP (User Interface).</li>
      </ol>
      <h3>Topologies</h3>
      <p>Star (Central hub), Bus (Single cable), Ring, Mesh (Full connection).</p>
    `
  },
  {
    id: 'note-cs-12-c-struct-detailed',
    chapterId: 'cs-12-3',
    type: 'theory',
    title: 'C Programming — Struct vs Union',
    content: `
      <h3>Structure (struct)</h3>
      <p>Allocates memory for ALL members. Size = Sum of members (plus padding).</p>
      <p><code>struct Point { int x; int y; };</code></p>
      <h3>Union</h3>
      <p>Allocates memory for LARGEST member only. Shared memory space.</p>
      <p>Useful for memory saving when only one member is used at a time.</p>
    `
  },
];

export const pastPapers: PastPaper[] = [
  {
    id: 'pp-phy-2080',
    subjectId: 'phy',
    chapterId: 'phy-11-1', 
    year: 2080,
    title: 'NEB Grade 11 Physics Model Question 2080',
    pdfUrl: 'https://readersnepal.com/neb-class-11-science-all-subject-model-question',
    hasSolutions: true,
  },
  {
    id: 'pp-chem-2079',
    subjectId: 'chem',
    chapterId: 'chem-11-1',
    year: 2079,
    title: 'NEB Grade 11 Chemistry 2079',
    pdfUrl: 'https://readersnepal.com/neb-class-11-science-all-subject-model-question',
    hasSolutions: false,
  },
  {
    id: 'pp-cs-2080',
    subjectId: 'cs',
    chapterId: 'cs-11-3',
    year: 2080,
    title: 'NEB Grade 11 Computer Science 2080',
    pdfUrl: 'https://readersnepal.com/neb-class-11-new-model-question-of-computer-science-2077',
    hasSolutions: true,
  },
  {
    id: 'pp-math-2078',
    subjectId: 'math',
    chapterId: 'math-11-1',
    year: 2078,
    title: 'NEB Grade 11 Mathematics 2078',
    pdfUrl: 'https://readersnepal.com/neb-class-11-new-model-question-and-grid-of-all-subject-2077',
    hasSolutions: true,
  },
  {
    id: 'pp-phy-2078-12',
    subjectId: 'phy',
    chapterId: 'phy-12-1',
    year: 2078,
    title: 'NEB Grade 12 Physics Board Exam 2078',
    pdfUrl: 'https://sajhanotes.com/neb-grade-12-paper/neb-grade-12-physics-model-question-paper/',
    hasSolutions: true,
  },
  {
    id: 'pp-chem-2078-12',
    subjectId: 'chem',
    chapterId: 'chem-12-1',
    year: 2078,
    title: 'NEB Grade 12 Chemistry Board Exam 2078',
    pdfUrl: 'https://sajhanotes.com/neb-grade-12-paper/neb-grade-12-chemistry-model-question-paper/',
    hasSolutions: true,
  },
  {
    id: 'pp-cs-2078-12',
    subjectId: 'cs',
    chapterId: 'cs-12-1',
    year: 2078,
    title: 'NEB Grade 12 Computer Science Board Exam 2078',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: false,
  },
  {
    id: 'pp-math-2078-12',
    subjectId: 'math',
    chapterId: 'math-12-2',
    year: 2078,
    title: 'NEB Grade 12 Mathematics Board Exam 2078',
    pdfUrl: 'https://sajhanotes.com/neb-grade-12-paper/neb-grade-12-math-model-paper-solution/',
    hasSolutions: true,
  },
  {
    id: 'pp-bio-2078-12',
    subjectId: 'bio',
    chapterId: 'bio-12-1',
    year: 2078,
    title: 'NEB Grade 12 Biology Board Exam 2078',
    pdfUrl: 'https://sajhanotes.com/neb-grade-12-paper/neb-grade-12-biology-model-question-paper/',
    hasSolutions: true,
  },
  {
    id: 'pp-nep-2078-12',
    subjectId: 'nep',
    chapterId: 'nep-12-5',
    year: 2078,
    title: 'NEB Grade 12 Nepali Board Exam 2078',
    pdfUrl: 'https://readersnepal.com/neb-class-12-all-subjects-board-exam-questions-2078',
    hasSolutions: false,
  },
  {
    id: 'pp-eng-2078-12',
    subjectId: 'eng',
    chapterId: 'eng-12-full',
    year: 2078,
    title: 'NEB Grade 12 English Board Exam 2078',
    pdfUrl: 'https://readersnepal.com/neb-class-12-all-subjects-board-exam-questions-2078',
    hasSolutions: false,
  },
  {
    id: 'pp-phy-2080-12',
    subjectId: 'phy',
    chapterId: 'phy-12-1',
    year: 2080,
    title: 'NEB Grade 12 Physics Board Exam 2080',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: true,
  },
  {
    id: 'pp-chem-2080-12',
    subjectId: 'chem',
    chapterId: 'chem-12-1',
    year: 2080,
    title: 'NEB Grade 12 Chemistry Board Exam 2080',
    pdfUrl: 'https://iswori.com.np/neb-class-12-chemistry-model-question-2080-solution/',
    hasSolutions: true,
  },
  {
    id: 'pp-math-2080-12',
    subjectId: 'math',
    chapterId: 'math-12-2',
    year: 2080,
    title: 'NEB Grade 12 Mathematics Board Exam 2080',
    pdfUrl: 'https://iswori.com.np/neb-class-12-math-model-question-2080-with-solution/',
    hasSolutions: true,
  },
  {
    id: 'pp-bio-2080-12',
    subjectId: 'bio',
    chapterId: 'bio-12-1',
    year: 2080,
    title: 'NEB Grade 12 Biology Board Exam 2080',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: false,
  },
  {
    id: 'pp-cs-2080-12',
    subjectId: 'cs',
    chapterId: 'cs-12-1',
    year: 2080,
    title: 'NEB Grade 12 Computer Science Board Exam 2080',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: false,
  },
  {
    id: 'pp-phy-2081-12',
    subjectId: 'phy',
    chapterId: 'phy-12-1',
    year: 2081,
    title: 'NEB Grade 12 Physics Board Exam 2081',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: false,
  },
  {
    id: 'pp-chem-2081-12',
    subjectId: 'chem',
    chapterId: 'chem-12-1',
    year: 2081,
    title: 'NEB Grade 12 Chemistry Board Exam 2081',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: false,
  },
  {
    id: 'pp-math-2081-12',
    subjectId: 'math',
    chapterId: 'math-12-2',
    year: 2081,
    title: 'NEB Grade 12 Mathematics Board Exam 2081',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: false,
  },
  {
    id: 'pp-bio-2081-12',
    subjectId: 'bio',
    chapterId: 'bio-12-1',
    year: 2081,
    title: 'NEB Grade 12 Biology Board Exam 2081',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: false,
  },
  {
    id: 'pp-cs-2081-12',
    subjectId: 'cs',
    chapterId: 'cs-12-1',
    year: 2081,
    title: 'NEB Grade 12 Computer Science Board Exam 2081',
    pdfUrl: 'https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects',
    hasSolutions: false,
  },
];

// Duplicate mockTests definition removed - original is at line 63

export const questions: Question[] = [
  // Physics Questions
  {
    id: 'q-bio-12-1',
    testId: 'test-bio-1',
    type: 'multiple-choice',
    question: 'Which enzyme is responsible for DNA replication?',
    options: ['DNA Polymerase', 'RNA Polymerase', 'Ligase', 'Helicase'],
    correctAnswer: 'DNA Polymerase',
    marks: 1,
    explanation: 'DNA Polymerase adds nucleotides to the growing DNA chain.',
  },
  {
    id: 'q-bio-12-2',
    testId: 'test-bio-1',
    type: 'multiple-choice',
    question: 'In a DNA molecule, Adenine (A) always pairs with:',
    options: ['Guanine', 'Cytosine', 'Thymine', 'Uracil'],
    correctAnswer: 'Thymine',
    marks: 1,
    explanation: 'A pairs with T via 2 hydrogen bonds.',
  },
  {
    id: 'q-bio-12-3',
    testId: 'test-bio-1',
    type: 'multiple-choice',
    question: 'The process of mRNA synthesis from DNA is called:',
    options: ['Translation', 'Transcription', 'Replication', 'Transduction'],
    correctAnswer: 'Transcription',
    marks: 1,
    explanation: 'Transcription creates mRNA from DNA template.',
  },
  {
    id: 'q-math-12-1',
    testId: 'test-math-1',
    type: 'multiple-choice',
    question: 'The derivative of sin(x) is:',
    options: ['cos(x)', '-cos(x)', 'tan(x)', 'sec²(x)'],
    correctAnswer: 'cos(x)',
    marks: 1,
    explanation: 'd/dx(sin x) = cos x.',
  },
  {
    id: 'q-math-12-2',
    testId: 'test-math-1',
    type: 'multiple-choice',
    question: 'Evaluate ∫ x dx:',
    options: ['x + C', 'x²/2 + C', '2x + C', 'ln(x) + C'],
    correctAnswer: 'x²/2 + C',
    marks: 1,
    explanation: 'Power rule: ∫ x^n dx = x^(n+1)/(n+1). Here n=1.',
  },
  {
    id: 'q-math-12-3',
    testId: 'test-math-1',
    type: 'multiple-choice',
    question: 'If y = e^(2x), find dy/dx.',
    options: ['e^(2x)', '2e^(2x)', 'e^x', '2x'],
    correctAnswer: '2e^(2x)',
    marks: 1,
    explanation: 'Chain rule: d/dx(e^(u)) = e^u * du/dx.',
  },
  {
    id: 'q-phy-1-1',
    testId: 'test-phy-1',
    type: 'multiple-choice',
    question: 'Which of the following is a fundamental unit?',
    options: ['Newton', 'Watt', 'Ampere', 'Joule'],
    correctAnswer: 'Ampere',
    marks: 1,
    explanation: 'Ampere is one of the 7 fundamental SI units.',
  },
  {
    id: 'q-phy-1-2',
    testId: 'test-phy-1',
    type: 'multiple-choice',
    question: 'The dimension of work is:',
    options: ['[MLT^-1]', '[ML^2T^-2]', '[MLT^-2]', '[ML^2T^-1]'],
    correctAnswer: '[ML^2T^-2]',
    marks: 1,
    explanation: 'Work = Force x Displacement = [MLT^-2] x [L] = [ML^2T^-2].',
  },
  
  // CS Questions - C Programming
  {
    id: 'q-cs-2-1',
    testId: 'test-cs-2',
    type: 'multiple-choice',
    question: 'Who is known as the father of C language?',
    options: ['James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup', 'Guido van Rossum'],
    correctAnswer: 'Dennis Ritchie',
    marks: 1,
    explanation: 'Dennis Ritchie developed C at Bell Labs in 1972.',
  },
  {
    id: 'q-cs-2-2',
    testId: 'test-cs-2',
    type: 'multiple-choice',
    question: 'Which of the following is the correct syntax to print "Hello World" in C?',
    options: ['print("Hello World");', 'echo "Hello World";', 'printf("Hello World");', 'Console.WriteLine("Hello World");'],
    correctAnswer: 'printf("Hello World");',
    marks: 1,
    explanation: 'printf() is the standard output function in C.',
  },
  {
    id: 'q-cs-2-3',
    testId: 'test-cs-2',
    type: 'short-answer',
    question: 'What is the output of: int a=5; printf("%d", a++);',
    correctAnswer: '5',
    marks: 2,
    explanation: 'The post-increment operator (a++) returns the value first (5) and then increments it.',
  },

  // CS Questions - HTML
  {
    id: 'q-cs-3-1',
    testId: 'test-cs-3',
    type: 'multiple-choice',
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tabular Markup Language', 'None of these'],
    correctAnswer: 'Hyper Text Markup Language',
    marks: 1,
    explanation: 'HTML stands for Hyper Text Markup Language.',
  },
  {
    id: 'q-chem-1-1',
    testId: 'test-chem-1',
    type: 'multiple-choice',
    question: 'Stoichiometry is primarily based on which law?',
    options: ['Law of conservation of mass', 'Boyle’s law', 'Raoult’s law', 'Henry’s law'],
    correctAnswer: 'Law of conservation of mass',
    marks: 1,
    explanation: 'Balanced equations reflect conservation of mass between reactants and products.',
  },
  {
    id: 'q-chem-1-2',
    testId: 'test-chem-1',
    type: 'multiple-choice',
    question: 'In the reaction: CH4 + 2O2 → CO2 + 2H2O, how many moles of water form per mole of methane?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    marks: 1,
    explanation: 'Coefficients indicate 1 mol CH4 produces 2 mol H2O.',
  },
  {
    id: 'q-chem-1-3',
    testId: 'test-chem-1',
    type: 'short-answer',
    question: 'Define limiting reagent.',
    correctAnswer: 'The reactant that is completely consumed first and limits product formation',
    marks: 2,
    explanation: 'It determines the maximum amount of product that can be formed.',
  },
  {
    id: 'q-chem-1-4',
    testId: 'test-chem-1',
    type: 'multiple-choice',
    question: 'What is the molar ratio of O2 to CH4 in complete combustion of methane?',
    options: ['1:1', '2:1', '1:2', '3:1'],
    correctAnswer: '2:1',
    marks: 1,
    explanation: 'CH4 + 2O2 → CO2 + 2H2O requires 2 moles of O2 per mole of CH4.',
  },
  {
    id: 'q-chem-1-5',
    testId: 'test-chem-1',
    type: 'multiple-choice',
    question: 'One mole of CO2 contains how many molecules?',
    options: ['6.022×10^22', '6.022×10^23', '3.00×10^23', '1.00×10^23'],
    correctAnswer: '6.022×10^23',
    marks: 1,
    explanation: 'One mole equals Avogadro’s number of molecules.',
  },

  // Physics Grade 12 Model 2080 Questions
  {
    id: 'q-phy-2080-1',
    testId: 'test-phy-2080-model',
    type: 'multiple-choice',
    question: 'The product of moment of inertia and angular velocity gives:',
    options: ['Force', 'Torque', 'Linear Momentum', 'Angular Momentum'],
    correctAnswer: 'Angular Momentum',
    marks: 1,
    explanation: 'L = Iω',
  },
  {
    id: 'q-phy-2080-2',
    testId: 'test-phy-2080-model',
    type: 'multiple-choice',
    question: 'The bob of a simple pendulum (mass 0.40 kg) has PE = 0.044J at extreme. What is KE at mean position?',
    options: ['0.022 J', '0.044 J', '0.011 J', '0.033 J'],
    correctAnswer: '0.044 J',
    marks: 1,
    explanation: 'Total energy is conserved. PE at extreme = KE at mean.',
  },
  {
    id: 'q-phy-2080-3',
    testId: 'test-phy-2080-model',
    type: 'multiple-choice',
    question: 'What causes earthquakes?',
    options: ['Flow of magma', 'Expansion of earth crust', 'Rubbing of earth plates', 'Tsunami'],
    correctAnswer: 'Rubbing of earth plates',
    marks: 1,
    explanation: 'Tectonic plate movements cause earthquakes.',
  },
  {
    id: 'q-phy-2080-4',
    testId: 'test-phy-2080-model',
    type: 'multiple-choice',
    question: 'What percentage of original radioactive atoms is left after 4 half-lives?',
    options: ['1%', '6%', '10%', '20%'],
    correctAnswer: '6%',
    marks: 1,
    explanation: '(1/2)^4 = 1/16 = 6.25% ≈ 6%.',
  },
  {
    id: 'q-phy-2080-6',
    testId: 'test-phy-2080-model',
    type: 'multiple-choice',
    question: 'Which property of sound is affected by change in air temperature?',
    options: ['Amplitude', 'Frequency', 'Wavelength', 'Intensity'],
    correctAnswer: 'Wavelength',
    marks: 1,
    explanation: 'Speed changes with temp, f is constant source property, so λ = v/f changes.',
  },
  {
    id: 'q-phy-2080-7',
    testId: 'test-phy-2080-model',
    type: 'multiple-choice',
    question: 'Internal energy of an ideal gas depends on:',
    options: ['Volume only', 'Pressure only', 'Temperature only', 'Both P and V'],
    correctAnswer: 'Temperature only',
    marks: 1,
    explanation: 'For ideal gas, U is a function of T only.',
  },
  {
    id: 'q-phy-2080-8',
    testId: 'test-phy-2080-model',
    type: 'multiple-choice',
    question: 'In which process is work done maximum?',
    options: ['Isothermal', 'Isobaric', 'Adiabatic', 'Isochoric'],
    correctAnswer: 'Isobaric',
    marks: 1,
    explanation: 'Area under PV graph is largest for isobaric expansion.',
  },
  {
    id: 'q-phy-2080-11',
    testId: 'test-phy-2080-model',
    type: 'multiple-choice',
    question: 'Why are laminated cores used in transformers?',
    options: ['Reduce hysteresis loss', 'Reduce eddy current', 'Reduce magnetic effect', 'Increase coercivity'],
    correctAnswer: 'Reduce eddy current',
    marks: 1,
    explanation: 'Laminations increase resistance to eddy currents.',
  },

  // Chemistry Grade 12 Model 2080 Questions
  {
    id: 'q-chem-2080-1',
    testId: 'test-chem-2080-model',
    type: 'multiple-choice',
    question: 'Identify the equivalent weight of K2Cr2O7 (M) in acidic medium.',
    options: ['M/3', 'M/6', 'M/2', 'M/5'],
    correctAnswer: 'M/6',
    marks: 1,
    explanation: 'Change in oxidation state per mole is 6 (+6 to +3 per Cr, 2 Cr atoms).',
  },
  {
    id: 'q-chem-2080-2',
    testId: 'test-chem-2080-model',
    type: 'multiple-choice',
    question: 'If concentration of OH- is increased in equilibrium, what happens to H+?',
    options: ['Increases', 'Decreases', 'Stays same', 'Depends on initial'],
    correctAnswer: 'Decreases',
    marks: 1,
    explanation: '[H+][OH-] = Kw (constant).',
  },
  {
    id: 'q-chem-2080-3',
    testId: 'test-chem-2080-model',
    type: 'multiple-choice',
    question: 'Rate doubles for every 10°C rise. How many times rate increases from 10°C to 100°C?',
    options: ['112', '400', '512', '614'],
    correctAnswer: '512',
    marks: 1,
    explanation: 'Steps = (100-10)/10 = 9. Rate = 2^9 = 512.',
  },
  {
    id: 'q-chem-2080-6',
    testId: 'test-chem-2080-model',
    type: 'multiple-choice',
    question: 'Bessemer converter is used for manufacturing:',
    options: ['Pig iron', 'Steel', 'Wrought iron', 'Cast iron'],
    correctAnswer: 'Steel',
    marks: 1,
    explanation: 'Bessemer process is for mass production of steel.',
  },
  {
    id: 'q-chem-2080-7',
    testId: 'test-chem-2080-model',
    type: 'multiple-choice',
    question: 'Sodium phenoxide reacts with methyl bromide to give:',
    options: ['Cresol', 'Toluene', 'Benzene', 'Anisole'],
    correctAnswer: 'Anisole',
    marks: 1,
    explanation: 'Williamson ether synthesis: Ph-ONa + CH3Br -> Ph-O-CH3 (Anisole).',
  },
  {
    id: 'q-chem-2080-9',
    testId: 'test-chem-2080-model',
    type: 'multiple-choice',
    question: 'Reagent to distinguish between phenol and carboxylic acid?',
    options: ['KOH', 'Na', 'NaOH', 'NaHCO3'],
    correctAnswer: 'NaHCO3',
    marks: 1,
    explanation: 'Carboxylic acids evolve CO2 with NaHCO3, phenols do not.',
  },
  {
    id: 'q-chem-2080-11',
    testId: 'test-chem-2080-model',
    type: 'multiple-choice',
    question: 'Oxygen containing organic compound upon oxidation forms carboxylic acid with molecular mass higher by 14 units. Identify it.',
    options: ['Primary alcohol', 'Aldehyde', 'Ketone', 'Secondary alcohol'],
    correctAnswer: 'Primary alcohol',
    marks: 1,
    explanation: 'R-CH2-OH -> R-COOH. Net change: -2H + O = -2 + 16 = +14.',
  },
];

// Helper functions to simulate database access
export const getSubjects = async () => subjects;
export const getSubjectBySlug = async (slug: string) => subjects.find(s => s.slug === slug);
export const getChaptersBySubjectId = async (subjectId: string) => chapters.filter(c => c.subjectId === subjectId);
export const getChapterBySubjectSlugAndChapterNumber = async (subjectSlug: string, chapterNumber: number) => {
  const subject = subjects.find(s => s.slug === subjectSlug);
  if (!subject) return null;
  return chapters.find(c => c.subjectId === subject.id && c.number === chapterNumber);
};
export const getNotesByChapterId = async (chapterId: string) => notes.filter(n => n.chapterId === chapterId);
export const getPastPapers = async () => pastPapers;
export const getMockTests = async () => mockTests;
export const getMockTestById = async (id: string) => mockTests.find(t => t.id === id);
export const getQuestionsByTestId = async (testId: string) => questions.filter(q => q.testId === testId);
