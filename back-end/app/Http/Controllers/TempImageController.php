<?php
namespace App\Http\Controllers;

use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class TempImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tempImages = TempImage::orderby('created_at', 'DESC')->get();
        return response()->json(
            [
                'status' => 200,
                'data'   => $tempImages,
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

// Validate the request
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }
        $image     = $request->file('image');
        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('uploads/temp'), $imageName);

        $tempImage       = new TempImage();
        $tempImage->name = $imageName;
        $tempImage->save();

        $manager = new ImageManager(new Driver());
        $img     = $manager->read(public_path('uploads/temp/' . $imageName));
        $img->coverDown(400, 450);
        $img->save(public_path('uploads/temp/thumb/' . $imageName));

        return response()->json([
            'message' => 'Category created',
            "data"    => $tempImage,
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(TempImage $tempImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TempImage $tempImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTempImageRequest $request, TempImage $tempImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TempImage $tempImage)
    {
        //
    }
}
