const API_BASE_URL = 'http://localhost:8080';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('firebaseIdToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`API fallback for ${endpoint}:`, err.message);
    throw err;
  }
};

export const registerUserBackend = (uid, name, email) => 
  apiCall('/users/register', {
    method: 'POST',
    body: JSON.stringify({ uid, name, email })
  });

export const assignUserRoleBackend = (uid, role) =>
  apiCall('/admin/role', {
    method: 'POST',
    body: JSON.stringify({ uid, role })
  });

export const checkFirstLoginBackend = () =>
  apiCall('/auth/first-login-check', {
    method: 'POST'
  });

export const fetchDashboardSummaryBackend = (period = 'MONTHLY') =>
  apiCall(`/api/reports/summary?period=${period}`);
