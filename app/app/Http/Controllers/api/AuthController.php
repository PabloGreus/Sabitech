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

    public function register(Request $request): JsonResponse
    {
        // 1. Comprobar que llegan los datos
        $request->validate([
            'nombre'     => 'required|string|max:255',
            'correo'     => 'required|string|email|max:255',
            'contraseña' => 'required|string|min:6',
        ]);

        // 2. Comprobar si el correo ya está registrado
        $usuarioExistente = DB::table('usuarios')
            ->where('correo', $request->correo)
            ->first();

        if ($usuarioExistente) {
            return response()->json(['message' => 'El correo ya se encuentra registrado.'], 422);
        }

        // 3. Insertar el nuevo usuario con la contraseña hasheada
        $idUsuario = DB::table('usuarios')->insertGetId([
            'nombre'     => $request->nombre,
            'correo'     => $request->correo,
            'contraseña' => Hash::make($request->contraseña),
        ]);

        // 4. Todo bien: devolver los datos del usuario creado
        return response()->json([
            'message' => 'Usuario registrado con éxito.',
            'user' => [
                'id'     => $idUsuario,
                'nombre' => $request->nombre,
                'email'  => $request->correo,
            ],
        ], 201);
    }
}