<template>
  <div class="min-h-full bg-gray-900">
    <swole-header></swole-header>
    <div
      class="flex flex-col items-start items-center justify-center w-full w-full p-2 px-4 lg:p-12"
    >
      <div
        class="px-6 text-white text-center rounded-lg border border-gray-300 mb-10 w-11/12 py-2 lg:w-4/5 lg:py-16"
      >
        <h5 class="font-bold text-2xl lg:py-8 py-2">
          Great work, hope you are feeling Swole
        </h5>
        <h5 class="font-bold text-2xl lg:py-8 py-2">You completed</h5>
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Exercise
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Odd row -->
                    <tr
                      v-for="userExercise in userExercises"
                      :key="userExercise.name"
                      class="bg-white"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {{ userExercise.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ userExercise.amount }}
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
import { useExercise } from "@/hooks";

export default {
  name: "Finish",
  components: {
    SwoleHeader,
  },
  setup() {
    const { reset, userExercises } = useExercise();

    return {
      reset,
      userExercises,
    };
  },
};
</script>
