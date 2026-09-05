<?php

namespace App\Events;

use App\Models\Message;
use App\Models\ChatRoom;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Message $message;
    public ChatRoom $room;

    public function __construct(Message $message, ChatRoom $room)
    {
        $this->message = $message;
        $this->room = $room;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat.' . $this->room->id),
        ];
    }

    /**
     * Get the data to broadcast.
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'chat_room_id' => $this->message->chat_room_id,
            'sender_type' => $this->message->sender_type,
            'sender_id' => $this->message->sender_id,
            'message' => $this->message->message,
            'type' => $this->message->type,
            'created_at' => $this->message->created_at->toISOString(),
        ];
    }
}
