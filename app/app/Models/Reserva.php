<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
 
class Reserva extends Model
{
    public $timestamps = false;
 
    protected $table = 'reservas';
    protected $primaryKey = 'id_reserva';
 
    protected $fillable = ['id_usuario', 'id_charla', 'fecha_reserva', 'estado'];
 
    protected function casts(): array
    {
        return ['fecha_reserva' => 'datetime'];
    }
 
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }
 
    public function charla(): BelongsTo
    {
        return $this->belongsTo(Charla::class, 'id_charla', 'id_charla');
    }
}
 