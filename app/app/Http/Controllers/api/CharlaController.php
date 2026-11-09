<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CharlaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): jsonResponse
    {
     $charlas = DB::table('charlas')
        ->join('usuarios', 'charlas.id_usuario', '=', 'usuarios.id_usuario')
        ->select(
            'charlas.id_charla',
            'charlas.titulo',
            'charlas.descripcion',
            'usuarios.nombre as ponente',
            'charlas.fecha',
            'charlas.estado'
        )
        ->orderBy('charlas.id_charla')
        ->get();
        
        return response()->json($charlas, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
