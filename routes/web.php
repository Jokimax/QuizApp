<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebpagesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () { return view('homepage');});
Route::get('/createQuiz', function () { return view('createQuiz');});
Route::get('/edit/{id}', [WebpagesController::class, 'editor']);
Route::get('/quiz/{id}', [WebpagesController::class, 'quiz']);