<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('asistencias', function (Blueprint $table) {
            $table->id('id_asistencia');
 
            $table->foreignId('id_usuario')
                ->constrained('usuarios', 'id_usuario')
                ->cascadeOnUpdate()->cascadeOnDelete();
 
            $table->foreignId('id_charla')
                ->constrained('charlas', 'id_charla')
                ->cascadeOnUpdate()->cascadeOnDelete();
 
            $table->timestamp('fecha_asistencia')->useCurrent();
            $table->enum('estado', ['presente', 'ausente'])->default('ausente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asistencias');
    }
};
