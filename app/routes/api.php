<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\CharlaController;

Route::get('/charlas', [CharlaController::class, 'index']);