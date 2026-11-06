<?php
 
namespace App\Models;
 
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
 
class UsuarioAdmin extends Authenticatable
{
    const CREATED_AT = 'fecha_creacion';
    const UPDATED_AT = null;
 
    protected $table = 'usuarios_admin';
    protected $primaryKey = 'id_admin';
 
    protected $fillable = ['nombre', 'correo', 'contraseña'];
    protected $hidden = ['contraseña'];
 
    protected function casts(): array
    {
        return ['contraseña' => 'hashed'];
    }
 
    public function getAuthPassword()
    {
        return $this->contraseña;
    }
 
    public function charlas(): HasMany
    {
        return $this->hasMany(Charla::class, 'id_admin', 'id_admin');
    }
}