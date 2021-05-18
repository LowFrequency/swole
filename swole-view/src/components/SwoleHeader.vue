<template>
  <header
    class="relative text-center text-gray-300 max-w-2xl mx-auto p-2 lg:p-8 lg:pt-20"
  >
    <router-link to="/" class="flex items-start items-center justify-center">
      <img src="/img/icons/favicon-32x32.png" class="bg-gray-300 mb-4 mr-4" />
      <h1 class="text-3xl font-extrabold tracking-tight text-white mb-4">Swole</h1>
    </router-link>
    <p class="text-lg max-w-xl mx-auto">Get swole motherfucker</p>
  </header>
</template>

<script>
export default {
  name: "SwoleHeader",
};
</script>
