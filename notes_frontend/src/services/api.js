//
// API service for communicating with the FastAPI notes_backend.
//
const API_BASE = 'http://localhost:3001';

function getAuthHeaders(token) {
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : { 'Content-Type': 'application/json' };
}

// PUBLIC_INTERFACE
export async function register({ email, password }) {
  /** Register a new user. */
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).detail || 'Registration failed');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function login({ email, password }) {
  /** Login to get access token. */
  const res = await fetch(`${API_BASE}/auth/token`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function getMe(token) {
  /** Fetch authenticated user's details. */
  const res = await fetch(`${API_BASE}/auth/me`, { headers: getAuthHeaders(token) });
  if (!res.ok) throw new Error('Unauthorized');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function fetchNotes(token, { skip = 0, limit = 50 } = {}) {
  /** Fetch list of notes (paginated). */
  const res = await fetch(
    `${API_BASE}/notes/?skip=${skip}&limit=${limit}`,
    { headers: getAuthHeaders(token) }
  );
  if (!res.ok) throw new Error('Failed to fetch notes');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function searchNotes(token, query) {
  /** Search notes by text (title/content). */
  const res = await fetch(`${API_BASE}/notes/search/?q=${encodeURIComponent(query)}`, {
    headers: getAuthHeaders(token),
  });
  if (!res.ok) throw new Error('Search failed');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function createNote(token, { title, content }) {
  /** Create a new note. */
  const res = await fetch(`${API_BASE}/notes/`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error('Create note failed');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function updateNote(token, note_id, { title, content }) {
  /** Update note content/title. */
  const res = await fetch(`${API_BASE}/notes/${note_id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error('Update note failed');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(token, note_id) {
  /** Delete a note. */
  const res = await fetch(`${API_BASE}/notes/${note_id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
  if (!res.ok) throw new Error('Delete note failed');
  return true;
}
