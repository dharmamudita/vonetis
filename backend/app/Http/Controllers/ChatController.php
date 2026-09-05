<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ChatController extends Controller
{
    /**
     * Get or create a chat room for the user
     */
    public function getOrCreateRoom(Request $request): JsonResponse
    {
        $request->validate([
            'firebase_uid' => 'required|string',
        ]);

        $room = ChatRoom::firstOrCreate(
            ['user_firebase_uid' => $request->firebase_uid],
            [
                'user_firebase_uid' => $request->firebase_uid,
                'status' => 'active',
                'last_message_at' => now(),
            ]
        );

        return response()->json([
            'success' => true,
            'data' => $room,
        ]);
    }

    /**
     * List all chat rooms (admin only)
     */
    public function listRooms(Request $request): JsonResponse
    {
        $rooms = ChatRoom::with('latestMessage')
            ->orderBy('last_message_at', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $rooms,
        ]);
    }

    /**
     * Get messages for a chat room
     */
    public function getMessages(Request $request, int $roomId): JsonResponse
    {
        $room = ChatRoom::findOrFail($roomId);

        $messages = Message::where('chat_room_id', $roomId)
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        return response()->json([
            'success' => true,
            'data' => $messages,
        ]);
    }

    /**
     * Send a message
     */
    public function sendMessage(Request $request, int $roomId): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:5000',
            'type' => 'sometimes|string|in:text,image,file',
        ]);

        $room = ChatRoom::findOrFail($roomId);

        $message = Message::create([
            'chat_room_id' => $roomId,
            'sender_type' => $request->header('X-Sender-Type', 'user'), // 'user' or 'admin'
            'sender_id' => $request->header('X-Firebase-UID', 'unknown'),
            'message' => $request->message,
            'type' => $request->type ?? 'text',
        ]);

        // Update room's last message timestamp
        $room->update(['last_message_at' => now()]);

        // Broadcast the message event
        broadcast(new MessageSent($message, $room))->toOthers();

        return response()->json([
            'success' => true,
            'data' => $message,
        ], 201);
    }

    /**
     * Mark messages as read
     */
    public function markAsRead(Request $request, int $roomId): JsonResponse
    {
        Message::where('chat_room_id', $roomId)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json([
            'success' => true,
            'message' => 'Messages marked as read',
        ]);
    }

    /**
     * Get unread message count
     */
    public function getUnreadCount(Request $request): JsonResponse
    {
        $firebaseUid = $request->header('X-Firebase-UID');

        $count = 0;
        if ($firebaseUid) {
            $rooms = ChatRoom::where('user_firebase_uid', $firebaseUid)->pluck('id');
            $count = Message::whereIn('chat_room_id', $rooms)
                ->where('sender_type', 'admin')
                ->whereNull('read_at')
                ->count();
        }

        return response()->json([
            'success' => true,
            'data' => ['count' => $count],
        ]);
    }
}
