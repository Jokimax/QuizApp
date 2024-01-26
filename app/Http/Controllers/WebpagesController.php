<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;

class WebpagesController extends Controller
{
    public function editor(Request $request){
        if(Quiz::find($request->id) === null){
            abort(404);
        }
        return view('editor');
    }

    public function quiz(Request $request){
        if(Quiz::find($request->id) === null){
            abort(404);
        }
        return view('quiz');
    }
}
