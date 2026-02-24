-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Subjects Table
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50) NOT NULL,
    description TEXT,
    total_chapters INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chapters Table
CREATE TABLE chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    estimated_hours INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Past Papers Table
CREATE TABLE past_papers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    year INTEGER NOT NULL CHECK (year BETWEEN 2075 AND 2082),
    title VARCHAR(300) NOT NULL,
    pdf_url TEXT NOT NULL,
    has_solutions BOOLEAN DEFAULT false,
    solution_pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notes Table
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('theory', 'formula', 'derivation', 'diagram')),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    formulas JSONB,
    diagrams JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mock Tests Table
CREATE TABLE mock_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    total_marks INTEGER NOT NULL DEFAULT 50,
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions Table
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('multiple-choice', 'short-answer', 'long-answer')),
    question_text TEXT NOT NULL,
    options JSONB,
    correct_answer TEXT NOT NULL,
    marks INTEGER NOT NULL DEFAULT 1,
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Results Table
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    percentage FLOAT NOT NULL,
    weak_topics JSONB,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Progress Table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    completion_percentage FLOAT DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, chapter_id)
);

-- RLS Policies
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Public read access for static content
CREATE POLICY "Public subjects are viewable by everyone" ON subjects FOR SELECT USING (true);
CREATE POLICY "Public chapters are viewable by everyone" ON chapters FOR SELECT USING (true);
CREATE POLICY "Public past_papers are viewable by everyone" ON past_papers FOR SELECT USING (true);
CREATE POLICY "Public notes are viewable by everyone" ON notes FOR SELECT USING (true);
CREATE POLICY "Public mock_tests are viewable by everyone" ON mock_tests FOR SELECT USING (true);
CREATE POLICY "Public questions are viewable by everyone" ON questions FOR SELECT USING (true);

-- User specific policies
CREATE POLICY "Users can view own test results" ON test_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own test results" ON test_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);

-- Insert initial subjects
INSERT INTO subjects (name, slug, icon, description, total_chapters) VALUES
('Physics', 'physics', 'atom', 'Mechanics, Thermodynamics, Optics, Electricity & Magnetism', 20),
('Chemistry', 'chemistry', 'flask', 'Physical, Organic, and Inorganic Chemistry', 18),
('Mathematics', 'mathematics', 'calculator', 'Calculus, Algebra, Coordinate Geometry, Vectors', 15),
('Computer Science', 'computer-science', 'monitor', 'Programming in C, Web Tech, Database, OOP', 12);
