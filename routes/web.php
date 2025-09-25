<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::get("/courses", function () {
    return inertia("Course");
});

Route::get("/students", function () {
    return inertia("Student");
});
