<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data'   => $brands,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'   => 'required|string|max:255',
            'status' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $brand = new Brand();
        $brand->name   = $request->name;
        $brand->status = $request->status ?? 1; // default active
        $brand->save();

        return response()->json([
            'message' => 'Brand created successfully',
            'data'    => $brand,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'status'  => 404,
                'message' => 'Brand not found',
                'data'    => [],
            ]);
        }

        return response()->json([
            'status' => 200,
            'data'   => $brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'status'  => 404,
                'message' => 'Brand not found',
                'data'    => [],
            ]);
        }

        $validator = Validator::make($request->all(), [
            'name'   => 'required|string|max:255',
            'status' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $brand->name   = $request->name;
        $brand->status = $request->status ?? $brand->status;
        $brand->save();

        return response()->json([
            'message' => 'Brand updated successfully',
            'data'    => $brand,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'status'  => 404,
                'message' => 'Brand not found',
            ]);
        }

        $brand->delete();

        return response()->json([
            'message' => 'Brand deleted successfully',
        ], 200);
    }
}
