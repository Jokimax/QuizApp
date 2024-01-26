<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;

class QuizzesController extends Controller
{
    public function createQuiz(Request $request){
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $latest = Quiz::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'image' => $request->input('image'),
            'questions' => json_encode([['text'=>"question", 'img'=>null, 'type'=>"radio", 'answers'=>["answer"], 'correctAnswers'=>[]]])
        ]);

        return response()->json(['id'=>$latest->id]);
    }

    public function getQuizzesForDisplay(Request $request){
        $quizzes = Quiz::where('id', '>', $request->id)->take(8)->get();
        if($quizzes->last() != null){
            $quizzesRes = [];
            foreach ($quizzes as $quiz) {
                $quizRes['id'] = $quiz->id;
                $quizRes['name'] = $quiz->name;
                $quizRes['description'] = $quiz->description;
                array_push($quizzesRes, $quizRes);
            }
            $lastQuizId = end($quizzesRes)['id'];
            return response()->json(['quizzes'=>$quizzesRes, 'quizLeft'=>Quiz::find($lastQuizId) === null]);
        }
        return response()->json(['quizzes'=>[], 'quizLeft'=>false]);
    }

    public function getCoverImage(Request $request){
        $image = Quiz::find($request->id);
        return $image->image;
    }

    public function getQuiz(Request $request){
        $quiz = Quiz::find($request->id);
        return $quiz;
    }

    public function updateQuiz(Request $request){
        $updated = $request->quizData;
        $quiz = Quiz::find($updated['id']);

        $quiz->name = $updated['name'];
        $quiz->description = $updated['description'];
        $quiz->image = $updated['image'];
        $quiz->questions = $updated['questions'];

        $quiz->save();
    }

    public function deleteQuiz(Request $request){
        Quiz::where('id', $request->id)->delete();
    }

    public function getQuestionCount(Request $request){
        $questions = Quiz::where('id', $request->id)->get('questions');
        $questions = json_decode($questions[0]->questions);
        return response()->json(['size'=>sizeof($questions)]);
    }

    public function getQuestion(Request $request){
        $questions = Quiz::where('id', $request->id)->get('questions');
        $questions = json_decode($questions[0]->questions);
        $question = $questions[$request->questionIndex];
        $questionRes['text'] = $question->text;
        $questionRes['img'] = $question->img;
        $questionRes['type'] = $question->type;
        $questionRes['answers'] = $question->answers;
        return response()->json($questionRes);
    }

    public function completeQuiz(Request $request){
        $questions = Quiz::where('id', $request->id)->get('questions');
        $questions = json_decode($questions[0]->questions);
        $answers = $request->answers;
        $correctAnswers = [];
        $score = 0;
        for ($i = 0; $i < sizeof($answers); $i++) {
            $correctAnswer = $questions[$i]->correctAnswers;
            sort($correctAnswer);
            sort($answers[$i]);
            array_push($correctAnswers, $correctAnswer);
            if($answers[$i] == $correctAnswer) $score++;
        }
        return response()->json(['correctAnswers'=>$correctAnswers, 'score'=>$score]);;
    }
}
