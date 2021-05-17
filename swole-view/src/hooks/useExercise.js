import { ref } from "vue";
import { useRouter } from "vue-router";

const userExercises = ref([]);
const currentExercise = ref("");
const currentIndex = ref(0);
const total = ref(0);

export const useExercise = () => {

    const router = useRouter();
    const currentLevel = ref(1);
    const currentNumExercises = ref(4);

    const levels = [
        { level: 1, desc: "A pussy" },
        { level: 2, desc: "Quick workout" },
        { level: 3, desc: "Get sweat up" },
        { level: 4, desc: "SWOLE" },
    ];

    const numExercises = [
        { level: 4, desc: "Quick" },
        { level: 5, desc: "Keen" },
        { level: 6, desc: "Getting up there" },
        { level: 7, desc: "SWOLE" },
    ];

    const exercises = [
        {
            name: 'Plank',
            image: '../img/exercises/plank.png',
            desc: 'Lay on the floor with your elbows under your shoulders, hands flat on the floor and core engaged. Keeping your forearms and knees on the floor slowly raise yourself upwards until your body is in a straight line from your knees to your head. Hold the position for as long as you can.',
            1: '10 sec',
            2: '20 sec',
            3: '30 sec',
            4: '40 sec'
        },
        {
            name: 'Push ups',
            image: '../img/exercises/pushup.png',
            desc: 'Get down on all fours, placing your hands slightly wider than your shoulders. Straighten your arms and legs. Lower your body until your chest nearly touches the floor. Pause, then push yourself back up. Repeat.',
            1: '10',
            2: '20',
            3: '30',
            4: '40'
        },
        {
            name: 'Situps',
            image: '../img/exercises/situp.png',
            desc: 'Lie down on your back. Bend your legs and stabilize your lower body. Cross your hands to opposite shoulders, or place them behind your ears without pulling on your neck. Lift your head and shoulder blades from the ground. Exhale as you rise. Lower, returning to your starting point. Inhale as you lower.',
            1: '20',
            2: '40',
            3: '60',
            4: '80'
        },
        {
            name: 'Burpees',
            image: '../img/exercises/burpee.png',
            desc: 'Stand with your feet shoulder-width apart and your arms by your sides. Lower into a squat position and place your hands on the floor. Kick or step your legs back into a plank position. Jump or step your legs forward to return to a squat position. Return to the standing position.',
            1: '10',
            2: '15',
            3: '20',
            4: '25'
        },
        {
            name: 'Lunges',
            image: '../img/exercises/lunges.png',
            desc: 'Start by standing up tall. Step forward with one foot until your leg reaches a 90-degree angle. Lift your front lunging leg to return to the starting position. Repeat 10 to 12 reps on one leg, or switch off between legs until youve totaled 10 to 12 reps per leg.',
            1: '10',
            2: '15',
            3: '20',
            4: '25'
        },
        {
            name: 'Leg Raises',
            image: '../img/exercises/leg-raise.png',
            desc: 'Lie on your back, legs straight and together. Keep your legs straight and lift them all the way up to the ceiling until your butt comes off the floor. Slowly lower your legs back down till theyre just above the floor. Hold for a moment. Raise your legs back up. Repeat.',
            1: '10',
            2: '15',
            3: '20',
            4: '25'
        },
        {
            name: 'Squats',
            image: '../img/exercises/squat.png',
            desc: 'Stand straight with feet hip-width apart. Tighten your stomach muscles. Lower down, as if sitting in an invisible chair. Straighten your legs to lift back up. Repeat the movement.',
            1: '10',
            2: '15',
            3: '20',
            4: '25'
        },
        {
            name: 'Russian twist',
            image: '../img/exercises/twist.png',
            desc: 'Sit on the floor and bring your legs out straight. Lean back slightly so your torso and legs form a V-like shape, bracing your abdominal wall to engage your core. Balancing here, twist your torso from side to side without moving your legs.',
            1: '10',
            2: '15',
            3: '20',
            4: '25'
        }
    ];
    //pics https://thenounproject.com/creativestall/collection/pictograms-line-icons/

    const reset = () => {
        currentIndex.value = 0;
        total.value = userExercises.value.length;
        currentExercise.value = userExercises.value[0];
    }

    const setExercises = () => {
        const level = currentLevel.value;
        const numExercises = currentNumExercises.value;
        const shuffledExericses = exercises.sort(() => 0.5 - Math.random());
        const randomExericses = shuffledExericses.slice(0, numExercises);
        userExercises.value = randomExericses.map(randomExericse => {
            return {
                name: randomExericse.name,
                desc: randomExericse.desc,
                image: randomExericse.image,
                amount: randomExericse[level],
            };
        });
        reset();
        router.push("/exercise");
    }

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

    const finish = ({ route = '/' } = {}) => {
        setExercises();
        router.push(route);
    }

    return {
        currentExercise,
        currentIndex,
        total,
        levels,
        numExercises,
        currentLevel,
        currentNumExercises,
        reset,
        go,
        next,
        finish,
        previous,
        setExercises,
    };
}