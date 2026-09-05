<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes — XATRA WORKS Chat Backend
|--------------------------------------------------------------------------
*/

// Chat routes
Route::prefix('chat')->group(function () {
    // Room management
    Route::post('/rooms', [ChatController::class, 'getOrCreateRoom']);
    Route::get('/rooms', [ChatController::class, 'listRooms']);

    // Messages
    Route::get('/rooms/{roomId}/messages', [ChatController::class, 'getMessages']);
    Route::post('/rooms/{roomId}/messages', [ChatController::class, 'sendMessage']);
    Route::post('/rooms/{roomId}/read', [ChatController::class, 'markAsRead']);

    // Unread count
    Route::get('/unread-count', [ChatController::class, 'getUnreadCount']);
});
