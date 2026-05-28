<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use OpenApi\Attributes as OA;

/**
 * @OA\Info(
 *     title="API",
 *     version="1.0.0",
 *     description="Dokumentacja"
 * )
 * 
 * @OA\Server(
 *     url="http://127.0.0.1:8000/api",
 *     description="Lokalny serwer"
 * )
 */

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::paginate(5));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8'
        ]);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'admin'
        ]);

        return response()->json($user);
    }

    public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'surname' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $id,
    ]);

    $user->update([
        'name' => $request->name,
        'surname' => $request->surname,
        'email' => $request->email,
    ]);

    return response()->json($user);
}

    public function destroy($id)
    {
        User::destroy($id);

        return response()->json(['message' => 'deleted']);
    }
}