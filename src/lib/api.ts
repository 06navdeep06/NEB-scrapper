/**
 * API client for the NEB Notes FastAPI backend.
 * Falls back to static data imports if the API is unavailable.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export interface SearchResult {
  type: string;
  id: string;
  title: string;
  snippet: string;
  subjectId?: string;
  chapterId?: string;
  score: number;
}

export interface SearchResponse {
  query: string;
  count: number;
  results: SearchResult[];
}

export async function apiSearch(query: string, limit = 20): Promise<SearchResponse> {
  const data = await apiFetch<SearchResponse>(
    `/search?q=${encodeURIComponent(query)}&limit=${limit}`
  );
  return data || { query, count: 0, results: [] };
}

export async function apiGetSubjects() {
  return apiFetch<any[]>('/subjects');
}

export async function apiGetSubject(slug: string) {
  return apiFetch<any>(`/subjects/${slug}`);
}

export async function apiGetChapter(chapterId: string) {
  return apiFetch<any>(`/chapters/${chapterId}`);
}

export async function apiGetTests() {
  return apiFetch<any[]>('/tests');
}

export async function apiGetTest(testId: string) {
  return apiFetch<any>(`/tests/${testId}`);
}
