<template>
  <div class="h-100 min-h-screen bg-gray-900">
    <swole-header></swole-header>
    <div
      class="flex flex-col items-start items-center justify-center w-full w-full p-2 px-4 lg:p-12"
    >
      <div
        class="px-6 text-white text-center rounded-lg border border-gray-300 mb-10 w-11/12 py-2 lg:w-4/5 lg:py-16"
      >
        <h1 class="font-bold text-2xl lg:py-8 py-2">
          Oops, it looks like the page you're looking for doesn't exist.
        </h1>
        <div class="w-100 border-b border-gray-100" />
        <button
          @click="home"
          class="uppercase border border-gray-100 text-center text-sm mt-10 px-12 py-2 rounded-md font-bold bg-primary-very-light text-primary-blue"
        >
          Home
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SwoleHeader from "@/components/SwoleHeader";
import { useRouter } from "vue-router";

export default {
  name: "NotFound",
  components: {
    SwoleHeader,
  },
  setup() {
    const router = useRouter();

    const home = () => {
      router.push("/");
    };
    return {
      home,
    };
  },
};
</script>
