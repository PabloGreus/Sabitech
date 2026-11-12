<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\CharlaController;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\ReservaController;

Route::get('/charlas', [CharlaController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/reserva', [ReservaController::class, 'reserva']);
Route::get('/reserva/{id_usuario}', [ReservaController::class, 'reserva']);
Route::post('/ReservaCharla', [ReservaController::class, 'ReservaCharla']);
Route::delete('/cancelarReserva/{id_reserva}', [ReservaController::class, 'cancelarReserva']);