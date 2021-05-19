<template>
  <div class="min-h-full lg:h-full h-screen bg-gray-900">
    <div>
      <swole-header></swole-header>
      <div
        class="flex flex-col items-start items-center justify-center w-full w-full p-2 px-4 lg:p-12"
      >
        <div
          v-touch:swipe="swipe({ currentIndex })"
          class="px-6 text-white text-center rounded-lg border border-gray-300 mb-10 w-11/12 py-2 lg:w-4/5 lg:py-16"
        >
          <div
            class="flex flex-col items-start items-center justify-center w-full w-full"
          >
            <h5 class="font-bold text-4xl lg:pb-8 pb-2 inline">
              {{ currentExercise.name
              }}<svg
                @click="modal = !modal"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 pb-2 inline"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </h5>
            <h5 class="font-bold text-4xl lg:pb-8 pb-2">x{{ currentExercise.amount }}</h5>
          </div>
          <img
            :src="currentExercise.image"
            class="mx-auto bg-gray-300 h-1/4 my-2 lg:my-6"
          />
          <button
            v-if="total != currentIndex + 1"
            @click="go({ index: currentIndex + 1 })"
            class="uppercase border border-gray-100 text-center text-sm mt-10 px-12 py-2 rounded-md font-bold bg-primary-very-light text-primary-blue"
          >
            Next
          </button>
          <button
            v-if="total == currentIndex + 1"
            @click="finish"
            class="uppercase border border-gray-100 text-center text-sm mt-10 px-12 py-2 rounded-md font-bold bg-primary-very-light text-primary-blue"
          >
            Finish
          </button>
        </div>
        <nav class="text-center">
          <ol class="flex flex-row items-center">
            <li
              class="relative flex-shrink"
              :class="{ 'pr-6 sm:pr-20': item < total }"
              v-for="(item, index) in total"
              :key="index"
            >
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div
                  class="h-0.5 w-full"
                  :class="{
                    'bg-indigo-600': index < currentIndex,
                    'bg-gray-200': index >= currentIndex,
                  }"
                ></div>
              </div>

              <button
                v-if="index < currentIndex"
                @click="go({ index })"
                class="relative w-6 h-6 flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900"
              >
                <!-- Completed Step -->
                <svg
                  class="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Step {{ item }}</span>
              </button>

              <button
                v-if="index == currentIndex"
                class="relative w-6 h-6 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full"
                aria-current="step"
              >
                <!-- Current Step -->
                <span
                  class="h-2.5 w-2.5 bg-indigo-600 rounded-full"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Step {{ item }}</span>
              </button>

              <button
                v-if="index > currentIndex"
                @click="go({ index })"
                class="group relative w-6 h-6 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
              >
                <!-- Upcoming Step -->
                <span
                  class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Step {{ item }}</span>
              </button>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div v-if="modal" class="fixed z-10 inset-0 overflow-y-auto" role="dialog">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-60 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
        >
          <div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {{ currentExercise.name }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ currentExercise.desc }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button
              @click="modal = !modal"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import SwoleHeader from "@/components/SwoleHeader";
import { useExercise } from "@/hooks";

export default {
  name: "Exercise",
  components: {
    SwoleHeader,
  },
  setup() {
    const router = useRouter();
    const modal = ref(false);
    const { currentExercise, currentIndex, total, go, swipe, finish } = useExercise();

    if (currentExercise.value.length === 0) {
      router.push("/");
    }

    return {
      total: computed(() => total.value),
      currentIndex: computed(() => currentIndex.value),
      currentExercise: computed(() => currentExercise.value),
      modal,
      go,
      swipe,
      finish,
    };
  },
};
</script>
