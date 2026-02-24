# NEB Science Preparation Platform

A comprehensive online study platform designed specifically for NEB +2 Science students in Nepal.

## Features

- **Subject-wise Study Materials**: Physics, Chemistry, Mathematics, and Computer Science.
- **Chapter Notes**: Detailed theory, derivations, and diagrams.
- **Past Papers**: Filterable collection of past board exam papers (2075-2082).
- **Mock Test System**: Chapter-wise and full syllabus tests with auto-scoring and timer.
- **Quick Revision**: Formula sheets and key definitions.
- **Resources**: Syllabus, practical manuals, and viva questions.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: Lucide React

## Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment Variables**:
    Create a `.env.local` file with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Open http://localhost:3000**

## Database Schema

The project uses Supabase with the following tables:
- `subjects`
- `chapters`
- `notes`
- `past_papers`
- `mock_tests`
- `questions`
- `test_results`
- `user_progress`

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: Reusable UI components
- `src/utils/supabase`: Supabase client configuration
- `supabase/migrations`: SQL migration files

## License

MIT
