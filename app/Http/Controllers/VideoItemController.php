<?php
namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\videoItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VideoItemController extends Controller
{

    public function index()
    {
        $video      = Video::latest()->first();
        $videoItems = $video->videoItems()->orderby('sequence', 'ASC')->get();

        return Inertia::render('video-admin/videos/VideoItemPage', [
            'video_items' => $videoItems,
            'video'       => $video->only('id', 'title'),
        ]);
    }

    public function create(Request $request)
    {
        $id    = $request->query('video');
        $video = Video::findOrFail($id);
        info($video);
        return Inertia::render('video-admin/videos/VideoItemCreate', [
            'video' => $video->only('id', 'title'),
        ]);
    }

    public function store(Request $request, Video $video)
    {
        $validated = $request->validate([
            'heading'    => 'nullable|string|max:255',
            'subheading' => 'nullable|string|max:255',
            'main_value' => 'required|string|max:1000',
            'media_url'  => 'nullable|url|max:255',
        ]);

        DB::transaction(function () use ($video, $validated) {
            $lastItem              = $video->videoItems()->orderByDesc('sequence')->first();
            $validated['sequence'] = $lastItem ? $lastItem->sequence + 1 : 1;

            $video->videoItems()->create($validated);
        });

        return redirect()->route('video_item.index', $video)
            ->with('success', 'Video Item created successfully!');
    }

    // public function edit(Video $video, videoItem $video_item)
    // {
    //     if ($video_item->video_id !== $video->id) {
    //         return redirect()->route('video_item.index', $video)
    //             ->with('error', 'Video item does not belong to the specified video.');
    //     }

    //     return Inertia::render('video-admin/videos/VideoItemEdit', [
    //         'video'      => $video->only('id', 'title'),
    //         'video_item' => $video_item,
    //     ]);
    // }

    // public function update(Request $request, Video $video, videoItem $video_item)
    // {

    //     info($video);
    //     info($video_item);
    //     info($$request->all());

    //     if ($video_item->video_id !== $video->id) {
    //         return redirect()->route('video_item.index', $video)
    //             ->with('error', 'Video item does not belong to the specified video.');
    //     }

    //     $validated = $request->validate([
    //         'heading'    => 'nullable|string|max:255',
    //         'subheading' => 'nullable|string|max:255',
    //         'main_value' => 'required|string|max:1000',
    //         'media_url'  => 'nullable|url|max:255',
    //     ]);

    //     $video_item->update($validated);

    //     return redirect()->route('video_item.index', $video)
    //         ->with('success', 'Video Item updated successfully!');
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  * Route: /video/{video}/items/{video_item} (video_item.destroy)
    //  */
    // public function destroy(Video $video, videoItem $video_item)
    // {
    //     if ($video_item->video_id !== $video->id) {
    //         return redirect()->back()
    //             ->with('error', 'Video item does not belong to the specified video.');
    //     }

    //     DB::transaction(function () use ($video_item, $video) {
    //         $video_item->delete();

    //         // Re-sequence the remaining items
    //         $video->videoItems()->orderBy('sequence', 'ASC')->each(function ($item, $index) {
    //             $item->update(['sequence' => $index + 1]);
    //         });
    //     });

    //     return redirect()->back()
    //         ->with('success', 'Video Item deleted successfully!');
    // }
}
