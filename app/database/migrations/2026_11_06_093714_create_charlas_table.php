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
         Schema::create('charlas', function (Blueprint $table) {
            $table->id('id_charla');
 
            // id_usuario = ponente de la charla
            $table->foreignId('id_usuario')
                ->constrained('usuarios', 'id_usuario')
                ->cascadeOnUpdate()->restrictOnDelete();
 
            $table->foreignId('id_sala')
                ->constrained('salas', 'id_sala')
                ->cascadeOnUpdate()->restrictOnDelete();
 
            $table->foreignId('id_admin')
                ->constrained('usuarios_admin', 'id_admin')
                ->cascadeOnUpdate()->restrictOnDelete();
 
            $table->string('titulo', 100);
            $table->text('descripcion');
            $table->timestamp('fecha')->useCurrent();
            $table->enum('estado', ['proximamente', 'en_curso', 'finalizada', 'cancelada'])->default('proximamente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charlas');
    }
};
