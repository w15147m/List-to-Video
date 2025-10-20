<?php

use App\Http\Controllers\Auth\logIn;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\TempImageController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/login', [logIn::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::resources([
        // 'playlist' => PlaylistController::class,
        // 'video'     => VideoController::class,
     'temp-images' => TempImageController::class,

    ]);
});



