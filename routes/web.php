<?php

use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\VideoItemController;
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
        'playlist' => PlaylistController::class,
        'video'     => VideoController::class,
        'video-item'=> VideoItemController::class,
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';




//   GET|HEAD        playlist ....................*.......... playlist.index › PlaylistController@index
//   POST            playlist ....................*.......... playlist.store › PlaylistController@store
//   GET|HEAD        playlist/create .............*........ playlist.create › PlaylistController@create
//   GET|HEAD        playlist/{play_list} ........*............ playlist.show › PlaylistController@show
//   PUT|PATCH       playlist/{play_list} ........*........ playlist.update › PlaylistController@update
//   DELETE          playlist/{play_list} ........*...... playlist.destroy › PlaylistController@destroy
//   GET|HEAD        playlist/{play_list}/edit ...*............ playlist.edit › PlaylistController@edit
//   G  GET|HEAD     video ........................*................. video.index › VideoController@index
//   POST            video ........................*................. video.store › VideoController@store
//   GET|HEAD        video-item ...................*........ video-item.index › VideoItemController@index
//   POST            video-item ...................*........ video-item.store › VideoItemController@store
//   GET|HEAD        video-item/create ............*...... video-item.create › VideoItemController@create
//   GET|HEAD        video-item/{video_item} ......*.......... video-item.show › VideoItemController@show
//   PUT|PATCH       video-item/{video_item} ......*...... video-item.update › VideoItemController@update
//   DELETE          video-item/{video_item} ......*.... video-item.destroy › VideoItemController@destroy
//   GET|HEAD        video-item/{video_item}/edit .*.......... video-item.edit › VideoItemController@edit
//   GET|HEAD        video/create .................*............... video.create › VideoController@create
//   GET|HEAD        video/{video} ................*................... video.show › VideoController@show
//   PUT|PATCH       video/{video} ................*............... video.update › VideoController@update
//   DELETE          video/{video} ................*............. video.destroy › VideoController@destroy
//   GET|HEAD        video/{video}/edit ...........*................... video.edit › VideoController@edit

