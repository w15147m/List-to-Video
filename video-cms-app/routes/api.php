<?php

use App\Http\Controllers\Api\ApiVideoController;
use App\Http\Controllers\Api\ApiVideoItemController;
use App\Http\Controllers\Api\ApiPlaylistController; // ⬅️ NEW: You must import the correct controller
use App\Http\Controllers\Auth\logIn;
use App\Http\Controllers\TempImageController;
// use Illuminate\Foundation\Console\ApiInstallCommand; // ⬅️ REMOVE THIS UNUSED, MISPLACED IMPORT
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/login', [logIn::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resources([
        'playlists' => ApiPlaylistController::class, // ⬅️ FIX: Use the correct API Controller
        'videos'     => ApiVideoController::class,
         'videoItems'  => ApiVideoItemController::class,
        'temp-images' => TempImageController::class,

    ]);
});
