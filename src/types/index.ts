
export interface Subject {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  totalChapters: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  number: number;
  title: string;
  description: string;
  estimatedHours: number;
  grade?: 11 | 12;
}

export interface PastPaper {
  id: string;
  subjectId: string;
  chapterId: string;
  year: number;
  title: string;
  pdfUrl: string;
  hasSolutions: boolean;
  solutionPdfUrl?: string;
}

export interface Note {
  id: string;
  chapterId: string;
  type: 'theory' | 'formula' | 'derivation' | 'diagram';
  title: string;
  content: string;
  formulas?: unknown;
  diagrams?: unknown;
}

export interface MockTest {
  id: string;
  chapterId: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  testId: string;
  type: 'multiple-choice' | 'short-answer' | 'long-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  marks: number;
  explanation?: string;
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  weakTopics: string[];
  completedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  chapterId: string;
  completionPercentage: number;
  lastAccessed: Date;
}
