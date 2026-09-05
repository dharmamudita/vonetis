/**
 * Laravel Chat API Client
 * Connects to Laravel backend for real-time chat functionality
 */

const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:8000/api';

/**
 * Base fetch wrapper with auth headers
 */
async function apiFetch(endpoint, options = {}) {
  const { method = 'GET', body, token } = options;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Chat API methods
 */
export const chatApi = {
  // Get or create a chat room for the user
  async getOrCreateRoom(token, userId) {
    return apiFetch('/chat/rooms', {
      method: 'POST',
      token,
      body: { firebase_uid: userId },
    });
  },

  // Get all chat rooms (admin)
  async getRooms(token) {
    return apiFetch('/chat/rooms', { token });
  },

  // Get messages for a chat room
  async getMessages(token, roomId, page = 1) {
    return apiFetch(`/chat/rooms/${roomId}/messages?page=${page}`, { token });
  },

  // Send a message
  async sendMessage(token, roomId, message, type = 'text') {
    return apiFetch(`/chat/rooms/${roomId}/messages`, {
      method: 'POST',
      token,
      body: { message, type },
    });
  },

  // Mark messages as read
  async markAsRead(token, roomId) {
    return apiFetch(`/chat/rooms/${roomId}/read`, {
      method: 'POST',
      token,
    });
  },

  // Get unread count
  async getUnreadCount(token) {
    return apiFetch('/chat/unread-count', { token });
  },
};

/**
 * Setup Laravel Echo for real-time WebSocket
 */
export function setupEcho() {
  if (typeof window === 'undefined') return null;

  // Dynamic import for client-side only
  const Echo = require('laravel-echo').default;
  const Pusher = require('pusher-js');

  window.Pusher = Pusher;

  const echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || 'localhost',
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT || 8080,
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT || 8080,
    forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
    disableStats: true,
  });

  return echo;
}
