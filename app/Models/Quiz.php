<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    public $timestamps = false;
    protected $fillable = ['name', 'description', 'image', 'questions'];
}
