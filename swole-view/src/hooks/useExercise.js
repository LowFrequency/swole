import { ref, watch } from "vue";
import { getLevels, getExercises } from "@/services/data";
import { setModalMessage } from "@/services/modal";
import { setRedirect } from "@/services/routes";

const userExercises = ref([]);
const currentExercise = ref("");
const currentIndex = ref(0);
const total = ref(0);
const timing = ref({ start: null, finish: null, time: null });
const currentLevel = ref(1);
const currentRep = ref(1);

export const useExercise = () => {

    const levels = getLevels();
    const exercises = getExercises();

    const setExercises = () => {
        const level = levels[currentLevel.value - 1];
        const shuffledExericses = exercises.sort(() => 0.5 - Math.random());
        const randomExericses = shuffledExericses.slice(0, level.exercises);
        userExercises.value = randomExericses.map(randomExericse => {
            return {
                name: randomExericse.name,
                desc: randomExericse.desc,
                image: randomExericse.image,
                amount: randomExericse[level.level],
            };
        });
        currentIndex.value = 0;
        total.value = userExercises.value.length;
        currentExercise.value = userExercises.value[0];
        timing.value.start = Date.now();
        setRedirect({ route: "/exercise" });
    }

    const go = ({ index = 0 } = {}) => {
        currentIndex.value = index;
        currentExercise.value = userExercises.value[index];
    }

    const next = () => {
        const nextIndex = currentIndex.value + 1;
        if (nextIndex < total.value) {
            go({ index: nextIndex });
        }
        if (nextIndex === total.value) {
            finish();
        }
    }

    const previous = () => {
        const previousIndex = currentIndex.value - 1;
        if (previousIndex >= 0) {
            go({ index: previousIndex });
        }
    }

    const finish = ({ route = '/finish' } = {}) => {
        const level = levels[currentLevel.value - 1];
        if (level.reps === currentRep.value) {
            timing.value.finish = Date.now();
            timing.value.time = timing.value.finish - timing.value.start;
            setRedirect({ route });
        } else {
            setModalMessage({
                title: '',
                message: 'Hahaha. You thought you were finished. Keep going motherfucker',
                open: true
            });
            currentRep.value++;
            go({ index: 0 });
        }

    }

    const reset = ({ route = '/' } = {}) => {
        setExercises();
        setRedirect({ route });
    }

    watch(currentExercise, (newExercise) => {
        currentExercise.value = newExercise;
    });
    watch(currentIndex, (newIndex) => {
        currentIndex.value = newIndex;
    });

    const swipe = () => {
        return function (direction) {
            if (direction === "right") {
                previous();
            } else if (direction === "left") {
                next();
            }
        };
    };

    return {
        total,
        levels,
        timing,
        currentLevel,
        currentIndex,
        userExercises,
        currentExercise,
        go,
        reset,
        swipe,
        finish,
        setExercises,
    };
}