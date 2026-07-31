const API_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '';
export const server = `${API_URL}/api/v2`;
export const backend_url = API_URL || 'http://localhost:8000';
