import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const userExercises = ref([]);
const currentExercise = ref("");
const currentIndex = ref(0);
const total = ref(0);

export const useExercise = () => {

    const router = useRouter();
    const currentLevel = ref(1);

    const levels = [
        { level: 1, desc: "A pussy", exercises: 5 },
        { level: 2, desc: "Hard as nails", exercises: 5 },
        { level: 3, desc: "Rock hard", exercises: 6 },
        { level: 4, desc: "SWOLE AF", exercises: 7 },
    ];

    const exercises = [
        {
            name: 'Plank',
            image: '../img/exercises/plank.png',
            desc: 'Lay on the floor with your elbows under your shoulders, hands flat on the floor and core engaged. Keeping your forearms and knees on the floor slowly raise yourself upwards until your body is in a straight line from your knees to your head. Hold the position for as long as you can.',
            1: '20 sec',
            2: '30 sec',
            3: '40 sec',
            4: '50 sec'
        },
        {
            name: 'Push ups',
            image: '../img/exercises/pushup.png',
            desc: 'Get down on all fours, placing your hands slightly wider than your shoulders. Straighten your arms and legs. Lower your body until your chest nearly touches the floor. Pause, then push yourself back up. Repeat.',
            1: '20',
            2: '30',
            3: '40',
            4: '50'
        },
        {
            name: 'Situps',
            image: '../img/exercises/situp.png',
            desc: 'Lie down on your back. Bend your legs and stabilize your lower body. Cross your hands to opposite shoulders, or place them behind your ears without pulling on your neck. Lift your head and shoulder blades from the ground. Exhale as you rise. Lower, returning to your starting point. Inhale as you lower.',
            1: '40',
            2: '60',
            3: '80',
            4: '100'
        },
        {
            name: 'Burpees',
            image: '../img/exercises/burpee.png',
            desc: 'Stand with your feet shoulder-width apart and your arms by your sides. Lower into a squat position and place your hands on the floor. Kick or step your legs back into a plank position. Jump or step your legs forward to return to a squat position. Return to the standing position.',
            1: '15',
            2: '20',
            3: '25',
            4: '30'
        },
        {
            name: 'Lunges',
            image: '../img/exercises/lunges.png',
            desc: 'Start by standing up tall. Step forward with one foot until your leg reaches a 90-degree angle. Lift your front lunging leg to return to the starting position. Repeat 10 to 12 reps on one leg, or switch off between legs until youve totaled 10 to 12 reps per leg.',
            1: '15',
            2: '20',
            3: '25',
            4: '30'
        },
        {
            name: 'Leg Raises',
            image: '../img/exercises/leg-raise.png',
            desc: 'Lie on your back, legs straight and together. Keep your legs straight and lift them all the way up to the ceiling until your butt comes off the floor. Slowly lower your legs back down till theyre just above the floor. Hold for a moment. Raise your legs back up. Repeat.',
            1: '15',
            2: '20',
            3: '25',
            4: '30'
        },
        {
            name: 'Squats',
            image: '../img/exercises/squat.png',
            desc: 'Stand straight with feet hip-width apart. Tighten your stomach muscles. Lower down, as if sitting in an invisible chair. Straighten your legs to lift back up. Repeat the movement.',
            1: '15',
            2: '20',
            3: '25',
            4: '30'
        },
        {
            name: 'Russian twist',
            image: '../img/exercises/twist.png',
            desc: 'Sit on the floor and bring your legs out straight. Lean back slightly so your torso and legs form a V-like shape, bracing your abdominal wall to engage your core. Balancing here, twist your torso from side to side without moving your legs.',
            1: '15',
            2: '20',
            3: '25',
            4: '30'
        },
        {
            name: 'Arm Curls',
            image: '../img/exercises/curl.png',
            desc: 'Start standing with a dumbbell in each hand. Your elbows should rest at your sides and your forearms should extend out in front of your body. Bring the dumbbells all the way up to your shoulders by bending your elbows. Once at the top, hold for a second by squeezing the muscle. Reverse the curl slowly and repeat.',
            1: '15',
            2: '20',
            3: '25',
            4: '30'
        },
        {
            name: 'Shoulder press',
            image: '../img/exercises/shoulder-press.png',
            desc: 'Hold the dumbbells by your shoulders with your palms facing forwards and your elbows out to the sides and bent at a 90° angle. Without leaning back, extend through your elbows to press the weights above your head. Then slowly return to the starting position.',
            1: '15',
            2: '20',
            3: '25',
            4: '30'
        }
    ];
    //pics https://thenounproject.com/creativestall/collection/pictograms-line-icons/

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
        router.push("/exercise");
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
            router.push("/");
        }
    }

    const previous = () => {
        const previousIndex = currentIndex.value - 1;
        if (previousIndex >= 0) {
            go({ index: previousIndex });
        }
    }

    const finish = ({ route = '/finish' } = {}) => {
        router.push(route);
    }

    const reset = ({ route = '/' } = {}) => {
        setExercises();
        router.push(route);
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
        currentExercise,
        currentIndex,
        total,
        levels,
        currentLevel,
        userExercises,
        go,
        reset,
        swipe,
        finish,
        setExercises,
    };
}