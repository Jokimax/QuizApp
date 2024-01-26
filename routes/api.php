<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizzesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/createQuiz', [QuizzesController::class, 'createQuiz']);
Route::post('/getQuizzes', [QuizzesController::class, 'getQuizzesForDisplay']);
Route::post('/getCoverImage/{id}', [QuizzesController::class, 'getCoverImage']);
Route::post('/getQuiz/{id}', [QuizzesController::class, 'getQuiz']);
Route::post('/updateQuiz', [QuizzesController::class, 'updateQuiz']);
Route::post('/deleteQuiz/{id}', [QuizzesController::class, 'deleteQuiz']);
Route::post('/getQuizSize/{id}', [QuizzesController::class, 'getQuestionCount']);
Route::post('/getQuestion/{id}/{questionIndex}', [QuizzesController::class, 'getQuestion']);
Route::post('/completeQuiz/{id}', [QuizzesController::class, 'completeQuiz']);