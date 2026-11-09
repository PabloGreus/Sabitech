<?php
 
namespace App\Http\Controllers;
 
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
 
class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $datos = $request->validate([
            'nombre'     => 'required|string|max:100',
            'correo'     => 'required|email|max:100|unique:usuarios,correo',
            'contraseña' => 'required|string|min:8|confirmed',
        ]);
 
        $usuario = Usuario::create([
            'nombre'     => $datos['nombre'],
            'correo'     => $datos['correo'],
            'contraseña' => Hash::make($datos['contraseña']),
            'rol'        => 'usuario',
        ]);
 
        Auth::guard('web')->login($usuario);
        $request->session()->regenerate();
 
        return response()->json($usuario, 201);
    }
 
    /** Login de usuarios / ponentes / personal de acceso. */
    public function login(Request $request): JsonResponse
    {
        $datos = $request->validate([
            'correo'     => 'required|email',
            'contraseña' => 'required|string',
        ]);
 
        $ok = Auth::guard('web')->attempt(
            ['correo' => $datos['correo'], 'password' => $datos['contraseña']],
            $request->boolean('recordarme')
        );
 
        if (! $ok) {
            return response()->json(['message' => 'Credenciales incorrectas.'], 401);
        }
 
        $request->session()->regenerate();
 
        return response()->json(Auth::guard('web')->user());
    }
 
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
 
        return response()->json(['message' => 'Sesión cerrada.']);
    }
 
    /** Login de administradores (guard "admin"). */
    public function adminLogin(Request $request): JsonResponse
    {
        $datos = $request->validate([
            'correo'     => 'required|email',
            'contraseña' => 'required|string',
        ]);
 
        $ok = Auth::guard('admin')->attempt(
            ['correo' => $datos['correo'], 'password' => $datos['contraseña']]
        );
 
        if (! $ok) {
            return response()->json(['message' => 'Credenciales incorrectas.'], 401);
        }
 
        $request->session()->regenerate();
 
        return response()->json(Auth::guard('admin')->user());
    }
 
    public function adminLogout(Request $request): JsonResponse
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
 
        return response()->json(['message' => 'Sesión de administrador cerrada.']);
    }
}