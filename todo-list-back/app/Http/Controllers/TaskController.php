<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(Request $request)
     {
          $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'priority' => 'required|integer',
            'due_date' => 'required|date',
        ]);

        $user = Auth::user();

        $task = new Task();
        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->priority = $request->input('priority');
        $task->due_date = $request->input('due_date');
        $task->user_id = $user->id;
        $task->save();

        return response()->json(['message' => 'Task created successfully'], 201);
    }


    public function index()
    {
        $user = Auth::user();
        $tasks = Task::where('user_id', $user->id)->get();
        return response()->json(['tasks' => $tasks], 200);
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'priority' => 'required|integer',
            'due_date' => 'required|date',
        ]);

        $user = Auth::user();

        $task = Task::where('user_id', $user->id)->find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->priority = $request->input('priority');
        $task->due_date = $request->input('due_date');
        $task->save();

        return response()->json(['message' => 'Task updated successfully'], 200);
    }


    public function destroy($id)
    {
        $user = Auth::user();

        $task = Task::where('user_id', $user->id)->find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }







}
