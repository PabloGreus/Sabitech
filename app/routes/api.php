<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\CharlaController;
use App\Http\Controllers\api\AuthController;

Route::get('/charlas', [CharlaController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);