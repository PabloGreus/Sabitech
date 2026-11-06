<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Usuario extends Authenticatable
{
    const CREATED_AT = 'fecha_creacion';
    const UPDATED_AT = null;
 
    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';
 
    protected $fillable = ['nombre', 'correo', 'contraseña', 'rol'];
    protected $hidden = ['contraseña'];
 
    protected function casts(): array
    {
        return ['contraseña' => 'hashed'];
    }
 
    // Laravel espera una columna "password"; aquí se usa "contraseña"
    public function getAuthPassword()
    {
        return $this->contraseña;
    }
 
    public function charlas(): HasMany
    {
        return $this->hasMany(Charla::class, 'id_usuario', 'id_usuario');
    }
 
    public function reservas(): HasMany
    {
        return $this->hasMany(Reserva::class, 'id_usuario', 'id_usuario');
    }
 
    public function asistencias(): HasMany
    {
        return $this->hasMany(Asistencia::class, 'id_usuario', 'id_usuario');
    }
}