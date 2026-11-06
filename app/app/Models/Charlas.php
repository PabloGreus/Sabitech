<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
 
class Charla extends Model
{
    public $timestamps = false;
 
    protected $table = 'charlas';
    protected $primaryKey = 'id_charla';
 
    protected $fillable = ['id_usuario', 'id_sala', 'id_admin', 'titulo', 'descripcion', 'fecha', 'estado'];
 
    protected function casts(): array
    {
        return ['fecha' => 'datetime'];
    }
 
    public function ponente(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }
 
    public function sala(): BelongsTo
    {
        return $this->belongsTo(Sala::class, 'id_sala', 'id_sala');
    }
 
    public function admin(): BelongsTo
    {
        return $this->belongsTo(UsuarioAdmin::class, 'id_admin', 'id_admin');
    }
 
    public function reservas(): HasMany
    {
        return $this->hasMany(Reserva::class, 'id_charla', 'id_charla');
    }
 
    public function asistencias(): HasMany
    {
        return $this->hasMany(Asistencia::class, 'id_charla', 'id_charla');
    }
}