
import { Subject, Chapter, PastPaper, Note, MockTest, Question } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'phy',
    name: 'Physics',
    slug: 'physics',
    icon: 'atom',
    description: 'Mechanics, Thermodynamics, Electricity & Magnetism, and Modern Physics.',
    totalChapters: 24,
  },
  {
    id: 'chem',
    name: 'Chemistry',
    slug: 'chemistry',
    icon: 'flask',
    description: 'Physical, Organic, and Inorganic Chemistry concepts and reactions.',
    totalChapters: 20,
  },
  {
    id: 'bio',
    name: 'Biology',
    slug: 'biology',
    icon: 'microscope',
    description: 'Botany and Zoology: Cell biology, Genetics, Ecology, and Human Physiology.',
    totalChapters: 18,
  },
  {
    id: 'math',
    name: 'Mathematics',
    slug: 'mathematics',
    icon: 'calculator',
    description: 'Calculus, Algebra, Coordinate Geometry, and Vectors.',
    totalChapters: 15,
  },
  {
    id: 'cs',
    name: 'Computer Science',
    slug: 'computer-science',
    icon: 'monitor',
    description: 'C Programming, Web Technology (HTML/CSS), Database (SQL), and Python.',
    totalChapters: 12,
  },
  {
    id: 'eng',
    name: 'English',
    slug: 'english',
    icon: 'book',
    description: 'Language Development and Literature (Grade 11 & 12).',
    totalChapters: 2,
  },
  {
    id: 'nep',
    name: 'Nepali',
    slug: 'nepali',
    icon: 'book',
    description: 'Compulsory Nepali chapters and exercises (Grade 11 & 12).',
    totalChapters: 2,
  },
];

export const chapters: Chapter[] = [
  // Physics - Grade 11
  { id: 'phy-11-1', subjectId: 'phy', number: 1, title: 'Units and Measurement', description: 'Fundamental and derived units, dimensions, and error analysis.', estimatedHours: 4, grade: 11 },
  { id: 'phy-11-2', subjectId: 'phy', number: 2, title: 'Vectors and Scalars', description: 'Vector addition, subtraction, dot and cross products.', estimatedHours: 6, grade: 11 },
  { id: 'phy-11-3', subjectId: 'phy', number: 3, title: 'Kinematics', description: 'Motion in one and two dimensions, projectile motion.', estimatedHours: 8, grade: 11 },
  { id: 'phy-11-4', subjectId: 'phy', number: 4, title: 'Laws of Motion', description: 'Newtons laws, friction, and circular motion.', estimatedHours: 8, grade: 11 },
  { id: 'phy-11-5', subjectId: 'phy', number: 5, title: 'Work, Energy and Power', description: 'Work done by constant and variable forces, kinetic and potential energy.', estimatedHours: 7, grade: 11 },
  
  // Physics - Grade 12
  { id: 'phy-12-1', subjectId: 'phy', number: 6, title: 'Wave Optics', description: 'Interference, Diffraction, Polarization of light.', estimatedHours: 10, grade: 12 },
  { id: 'phy-12-2', subjectId: 'phy', number: 7, title: 'Current Electricity', description: 'Ohm’s law, Kirchhoff’s laws, Potentiometer.', estimatedHours: 12, grade: 12 },
  { id: 'phy-12-3', subjectId: 'phy', number: 8, title: 'Modern Physics', description: 'Photoelectric effect, Bohr’s model, X-rays.', estimatedHours: 10, grade: 12 },

  // Chemistry - Grade 11
  { id: 'chem-11-1', subjectId: 'chem', number: 1, title: 'Stoichiometry', description: 'Mole concept, chemical equations, and calculations.', estimatedHours: 6, grade: 11 },
  { id: 'chem-11-2', subjectId: 'chem', number: 2, title: 'Atomic Structure', description: 'Bohr model, quantum numbers, and electronic configuration.', estimatedHours: 8, grade: 11 },
  { id: 'chem-11-3', subjectId: 'chem', number: 3, title: 'Chemical Bonding', description: 'Ionic, covalent, and coordinate bonds, VSEPR theory.', estimatedHours: 10, grade: 11 },
  { id: 'chem-11-4', subjectId: 'chem', number: 4, title: 'States of Matter', description: 'Gaseous state, liquid state, and solid state properties.', estimatedHours: 8, grade: 11 },

  // Chemistry - Grade 12
  { id: 'chem-12-1', subjectId: 'chem', number: 5, title: 'Volumetric Analysis', description: 'Titration, acid-base reactions, redox titration.', estimatedHours: 8, grade: 12 },
  { id: 'chem-12-2', subjectId: 'chem', number: 6, title: 'Organic Chemistry II', description: 'Haloalkanes, Alcohols, Phenols, Ethers.', estimatedHours: 15, grade: 12 },

  // Biology - Grade 11
  { id: 'bio-11-1', subjectId: 'bio', number: 1, title: 'Cell Biology', description: 'Structure and function of cell organelles, cell division.', estimatedHours: 8, grade: 11 },
  { id: 'bio-11-2', subjectId: 'bio', number: 2, title: 'Genetics', description: 'Mendelian genetics, DNA structure, and replication.', estimatedHours: 10, grade: 11 },
  
  // Biology - Grade 12
  { id: 'bio-12-1', subjectId: 'bio', number: 3, title: 'Human Physiology', description: 'Digestion, respiration, circulation, and excretion systems.', estimatedHours: 15, grade: 12 },
  { id: 'bio-12-2', subjectId: 'bio', number: 4, title: 'Genetics and Evolution', description: 'Molecular basis of inheritance, Evolution theories.', estimatedHours: 12, grade: 12 },

  // Math - Grade 11
  { id: 'math-11-1', subjectId: 'math', number: 1, title: 'Sequence and Series', description: 'AP, GP, HP, and special series.', estimatedHours: 6, grade: 11 },
  { id: 'math-11-2', subjectId: 'math', number: 2, title: 'Matrices and Determinants', description: 'Properties, inverse, and system of linear equations.', estimatedHours: 8, grade: 11 },
  { id: 'math-11-3', subjectId: 'math', number: 3, title: 'Calculus: Limits and Continuity', description: 'Concept of limits, continuity, and derivatives.', estimatedHours: 12, grade: 11 },

  // Math - Grade 12
  { id: 'math-12-1', subjectId: 'math', number: 4, title: 'Permutation and Combination', description: 'Counting principles, binomial theorem.', estimatedHours: 8, grade: 12 },
  { id: 'math-12-2', subjectId: 'math', number: 5, title: 'Integrals', description: 'Definite and indefinite integrals, applications.', estimatedHours: 15, grade: 12 },

  // CS - Grade 11
  { id: 'cs-11-1', subjectId: 'cs', number: 1, title: 'Computer System Architecture', description: 'Logic gates, boolean algebra, and CPU architecture.', estimatedHours: 6, grade: 11 },
  { id: 'cs-11-2', subjectId: 'cs', number: 2, title: 'Web Technology I', description: 'Introduction to HTML, CSS basics.', estimatedHours: 8, grade: 11 },
  { id: 'cs-11-3', subjectId: 'cs', number: 3, title: 'Programming in C', description: 'Flowcharts, Algorithms, C syntax, Control structures.', estimatedHours: 12, grade: 11 },

  // CS - Grade 12
  { id: 'cs-12-1', subjectId: 'cs', number: 4, title: 'Database Management System (SQL)', description: 'DBMS concepts, normalization, and SQL queries.', estimatedHours: 10, grade: 12 },
  { id: 'cs-12-2', subjectId: 'cs', number: 5, title: 'Web Technology II', description: 'PHP, JavaScript basics.', estimatedHours: 10, grade: 12 },
  { id: 'cs-12-3', subjectId: 'cs', number: 6, title: 'Programming in C (Advanced)', description: 'Pointers, Structures, File Handling.', estimatedHours: 12, grade: 12 },
  
  // English - Grade 11
  { id: 'eng-11-20', subjectId: 'eng', number: 20, title: 'Science and Technology (Language Development)', description: 'Vocabulary, grammar, and comprehension exercises.', estimatedHours: 6, grade: 11 },
  // Nepali - Grade 11
  { id: 'nep-11-7', subjectId: 'nep', number: 7, title: 'पर्यापर्यटनका सम्भावना र आयाम', description: 'वस्तुपरक निबन्ध — अभ्यास र बोध/अभिव्यक्ति', estimatedHours: 6, grade: 11 },
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
];

