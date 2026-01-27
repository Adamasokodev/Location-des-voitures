<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'voiture_id',
        'start_date',
        'end_date',
        'status'
    ];

    public function user()
    {
        return parent::belongsTo(User::class);
    }

    public function voiture()
    {
        return parent::belongsTo(Voiture::class);
    }
}
