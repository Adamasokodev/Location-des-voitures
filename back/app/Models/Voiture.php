<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    protected $fillable = [
        'marque',
        'model',
        'prix',
        'status',
        'image',
    ];

    public function reservation()
    {
        return parent::hasMany(Reservation::class);
    }
}
