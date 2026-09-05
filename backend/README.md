# XATRA WORKS — Laravel Chat Backend

Backend API untuk fitur real-time chat menggunakan Laravel 12 + Reverb WebSocket.

## Requirements
- PHP >= 8.2
- Composer
- MySQL/PostgreSQL
- Redis (recommended)

## Setup

```bash
# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Start the development server
php artisan serve

# Start Reverb WebSocket server (in separate terminal)
php artisan reverb:start

# Start queue worker (in separate terminal)
php artisan queue:work
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/rooms` | Get or create chat room |
| GET | `/api/chat/rooms` | List all rooms (admin) |
| GET | `/api/chat/rooms/{id}/messages` | Get messages for a room |
| POST | `/api/chat/rooms/{id}/messages` | Send a message |
| POST | `/api/chat/rooms/{id}/read` | Mark messages as read |
| GET | `/api/chat/unread-count` | Get unread message count |

## WebSocket Channels
- `private-chat.{roomId}` — Private channel for each chat room
- Event: `MessageSent` — Broadcast when a new message is sent
