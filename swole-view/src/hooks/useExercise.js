import { ref, computed } from "vue";

export const useExercise = () => {

    const userExercises = ref([]);
    const currentExercise = ref("");
    const currentIndex = ref(0);
    const total = ref(0);

    const exercises = {
        plank: {
            name: 'Plank',
            image: '../img/exercises/plank.png',
            desc: 'Lay on the floor with your elbows under your shoulders, hands flat on the floor and core engaged. Keeping your forearms and knees on the floor slowly raise yourself upwards until your body is in a straight line from your knees to your head. Hold the position for as long as you can.',
            1: '10 sec',
            2: '20 sec',
            3: '30 sec',
            4: '40 sec'
        },
        pushup: {
            name: 'Push ups',
            image: '../img/exercises/pushup.png',
            desc: 'Get down on all fours, placing your hands slightly wider than your shoulders. Straighten your arms and legs. Lower your body until your chest nearly touches the floor. Pause, then push yourself back up. Repeat.',
            1: '10',
            2: '20',
            3: '30',
            4: '40'
        },
        situp: {
            name: 'Situps',
            image: '../img/exercises/situp.png',
            desc: 'Lie down on your back. Bend your legs and stabilize your lower body. Cross your hands to opposite shoulders, or place them behind your ears without pulling on your neck. Lift your head and shoulder blades from the ground. Exhale as you rise. Lower, returning to your starting point. Inhale as you lower.',
            1: '20',
            2: '40',
            3: '60',
            4: '80'
        },
        burpee: {
            name: 'Burpees',
            image: '../img/exercises/burpee.png',
            desc: 'Stand with your feet shoulder-width apart and your arms by your sides. Lower into a squat position and place your hands on the floor. Kick or step your legs back into a plank position. Jump or step your legs forward to return to a squat position. Return to the standing position.',
            1: '10',
            2: '15',
            3: '20',
            4: '25'
        }
    };
    //pics https://thenounproject.com/creativestall/collection/pictograms-line-icons/

    const days = {
        0: {
            name: 'Sunday',
            exercises: [
                'plank',
                'pushup'
            ]
        },
        1: {
            name: 'Monday',
            exercises: [
                'situp',
                'pushup'
            ]
        },
        2: {
            name: 'Tuesday',
            exercises: [
                'plank',
                'situp'
            ]
        },
        3: {
            name: 'Wednesday',
            exercises: [
                'burpee',
                'pushup'
            ]
        },
        4: {
            name: 'Thursday',
            exercises: [
                'plank',
                'burpee'
            ]
        },
        5: {
            name: 'Friday',
            exercises: [
                'plank',
                'pushup'
            ]
        },
        6: {
            name: 'Saturday',
            exercises: [
                'situp',
                'burpee'
            ]
        },
    }

    const reset = () => {
        currentIndex.value = 0;
        total.value = userExercises.value.length;
        currentExercise.value = userExercises.value[0];
    }

    const setExercises = ({ level = 1 } = {}) => {
        const day = new Date().getDay();
        const exerciseDay = days[day];
        userExercises.value = exerciseDay.exercises.map(type => {
            const exercise = exercises[type];
            return {
                name: exercise.name,
                desc: exercise.desc,
                image: exercise.image,
                amount: exercise[level],
            };
        })
        reset();
    }
    setExercises();

    const next = () => {
        const count = total.value.length;
        const next = currentIndex.value + 1;
        if (next <= count) {
            currentIndex.value = next;
            currentExercise.value = userExercises.value[next];

        }
    }

    const previous = () => {
        const previous = currentIndex.value - 1;
        if (previous > 0) {
            currentIndex.value = previous;
            currentExercise.value = userExercises.value[previous];
        }
    }

    const go = ({ index = 0 } = {}) => {
        currentIndex.value = index;
        currentExercise.value = userExercises.value[index];
    }

    return {
        currentExercise: computed(() => currentExercise.value),
        currentIndex: computed(() => currentIndex.value),
        total: computed(() => total.value),
        reset,
        go,
        next,
        previous
    };
}