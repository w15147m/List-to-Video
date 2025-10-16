<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class authController extends Controller
{
    public function login(Request $request)
    {
        Log::info($request->all());
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            if ($user->role === 'admin') {
                $token = $user->createToken('admin-token')->plainTextToken;

                return response()->json([
                    "authUser"    => $user,
                    "status"  => 200,
                    "token"   => $token,
                    "id"      => $user->id,
                    "message" => "Admin login successful.",
                ], 200);
            }

            return response()->json([
                "status"  => 403,
                "message" => "You are not authorized to access this admin panel.",
            ], 403);
        }

        return response()->json([
            "status"  => 401,
            "message" => "Invalid credentials",
        ], 401);

    }

}
