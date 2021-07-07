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
          Fuck yeah, you are {{ level.desc }}
        </h1>
        <h2 class="font-bold text-2xl lg:py-8 py-2">You smashed it in {{ time }} mins</h2>
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 text-gray-300">
                  <thead class="">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Exercise
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="userExercise in userExercises" :key="userExercise.name">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {{ userExercise.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">
                        x{{ userExercise.amount }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100 border-b border-gray-100" />
        <button
          v-if="connected"
          @click="
            sendIt({
              start: timing.start,
              finish: timing.finish,
              title: level.desc,
            })
          "
          class="uppercase border border-gray-100 text-center text-sm mt-10 px-12 py-2 rounded-md font-bold bg-primary-very-light text-primary-blue"
        >
          Send to Google
        </button>
        <button
          @click="reset"
          class="uppercase border border-gray-100 text-center text-sm mt-10 px-12 py-2 rounded-md font-bold bg-primary-very-light text-primary-blue"
        >
          Start Again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SwoleHeader from "@/components/SwoleHeader";
import { useRouter } from "vue-router";
import { useExercise, useGoogleFit } from "@/hooks";
import { millisToMinutes } from "@/utils";

export default {
  name: "Finish",
  components: {
    SwoleHeader,
  },
  setup() {
    const router = useRouter();
    const { reset, levels, timing, currentLevel, userExercises } = useExercise();
    const { sendIt, googleUser: connected } = useGoogleFit();

    const level = levels[currentLevel.value - 1];
    const time = millisToMinutes({ time: timing.value.time });

    if (userExercises.value.length === 0) {
      router.push("/");
    }

    return {
      reset,
      level,
      time,
      timing,
      sendIt,
      connected,
      userExercises,
    };
  },
};
</script>
