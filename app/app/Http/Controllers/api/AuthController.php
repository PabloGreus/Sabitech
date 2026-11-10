<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        // 1. Comprobar que llegan los datos
        $request->validate([
            'correo'    => 'required|string',
            'contraseña' => 'required',
        ]);

        // 2. Buscar al usuario por su email
        $usuario = DB::table('usuarios')
            ->where('correo', $request->correo)
            ->first();

        // 3. Si no existe o la contraseña no coincide, error
        if (!$usuario || !Hash::check($request->contraseña, $usuario->contraseña)) {
            return response()->json(['message' => 'Correo o contraseña incorrectos.'], 401);
        }

        // 4. Todo bien: devolver el usuario (sin la contraseña)
        return response()->json([
            'user' => [
                'id'     => $usuario->id_usuario,
                'nombre' => $usuario->nombre,
                'email'  => $usuario->correo,
            ],
        ], 200);
    }
}