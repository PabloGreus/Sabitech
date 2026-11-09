<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
 
class Sala extends Model
{
    public $timestamps = false;
 
    protected $table = 'salas';
    protected $primaryKey = 'id_sala';
 
    protected $fillable = ['nombre', 'capacidad', 'ubicacion', 'estado'];
 
    public function charlas(): HasMany
    {
        return $this->hasMany(Charla::class, 'id_sala', 'id_sala');
    }
}