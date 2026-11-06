<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios_admin', function (Blueprint $table) {
            $table->id('id_admin');
            $table->string('nombre', 100);
            $table->string('correo', 100)->unique();
            $table->string('contraseña', 255);
            $table->timestamp('fecha_creacion')->useCurrent();
        });
    }
 
    public function down(): void
    {
        Schema::dropIfExists('usuarios_admin');
    }
};