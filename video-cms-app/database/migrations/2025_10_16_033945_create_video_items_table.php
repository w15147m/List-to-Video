<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('video_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')
                  ->constrained()
                  ->onDelete('cascade')
                  ->comment('Links the item back to its parent video.');
            $table->integer('sequence')->comment('The order in which the slide appears (1, 2, 3...).');
            $table->string('heading', 100)->nullable()->comment('Main text (e.g., Player\'s Name, City Name).');
            $table->string('subheading', 100)->nullable()->comment('Secondary text (e.g., Last Club, Country).');
            $table->string('main_value', 50)->nullable()->comment('The prominent, large value (e.g., Year or Rank #).');
            $table->text('detail_text')->nullable()->comment('Additional text/description.');
            $table->string('media_url')->nullable()->comment('Path to the uploaded image or video clip for this item.');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_items');
    }
};
