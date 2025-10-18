<?php
namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\VideoItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoItemController extends Controller
{

    public function index()
    {
        $video      = Video::latest()->first();
        $videoItems = $video->videoItems()->orderby('sequence', 'ASC')->get();

        return Inertia::render('video-admin/videos/videoItem/VideoItemPage', [
            'video_items' => $videoItems,
            'video'       => $video->only('id', 'title'),
        ]);
    }

    public function create(Request $request)
    {
        $id    = $request->query('video');
        $video = Video::findOrFail($id);
        return Inertia::render('video-admin/videos/videoItem/VideoItemCreate', [
            'video' => $video->only('id', 'title'),
        ]);
    }
    public function show($id)
    {
        $videoItems = VideoItem::where('id', $id)->orderby('sequence', 'ASC')->get();
        $item       = $videoItems[0];
        $video      = Video::where('id', $videoItems[0]->video_id)->first();
        info("video => " . $video);
        return Inertia::render('video-admin/videos/videoItem/VideoItemPage', [
            'video_items' => $videoItems,
            'video'       => $video->only('id', 'title'),
        ]);
    }

    public function showVideoItems($id)
    {
        $video      = Video::where('id', $id)->first();
        $videoItems = $video->videoItems()->orderby('sequence', 'ASC')->get();
        return Inertia::render('video-admin/videos/videoItem/VideoItemPage', [
            'video_items' => $videoItems,
            'video'       => $video->only('id', 'title'),
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'heading'    => 'nullable|string|max:255',
            'subheading' => 'nullable|string|max:255',
            'main_value' => 'required|string|max:1000',
            'media_url'  => 'nullable|url|max:255',
            'video_id'   => 'required',

        ]);
        $nextSequence = VideoItem::where('video_id', $validated['video_id'])
            ->max('sequence');
        $validated['sequence'] = ($nextSequence ?? 0) + 1;
        VideoItem::create($validated);
        return $this->showVideoItems($validated['video_id']);
    }
    public function edit($id)
    {

        $videoItems = VideoItem::where('id', $id)->first();
        $video      = Video::where('id', $videoItems->video_id)->first();
        return Inertia::render('video-admin/videos/videoItem/VideoItemEdit', [
            'video_item' => $videoItems,
            'video'      => $video->only('id', 'title'),
        ]);

    }

    public function update(Request $request, $id)
    {

        $video_item = VideoItem::where('id', $id)->first();

        $validated = $request->validate([
            'heading'    => 'nullable|string|max:255',
            'subheading' => 'nullable|string|max:255',
            'main_value' => 'required|string|max:1000',
            'media_url'  => 'nullable|url|max:255',
            'video_id'   => 'required',
        ]);
         $video_item->update($validated);
        info($video_item);

        return $this->showVideoItems($validated['video_id']);

    }

    // /**
    //  * Remove the specified resource from storage.
    //  * Route: /video/{video}/items/{video_item} (video_item.destroy)
    //  */
    public function destroy($id)
    {
        $videoItem = VideoItem::findOrFail($id);
        $videoId   = $videoItem->video_id;
        $videoItem->delete();
        return $this->showVideoItems($videoId);

    }
}
