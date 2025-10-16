<?php
namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $playlist = Playlist::orderby('created_at', 'DESC')->get();
        return response()->json(
            [
                'status' => 200,
                'data'   => $playlist,
            ]
        );

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|unique:playlists,name',
            'description' => 'nullable|string', // Assuming description is optional
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $playlist              = new Playlist();
        $playlist->name        = $request->name;
        $playlist->description = $request->description;
        $playlist->save();
        return response()->json([
            'message' => 'Playlist created',
            "data"    => $playlist,
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Using find() is cleaner for primary key lookups
        $playlist = Playlist::find($id);

        if ($playlist == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'message' => 'Data not found',
                    'data'    => [],
                ]
            );
        }
        return response()->json(
            [
                'status' => 200,
                'data'   => $playlist,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        // Using find() is cleaner for primary key lookups
        $playlist = Playlist::find($id);

        if ($playlist == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'message' => 'Data not found',
                    'data'    => [],
                ]
            );
        }

        // Validation: required name, and unique name ignoring the current playlist's ID
        $validator = Validator::make($request->all(), [
            'name'        => 'required|unique:playlists,name,' . $id,
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $playlist->name        = $request->name;
        $playlist->description = $request->description;
        $playlist->save();
        return response()->json([
            "message" => "Playlist updated successfully",
            "data"    => $playlist,
        ], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Using find() is cleaner for primary key lookups
        $playlist = Playlist::find($id);

        if ($playlist == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'message' => 'Data not found',
                    'data'    => [],
                ]
            );
        }
        $playlist->delete();
        return response()->json([
            'message' => 'Data Deleted successfully',
        ], 200);
    }

}
