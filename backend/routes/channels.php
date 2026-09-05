<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels — XATRA WORKS
|--------------------------------------------------------------------------
*/

// Private chat channel - authorize by room membership
Broadcast::channel('chat.{roomId}', function ($user, $roomId) {
    // In production, verify the user has access to this room
    return true;
});
