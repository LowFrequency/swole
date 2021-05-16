import { ref, computed } from "vue";

export const useSlider = () => {

    const current = ref(0);
    const total = ref(0);

    const reset = ({ length = 0 }) => {
        current.value = 0;
        total.value = length;
    }

    const next = () => {
        const count = total.value.length;
        const next = current.value + 1;
        if (next <= count) {
            current.value = next;
        }
    }

    const previous = () => {
        const previous = current.value - 1;
        if (previous > 0) {
            current.value = previous;
        }
    }

    const go = ({ index = 0 } = {}) => {
        current.value = index;
    }

    return {
        current: computed(() => current.value),
        total: computed(() => total.value),
        reset,
        go,
        next,
        previous
    };
}