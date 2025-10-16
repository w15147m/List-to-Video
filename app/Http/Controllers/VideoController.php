<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Models\Video;
use Inertia\Inertia;

class VideoController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Eager load the playlist relationship to avoid N+1 problem
        $videos = Video::with('playlist')->orderby('created_at', 'DESC')->get();
          return Inertia::render('video-admin/Playlist/PlaylistPage', [
            'playlists' => $videos,
            'status' => 200,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
           'title'         => 'required|string|max:255|unique:videos,title',
           'template_name' => 'required|string|max:50',
           'type'          => ['required', Rule::in(['short', 'full'])],
           'playlist_id'   => 'nullable|exists:playlists,id', // Must exist in playlists table
           // status and output_path will be set by default/system
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $video                  = new Video();
        $video->title           = $request->title;
        $video->template_name   = $request->template_name;
        $video->type            = $request->type;
        $video->playlist_id     = $request->playlist_id;
        // status defaults to 'pending' as per migration, no need to set explicitly unless overridden

        $video->save();

        // Load the playlist relationship before returning
        $video->load('playlist');

        return response()->json([
             'message' => 'Video created successfully',
            "data" => $video,
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Use find() and eager load the playlist relationship
        $video = Video::with('playlist')->find($id);

        if ($video == null) {
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
                'data'   => $video,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        $video = Video::find($id);

        if ($video == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'message' => 'Data not found',
                    'data'    => [],
                ]
            );
        }

        $validator = Validator::make($request->all(), [
            'title'         => 'required|string|max:255|unique:videos,title,' . $id, // Unique except for self
            'template_name' => 'sometimes|required|string|max:50',
            'type'          => ['sometimes', 'required', Rule::in(['short', 'full'])],
            'playlist_id'   => 'nullable|exists:playlists,id',
            'status'        => ['sometimes', 'required', Rule::in(['pending', 'processing', 'completed', 'failed'])],
            'output_path'   => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        // Use fill() for cleaner mass assignment of validated fields
        $video->fill($request->only([
            'title',
            'template_name',
            'type',
            'playlist_id',
            'status',
            'output_path'
        ]));

        $video->save();

        // Load the playlist relationship before returning
        $video->load('playlist');

        return response()->json([
            "message" => "Video updated successfully",
            "data" => $video,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $video = Video::find($id);

        if ($video == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'message' => 'Data not found',
                    'data'    => [],
                ]
            );
        }
        $video->delete();

        return response()->json([
            'message' => 'Data Deleted successfully',
        ], 200);
    }
}
