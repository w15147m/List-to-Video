<?php
namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::orderby('created_at', 'DESC')->with('images')->get();
        return response()->json(
            [
                'status' => 200,
                'data'   => $product,
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required',
            'price'       => 'required',
            'category'    => 'required',
            'qty'         => 'required',
            'sku'         => 'required|unique:products,sku',
            'status'      => 'required',
            'is_featured' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $product                    = new Product();
        $product->title             = $request->title;
        $product->price             = $request->price;
        $product->compare_price     = $request->compare_price;
        $product->category_id       = $request->category;
        $product->brand_id          = $request->brand;
        $product->sku               = $request->sku;
        $product->description       = $request->description;
        $product->short_description = $request->short_description;
        $product->qty               = $request->qty;
        $product->barcode           = $request->barcode;
        $product->status            = $request->status;
        $product->is_featured       = $request->is_featured;
        $product->save();
        info($request->gallery);
        if (! empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImage_id) {
                info($tempImage_id);

                $tempImage = TempImage::find($tempImage_id);
                $extArray  = explode('.', $tempImage->name);
                $ext       = end($extArray);
                $imageName = $product->id . '-' . uniqid() . '.' . $ext;


                //    Large thumbnail
                $manager = new ImageManager(new Driver());
                $img     = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));

                //    small thumbnail
                $manager = new ImageManager(new Driver());
                $img     = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/' . $imageName));
                info($imageName);

                //    save product image
                $productImg             = new ProductImage();
                $productImg->name       = $imageName;
                $productImg->product_id = $product->id;
                $productImg->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }

        }

        return response()->json([
            'message' => 'Category created',
            "data"    => $product,
        ], 200);
    }
    public function update($id, Request $request)
    {
        $product = $product = Product::where('id', $id)->first();
        if ($product == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'massage' => 'Data not found',
                    'data'    => [],
                ]
            );
        }

        $validator = Validator::make($request->all(), [
            'title'       => 'required',
            'price'       => 'required',
            'category'    => 'required',
            'qty'         => 'required',
            'sku'         => 'required|unique:products,sku,' . $id, ',id',
            'status'      => 'required',
            'is_featured' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $product->title             = $request->title;
        $product->price             = $request->price;
        $product->compare_price     = $request->compare_price;
        $product->category_id       = $request->category;
        $product->brand_id          = $request->brand;
        $product->sku               = $request->sku;
        $product->description       = $request->description;
        $product->short_description = $request->short_description;
        $product->qty               = $request->qty;
        $product->barcode           = $request->barcode;
        $product->status            = $request->status;
        $product->is_featured       = $request->is_featured;
        $product->save();
        return response()->json([
            'massage' => 'product has been updated successfully',
            "data"    => $product,
        ], 200);
    }
    public function show($id)
    {
        $product = $product = Product::where('id', $id)->first();
        if ($product == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'massage' => 'Data not found',
                    'data'    => [],
                ]
            );
        }
        return response()->json(
            [
                'status' => 200,
                'data'   => $product,
            ]
        );
    }

    public function destroy($id)
    {
        $product = Product::where('id', $id)->first();
        if ($product == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'massage' => 'Data not found',
                    'data'    => [],
                ]
            );
        }
        $product->delete();
        return response()->json([
            'massage' => 'Data Deleted successfully',
        ], 200);
    }
}
