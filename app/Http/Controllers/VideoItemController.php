<?php
namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\VideoItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

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

/**
 * Store new video item
 */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'heading'    => 'nullable|string|max:255',
            'subheading' => 'nullable|string|max:255',
            'main_value' => 'required|string|max:1000',
            'media_url'  => 'nullable|url|max:255',
            'video_id'   => 'required',
        ]);

        // Handle sequence number
        $nextSequence          = VideoItem::where('video_id', $validated['video_id'])->max('sequence');
        $validated['sequence'] = ($nextSequence ?? 0) + 1;

        $videoItem = VideoItem::create($validated);

        // If gallery image uploaded
        if ($request->gallery) {
            $imageName = $this->createImage($request->gallery);
            $videoItem->update(['media_url' => $imageName]);
        }

        return $this->showVideoItems($validated['video_id']);
    }

    /**
     * Update existing video item
     */
    public function update(Request $request, $id)
    {
        $video_item = VideoItem::findOrFail($id);

        // Store the old image name before updating anything
        $oldImage = $video_item->media_url;

        $validated = $request->validate([
            'heading'    => 'nullable|string|max:255',
            'subheading' => 'nullable|string|max:255',
            'main_value' => 'required|string|max:1000',
            'media_url'  => 'nullable|url|max:255',
            'video_id'   => 'required',
        ]);

        // Update textual fields
        $video_item->update($validated);

        if ($request->gallery) {
            // Delete the previous image using the stored name
            $this->deleteImage($oldImage);

            // Create and assign new one
            $imageName = $this->createImage($request->gallery);
            $video_item->update(['media_url' => $imageName]);
        }

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

    // /**
    //  * Remove the specified resource from storage.
    //  * Route: /video/{video}/items/{video_item} (video_item.destroy)
    //  */
    public function destroy($id)
    {
        $videoItem = VideoItem::findOrFail($id);
        $this->deleteImage($videoItem->media_url);
        $videoId = $videoItem->video_id;
        $videoItem->delete();
        return $this->showVideoItems($videoId);
    }

    /**
     * Helper: Create and store image in large/small folders
     */
    private function createImage($tempImage)
    {
        $imageName = 'video_item_' . time() . '_' . $tempImage['name'];
        $manager   = new ImageManager(new Driver());

        $tempPath  = public_path('uploads/temp/' . $tempImage['name']);
        $largePath = public_path('uploads/youtube/large/' . $imageName);
        $smallPath = public_path('uploads/youtube/small/' . $imageName);

        // Large thumbnail
        $img = $manager->read($tempPath);
        $img->scaleDown(1920);
        $img->save($largePath);

        // Small thumbnail
        $img = $manager->read($tempPath);
        $img->coverDown(400, 460);
        $img->save($smallPath);

        return $imageName;
    }

    /**
     * Helper: Delete both large & small images if they exist
     */
    private function deleteImage($fileName)
    {
        if (! $fileName) {
            return;
        }

        $paths = [
            public_path('uploads/youtube/large/' . $fileName),
            public_path('uploads/youtube/small/' . $fileName),
        ];

        foreach ($paths as $path) {
            if (file_exists($path)) {
                unlink($path);
            }
        }
    }
}
