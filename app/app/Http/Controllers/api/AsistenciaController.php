<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\Controller;
use Illuminate\Http\Request;
use Illuminate\http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AsistenciaController extends Controller
{
     // Consultar las asistencias de un usuario
    public function asistencias(string $id_usuario): JsonResponse
    {
        $asistencias = DB::table('asistencias')
            ->join('charlas', 'asistencias.id_charla', '=', 'charlas.id_charla')
            ->where('asistencias.id_usuario', $id_usuario)
            ->select(
                'asistencias.id_asistencia',
                'asistencias.id_usuario',
                'asistencias.id_charla',
                'asistencias.fecha_asistencia',
                'charlas.*'
            )
            ->get();

        return response()->json($asistencias, 200);
    }

    // Registrar una asistencia
    public function registrarAsistencia(Request $request): JsonResponse
    {
        $datos = $request->validate([
            'id_usuario' => 'required|exists:usuarios,id_usuario',
            'id_charla' => 'required|exists:charlas,id_charla',
        ]);

        // Comprobar si ya existe la asistencia
        $existe = DB::table('asistencias')
            ->where('id_usuario', $datos['id_usuario'])
            ->where('id_charla', $datos['id_charla'])
            ->exists();

        if ($existe) {
            return response()->json([
                'mensaje' => 'El usuario ya tiene registrada la asistencia a esta charla'
            ], 409);
        }

        $id = DB::table('asistencias')->insertGetId([
            'id_usuario' => $datos['id_usuario'],
            'id_charla' => $datos['id_charla'],
            'fecha_asistencia' => now(),
        ]);

        return response()->json([
            'mensaje' => 'Asistencia registrada correctamente',
            'id_asistencia' => $id
        ], 201);
    }

    // Eliminar una asistencia
    public function eliminarAsistencia(string $id_asistencia): JsonResponse
    {
        $eliminada = DB::table('asistencias')
            ->where('id_asistencia', $id_asistencia)
            ->delete();

        if (!$eliminada) {
            return response()->json([
                'mensaje' => 'No se encontró la asistencia'
            ], 404);
        }

        return response()->json([
            'mensaje' => 'Asistencia eliminada correctamente'
        ], 200);
    }
}
