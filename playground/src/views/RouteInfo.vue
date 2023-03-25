<template>
    <div
        class="flex flex-col justify-center h-full w-3/4 text-lg"
    >
        <p class="text-4xl mb-4">Current Route</p>
        Path: {{ $route.fullPath }} <br>
        Query: {{ $route.query }} <br>
        Hash: {{ $route.hash }} <br>
        Redirect From: {{ $route.redirectedFrom?.fullPath }}
    </div>
</template>