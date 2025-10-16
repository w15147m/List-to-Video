<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorevideoItemRequest;
use App\Http\Requests\UpdatevideoItemRequest;
use App\Models\Video;
use App\Models\videoItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $video = Video::first();
        $videoItems = videoItem::orderby('created_at', 'DESC')->get();
        return Inertia::render('video-admin/videos/VideoItemPage', [
            'video_items' => $videoItems,
            'video' => $video,
            'status' => 200,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(videoItem $videoItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(videoItem $videoItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatevideoItemRequest $request, videoItem $videoItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(videoItem $videoItem)
    {
        //
    }
}
