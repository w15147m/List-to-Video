<?php
namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderby('created_at', 'DESC')->get();
        return response()->json(
            [
                'status' => 200,
                'data'   => $categories,
            ]
        );

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
           'name' => 'required|unique:categories,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $category         = new Category();
        $category->name   = $request->name;
        $category->status = $request->status;
        $category->save();
        return response()->json([
             'message' => 'Category created',
            "data" => $category,
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category =   $category = Category::where('id', $id)->first();
        if ($category == null) {
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
                'data'   => $category,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        $category =   $category = Category::where('id', $id)->first();
        if ($category == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'massage' => 'Data not found',
                    'data'    => [],
                ]
            );
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $category->name   = $request->name;
        $category->status = $request->status;
        $category->save();
        return response()->json([
            "data" => $category,
        ], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::where('id', $id)->first();
        if ($category == null) {
            return response()->json(
                [
                    'status'  => 404,
                    'massage' => 'Data not found',
                    'data'    => [],
                ]
            );
        }
        $category->delete();
        return response()->json([
            'massage' => 'Data Deleted successfully',
        ], 200);
    }



}
