<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TempImage extends Model
{
    /** @use HasFactory<\Database\Factories\TempImageFactory> */
    use HasFactory;
     protected $appends = ['image_url'];
    public function getImageUrlAttribute()
    {
        if ($this->name == "") {
            return "";
        }
        return asset('/uploads/temp/' . $this->name);
    }
}