export const pastPapers: PastPaper[] = [
  {
    id: 'pp-phy-2080',
    subjectId: 'phy',
    chapterId: 'phy-11-1', 
    year: 2080,
    title: 'NEB Grade 11 Physics Model Question 2080',
    pdfUrl: 'http://www.neb.gov.np/uploads/photos/LzFCDNVuGe160603084426.pdf',
    hasSolutions: true,
  },
  {
    id: 'pp-chem-2079',
    subjectId: 'chem',
    chapterId: 'chem-11-1',
    year: 2079,
    title: 'NEB Grade 11 Chemistry 2079',
    pdfUrl: '#',
    hasSolutions: false,
  },
  {
    id: 'pp-cs-2080',
    subjectId: 'cs',
    chapterId: 'cs-11-3',
    year: 2080,
    title: 'NEB Grade 11 Computer Science 2080',
    pdfUrl: '#',
    hasSolutions: true,
  },
  {
    id: 'pp-math-2078',
    subjectId: 'math',
    chapterId: 'math-11-1',
    year: 2078,
    title: 'NEB Grade 11 Mathematics 2078',
    pdfUrl: '#',
    hasSolutions: true,
  },
];

export const mockTests: MockTest[] = [
  {
    id: 'test-phy-1',
    chapterId: 'phy-11-1',
    title: 'Units and Measurement - Practice Set 1',
    durationMinutes: 30,
    totalMarks: 20,
    difficulty: 'easy',
  },
  {
    id: 'test-chem-1',
    chapterId: 'chem-11-1',
    title: 'Stoichiometry Challenge',
    durationMinutes: 45,
    totalMarks: 30,
    difficulty: 'medium',
  },
  {
    id: 'test-cs-2',
    chapterId: 'cs-11-3',
    title: 'C Programming Mastery',
    durationMinutes: 40,
    totalMarks: 40,
    difficulty: 'hard',
  },
  {
    id: 'test-cs-3',
    chapterId: 'cs-11-2',
    title: 'HTML & CSS Basics',
    durationMinutes: 20,
    totalMarks: 20,
    difficulty: 'easy',
  },
];

export const questions: Question[] = [
  // Physics Questions
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
