<?php
namespace App\Http\Controllers\api;

use App\Http\Controllers\api\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservaController extends Controller
{
    /**
     * Mostrar las charlas reservadas por un usuario.
     */
    public function reserva(string $id_usuario): JsonResponse
    {
        $reservas = DB::table('reservas')
            ->join(
                'charlas',
                'reservas.id_charla',
                '=',
                'charlas.id_charla'
            )
            ->join(
                'usuarios as ponentes',
                'charlas.id_usuario',
                '=',
                'ponentes.id_usuario'
            )
            ->where('reservas.id_usuario', $id_usuario)
            ->select(
                'reservas.id_reserva',
                'reservas.fecha as fecha_reserva',
                'charlas.id_charla',
                'charlas.titulo',
                'charlas.descripcion',
                'charlas.fecha as fecha_charla',
                'charlas.estado',
                'ponentes.nombre as ponente'
            )
            ->orderBy('reservas.fecha', 'desc')
            ->get();

        return response()->json($reservas, 200);
    }

    /**
     * Reservar una charla.
     */
    public function ReservaCharla(Request $request): JsonResponse
    {
        $request->validate([
            'id_usuario' => 'required|exists:usuarios,id_usuario',
            'id_charla' => 'required|exists:charlas,id_charla'
        ]);

        // Comprobar si el usuario ya ha reservado esta charla.
        $existe = DB::table('reservas')
            ->where('id_usuario', $request->id_usuario)
            ->where('id_charla', $request->id_charla)
            ->exists();

        if ($existe) {
            return response()->json([
                'mensaje' => 'Ya tienes reservada esta charla.'
            ], 409);
        }

        // Insertar la reserva.
        $id_reserva = DB::table('reservas')->insertGetId([
            'id_usuario' => $request->id_usuario,
            'id_charla' => $request->id_charla,
            'fecha' => now()
        ]);

        return response()->json([
            'mensaje' => 'Reserva realizada correctamente.',
            'id_reserva' => $id_reserva
        ], 201);
    }

    /**
     * Cancelar una reserva.
     */
    public function cancelarReserva(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'id_usuario' => 'required|exists:usuarios,id_usuario'
        ]);

        $eliminada = DB::table('reservas')
            ->where('id_reserva', $id)
            ->where('id_usuario', $request->id_usuario)
            ->delete();

        if (!$eliminada) {
            return response()->json([
                'mensaje' => 'Reserva no encontrada.'
            ], 404);
        }

        return response()->json([
            'mensaje' => 'Reserva cancelada correctamente.'
        ], 200);
    }
}
