<template>
  <header
    class="relative text-center text-gray-300 max-w-2xl mx-auto p-2 lg:p-8 lg:pt-20"
  >
    <div class="absolute z-10 flex-shrink-0 h-16 flex">
      <button
        @click="admin"
        type="button"
        class="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <span class="sr-only">Config</span>
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
    </div>
    <router-link to="/" class="flex items-start items-center justify-center">
      <img src="/img/icons/favicon-32x32.png" class="bg-gray-300 mb-4 mr-4" />
      <h1 class="text-3xl font-extrabold tracking-tight text-white mb-4">Swole</h1>
    </router-link>
    <p class="text-lg max-w-xl mx-auto">Get swole motherfucker</p>
  </header>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "SwoleHeader",
  setup() {
    const router = useRouter();

    const admin = () => {
      router.push("/admin");
    };
    return {
      admin,
    };
  },
};
</script>
