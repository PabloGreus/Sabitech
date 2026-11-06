<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
 
class Asistencia extends Model
{
    public $timestamps = false;
 
    protected $table = 'asistencias';
    protected $primaryKey = 'id_asistencia';
 
    protected $fillable = ['id_usuario', 'id_charla', 'fecha_asistencia', 'estado'];
 
    protected function casts(): array
    {
        return ['fecha_asistencia' => 'datetime'];
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