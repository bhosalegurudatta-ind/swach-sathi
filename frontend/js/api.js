const API_URL = (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) 
  ? `${window.location.origin}/api` 
  : 'http://127.0.0.1:5000/api';


const api = {
  // --- AUTH ---
  register: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },

  getHeaders: () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  },

  // --- AI ASSISTANT ---
  segregateWaste: async (item) => {
    const res = await fetch(`${API_URL}/ai/segregate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item })
    });
    return await res.json();
  },

  // --- EVENTS ---
  getEvents: async (all = false) => {
    const res = await fetch(`${API_URL}/events${all ? '?all=true' : ''}`, {
      headers: api.getHeaders()
    });
    const data = await res.json();
    return data.data || [];
  },

  createEvent: async (eventData) => {
    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: api.getHeaders(),
      body: JSON.stringify(eventData)
    });
    return await res.json();
  },

  // --- COMPLAINTS ---
  getMapHotspots: async () => {
    try {
      const res = await fetch(`${API_URL}/complaints/map`);
      const data = await res.json();
      return data.data || [];
    } catch (e) {
      return [];
    }
  },

  getComplaints: async () => {
    const res = await fetch(`${API_URL}/complaints`, {
      headers: api.getHeaders()
    });
    const data = await res.json();
    return data.data || [];
  },

  createComplaint: async (complaintData) => {
    const res = await fetch(`${API_URL}/complaints`, {
      method: 'POST',
      headers: api.getHeaders(),
      body: JSON.stringify(complaintData)
    });
    return await res.json();
  },

  updateComplaintStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/complaints/${id}`, {
      method: 'PUT',
      headers: api.getHeaders(),
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  updateComplaint: async (id, updates) => {
    const res = await fetch(`${API_URL}/complaints/${id}`, {
      method: 'PUT',
      headers: api.getHeaders(),
      body: JSON.stringify(updates)
    });
    return await res.json();
  },

  // --- LITTER REPORT ---
  getLitterReports: async () => {
    const res = await fetch(`${API_URL}/litter`, {
      headers: api.getHeaders()
    });
    const data = await res.json();
    return data.data || [];
  },

  createLitterReport: async (litterData) => {
    const res = await fetch(`${API_URL}/litter`, {
      method: 'POST',
      headers: api.getHeaders(),
      body: JSON.stringify(litterData)
    });
    return await res.json();
  },
  
  updateLitterStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/litter/${id}`, {
      method: 'PUT',
      headers: api.getHeaders(),
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  // --- PICKUP ---
  getPickups: async () => {
    const res = await fetch(`${API_URL}/pickup`, {
      headers: api.getHeaders()
    });
    const data = await res.json();
    return data.data || [];
  },

  createPickup: async (pickupData) => {
    const res = await fetch(`${API_URL}/pickup`, {
      method: 'POST',
      headers: api.getHeaders(),
      body: JSON.stringify(pickupData)
    });
    return await res.json();
  },

  updatePickupStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/pickup/${id}`, {
      method: 'PUT',
      headers: api.getHeaders(),
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  // Engagement & Community
  getEngagement: async () => {
    const res = await fetch(`${API_URL}/engagement`);
    return await res.json();
  },
  recordView: async () => {
    const res = await fetch(`${API_URL}/engagement/view`, { method: 'POST' });
    return await res.json();
  },
  recordLike: async () => {
    const res = await fetch(`${API_URL}/engagement/like`, { method: 'POST' });
    return await res.json();
  },
  postComment: async (name, text) => {
    const res = await fetch(`${API_URL}/engagement/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, text })
    });
    return await res.json();
  },

  // --- WORKERS ---
  getWorkers: async () => {
    const res = await fetch(`${API_URL}/workers`);
    const data = await res.json();
    return data.data || [];
  }
};
