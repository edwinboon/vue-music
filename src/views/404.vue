<template>
  <div
    class="
      flex
      items-center
      justify-center
      w-screen
      h-screen
      bg-gradient-to-r
      from-purple-900
      to-purple-500
    "
  >
    <div class="px-40 py-20 bg-white rounded-md shadow-xl">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-yellow-500 text-9xl">404</h1>

        <h6
          class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
        >
          <span class="text-purple-500">Oops!</span> Page not found
        </h6>

        <p class="mb-8 text-center text-gray-500 md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>

        <router-link
          :to="{ name: 'Home' }"
          class="px-6 py-2 text-sm font-semibold text-white bg-purple-500"
        >
          Go home
        </router-link>
      </div>
    </div>
  </div>
</template>
