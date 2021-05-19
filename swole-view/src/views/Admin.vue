<template>
  <div class="min-h-full lg:h-full h-screen bg-gray-900">
    <swole-header></swole-header>
    <div
      class="flex flex-col items-start items-center justify-center w-full w-full p-2 px-4 lg:p-12"
    >
      <div
        class="px-6 text-white text-center rounded-lg border border-gray-300 mb-10 w-11/12 py-2 lg:w-4/5 lg:py-16"
      >
        <h5 class="font-bold text-2xl lg:py-8 py-2">Connect to Google Fit</h5>
        <div class="w-100 border-b border-gray-100" />
        <button
          @click="connect"
          class="uppercase border border-gray-100 text-center text-sm mt-10 px-12 py-2 rounded-md font-bold bg-primary-very-light text-primary-blue"
        >
          Connect
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SwoleHeader from "@/components/SwoleHeader";
import { useGoogleFit } from "@/hooks";

export default {
  name: "Admin",
  components: {
    SwoleHeader,
  },
  setup() {
    const { connect } = useGoogleFit();

    return {
      connect,
    };
  },
};
</script>
