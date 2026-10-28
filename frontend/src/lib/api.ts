const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('lms_token');
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lms_token', token);
  }
}

export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('lms_token');
    localStorage.removeItem('lms_user');
  }
}

export function getUser(): any | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('lms_user');
  return raw ? JSON.parse(raw) : null;
}

export function setUser(user: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lms_user', JSON.stringify(user));
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    clearToken();
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Yêu cầu không thành công');
  }

  return data.data !== undefined ? data.data : data;
}

export const api = {
  // Auth
  login: async (identifier: string, password: string) => {
    const res = await request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
    setToken(res.accessToken);
    setUser(res.user);
    return res;
  },
  getMe: () => request<any>('/auth/me'),

  // Subjects
  getSubjects: () => request<any[]>('/subjects'),
  getSubject: (id: string) => request<any>(`/subjects/${id}`),

  // Learning Units (Bài học)
  getUnits: (subjectId?: string) =>
    request<any[]>(`/learning-units${subjectId ? `?subjectId=${subjectId}` : ''}`),
  getUnit: (id: string) => request<any>(`/learning-units/${id}`),
  createUnit: (data: any) =>
    request<any>('/learning-units', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Daily Assignments
  getTodayStudent: () => request<any>('/daily-assignments/student/today'),
  getAllStudent: () => request<any[]>('/daily-assignments/student/all'),
  getParentChildren: () => request<any[]>('/daily-assignments/parent/children'),
  getTeacherAssignments: () => request<any[]>('/daily-assignments/teacher/all'),
  createDailyAssignment: (data: any) =>
    request<any>('/daily-assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  markLectureViewed: (id: string) =>
    request<any>(`/daily-assignments/${id}/view-lecture`, {
      method: 'PATCH',
    }),

  // Attempts & Exams
  startAttempt: (id: string) =>
    request<any>(`/attempts/${id}/start`, {
      method: 'POST',
    }),
  submitAttempt: (data: { attemptId: string; answers: any[]; timeSpentSeconds: number }) =>
    request<any>('/attempts/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAttemptDetails: (id: string) => request<any>(`/attempts/${id}`),

  // Teacher Grading Studio
  getPendingGrading: () => request<any[]>('/grading/pending'),
  gradeAttempt: (attemptId: string, data: any) =>
    request<any>(`/grading/${attemptId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Students & Links
  getStudents: () => request<any[]>('/users/students'),
  createStudent: (data: any) =>
    request<any>('/users/students', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  linkParent: (data: any) =>
    request<any>('/users/parent-links', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
