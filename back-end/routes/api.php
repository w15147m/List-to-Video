<?php

use App\Http\Controllers\admin\authController;
use App\Http\Controllers\BrandsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\TempImageController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [authController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resources([
        'categories' => CategoryController::class,
        'brands'     => BrandsController::class,
        'sizes' => SizeController::class,
        'products' => ProductController::class,
        'tem-images' => TempImageController::class,


    ]);

});

//   GET|HEAD        /brands ................................. brands.index › BrandsController@index
//   POST            /brands ................................. brands.store › BrandsController@store
//   GET|HEAD        /brands/{brand} ........................... brands.show › BrandsController@show
//   PUT|PATCH       /brands/{brand} ....................... brands.update › BrandsController@update
//   DELETE          /brands/{brand} ..................... brands.destroy › BrandsController@destroy
//   GET|HEAD        /brands/{brand}/edit ...................... brands.edit › BrandsController@edit
//   GET|HEAD        /categories ....................... categories.index › CategoryController@index
//   POST            /categories ....................... categories.store › CategoryController@store
//   GET|HEAD        /categories/create .............. categories.create › CategoryController@create
//   GET|HEAD        /categories/{category} .............. categories.show › CategoryController@show
//   PUT|PATCH       /categories/{category} .......... categories.update › CategoryController@update
//   DELETE          /categories/{category} ........ categories.destroy › CategoryController@destroy
//   GET|HEAD        /categories/{category}/edit ......... categories.edit › CategoryController@edit
