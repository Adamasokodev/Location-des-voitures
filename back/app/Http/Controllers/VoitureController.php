<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voitures = Voiture::select('id', 'marque', 'model', 'prix', 'status', 'image')->OrderBy('id', 'desc')->get();
        return response()->json([
            'voitures' => $voitures
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'marque' => 'required',
            'model' => 'required',
            'prix' => 'required',
            'status' => 'required',
            'image' => 'required|image'
        ]);

        $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('voitures/images', $request->image, $imageName);
        $voiture = Voiture::create($request->post() + ['image' => $imageName]);
        return response()->json([
            'voiture' => $voiture,
            'message' => "Voiture ajouté avec succès"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Voiture $voiture)
    {
        return response()->json([
            'voiture' => $voiture
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voiture $voiture)
    {
        $request->validate([
            'marque' => 'required',
            'model' => 'required',
            'prix' => 'required',
            'status' => 'required',
            'image' => 'nullable|image'
        ]);

        $voiture->fill($request->post())->update();

        if ($request->hasFile('image')) {
            if ($voiture->image) {
                $exist = Storage::disk('public')->exists("voitures/images/{$voiture->image}");
                if ($exist) {
                    Storage::disk('public')->delete("voitures/images/{$voiture->image}");
                }
            }

            $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('voitures/images', $request->image, $imageName);
            $voiture->image = $imageName;
        }


        $voiture->save();
        return response()->json([
            'voiture' => $voiture,
            'message' => "Voiture modifier avec succès"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voiture $voiture)
    {
        if ($voiture->image) {
            $exist = Storage::disk('public')->exists("voitures/images/{$voiture->image}");
            if ($exist) {
                Storage::disk('public')->delete("voitures/images/{$voiture->image}");
            }
        }

        $voiture->delete();
        return response()->json([
            'message' => "Voiture supprimé avec succès"
        ]);
    }
}
