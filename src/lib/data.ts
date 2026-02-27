
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
];

export const notes: Note[] = [
  // Physics Notes
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
  
  // Chemistry Notes
  {
    id: 'note-chem-11-1',
    chapterId: 'chem-11-1',
    type: 'theory',
    title: 'The Mole Concept',
    content: 'One mole contains 6.022 x 10^23 particles. This number is known as Avogadros constant. Molar mass is the mass of one mole of a substance in grams.',
  },

  // CS Notes - C Programming
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
  
  // CS Notes - Web Tech
  {
    id: 'note-cs-11-2-1',
    chapterId: 'cs-11-2',
    type: 'theory',
    title: 'HTML Structure',
    content: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. Key tags include &lt;html&gt;, &lt;head&gt;, &lt;body&gt;, &lt;div&gt;, &lt;span&gt;.',
  },

  // CS Notes - SQL
  {
    id: 'note-cs-12-1-1',
    chapterId: 'cs-12-1',
    type: 'theory',
    title: 'SQL Commands',
    content: 'SQL commands are grouped into: <ul><li><strong>DDL</strong>: CREATE, ALTER, DROP</li><li><strong>DML</strong>: SELECT, INSERT, UPDATE, DELETE</li><li><strong>DCL</strong>: GRANT, REVOKE</li></ul>',
  },
];

export const pastPapers: PastPaper[] = [
  {
    id: 'pp-phy-2080',
    subjectId: 'phy',
    chapterId: 'phy-11-1', 
    year: 2080,
    title: 'NEB Grade 11 Physics 2080',
    pdfUrl: '#',
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
