<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salas', function (Blueprint $table) {
            $table->id('id_sala');
            $table->string('nombre', 100);
            $table->integer('capacidad');
            $table->string('ubicacion', 255);
            $table->enum('estado', ['disponible', 'ocupada', 'en_mantenimiento'])->default('disponible');
        });
    }
 
    public function down(): void
    {
        Schema::dropIfExists('salas');
    }
};