<?php

use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('playlist', function () {
        return Inertia::render('video-admin/Playlist/PlaylistPage');
    })->name('playlist');
     Route::resources([
        'play-list' => PlaylistController::class,
        'video'     => VideoController::class,
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
