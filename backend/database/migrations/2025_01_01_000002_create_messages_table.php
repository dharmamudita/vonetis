<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_room_id')->constrained('chat_rooms')->onDelete('cascade');
            $table->enum('sender_type', ['user', 'admin'])->default('user');
            $table->string('sender_id'); // Firebase UID or admin identifier
            $table->text('message');
            $table->enum('type', ['text', 'image', 'file'])->default('text');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->index('chat_room_id');
            $table->index('sender_type');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
