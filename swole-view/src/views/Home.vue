<template>
  <div class="min-h-full h-screen bg-gray-900">
    <header
      class="relative text-center text-gray-300 max-w-2xl mx-auto p-2 lg:p-8 lg:pt-20"
    >
      <h1 class="text-3xl font-extrabold tracking-tight text-white mb-4">Swole</h1>
      <p class="text-lg max-w-xl mx-auto">Get swole motherfucker</p>
    </header>
    <div
      class="flex flex-col items-start items-center justify-center w-full w-full p-2 px-4 lg:p-12"
    >
      <div
        class="px-6 text-white text-center rounded-lg border border-gray-300 mb-10 w-11/12 py-2 lg:w-4/5 lg:py-16"
      >
        <h5 class="font-bold text-2xl lg:py-8 py-2">What hard are you?</h5>
        <div class="rounded-md -space-y-px">
          <label
            v-for="level in levels"
            :key="level.level"
            class="relative block rounded-lg border border-gray-300 shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <input
              type="radio"
              name="server_size"
              :value="level.level"
              v-model="currentLevel"
              class="sr-only"
            />
            <div class="text-sm">
              <p class="text-xl text-center">{{ level.desc }}</p>
            </div>
            <div
              :class="{
                'border-transparent': currentLevel != level.level,
                'border-indigo-500': currentLevel == level.level
              }"
              class="absolute -inset-px rounded-lg border-2 pointer-events-none"
              aria-hidden="true"
            ></div>
          </label>
        </div>
        <div class="w-100 border-b border-gray-100" />
        <button
          @click="setExercises"
          class="uppercase border border-gray-100 text-center text-sm mt-10 px-12 py-2 rounded-md font-bold bg-primary-very-light text-primary-blue"
        >
          Start
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useExercise } from "@/hooks";

export default {
  name: "Home",
  setup() {
    const {
      levels,
      currentLevel,
      setExercises,
    } = useExercise();

    return {
      levels,
      currentLevel,
      setExercises,
    };
  },
};
</script>
