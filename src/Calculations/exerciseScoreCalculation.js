
import { SplitData } from '../Context/SplitContext';

export const ExerciseScoreCalculator = () => {
    const { splitData } = SplitData();

    let score = 0;

    const musclesList = [
        "Abductors",
        "Abs",
        "Adductors",
        "Biceps",
        "Calves",
        "Chest",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Hip Flexors",
        "IT Band",
        "Lats",
        "Lower Back",
        "Middle Back",
        "Neck",
        "Obliques",
        "Palmar Fascia",
        "Plantar Fascia",
        "Quads",
        "Shoulders",
        "Traps",
        "Triceps",
        "Upper Back"
    ]

    const volumePerMuscle = {}

    musclesList.forEach((muscle) => {
        volumePerMuscle[muscle] = 100;
    });

    try {

        splitData.forEach((splitDay, dayNumber) => {
            const dayName = splitDay.dayName;
            const exerciseList = splitDay.exercises;

            exerciseList.forEach((exerciseData, exerciseNumber) => {
                const { blankExercise, exerciseName, exerciseType, forceType, mechanics, primaryMuscle, secondaryMuscles, equipment, amountOfReps, amountOfSets } = exerciseData;

                volumePerMuscle[primaryMuscle] -= amountOfReps * amountOfSets;

                secondaryMuscles.forEach((secondaryMuscle) => {
                    volumePerMuscle[secondaryMuscle] -= amountOfReps * amountOfSets;
                })

            })

        })
    } catch (error) {
        console.error(error);
        return 0;
    }

    for (let [key, value] of Object.entries(volumePerMuscle)) {
        // over 0, not enough
        // under 0, too much volume
        // total is 23 * 100 = 2,300

        // take abs value of volume currently left 
        // add all the abs together
        // subtract from 2,300
        // divide by 2,300 then multiply by 100
        score += Math.abs(value);
    }
    score = 2300 - score; //make dynamic maybe by getting total of all muscles and their volume
    score /= 2300;
    //score *= 100;

    return (score);
}

export const volumePerMuscle = () => {
    const { splitData } = SplitData();

    let score = 0;

    const musclesList = [
        "Abductors",
        "Abs",
        "Adductors",
        "Biceps",
        "Calves",
        "Chest",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Hip Flexors",
        "IT Band",
        "Lats",
        "Lower Back",
        "Middle Back",
        "Neck",
        "Obliques",
        "Palmar Fascia",
        "Plantar Fascia",
        "Quads",
        "Shoulders",
        "Traps",
        "Triceps",
        "Upper Back"
    ]

    const volumePerMuscle = {}

    musclesList.forEach((muscle) => {
        volumePerMuscle[muscle] = 100;
    });

    try {

        splitData.forEach((splitDay, dayNumber) => {
            const dayName = splitDay.dayName;
            const exerciseList = splitDay.exercises;

            exerciseList.forEach((exerciseData, exerciseNumber) => {
                const { blankExercise, exerciseName, exerciseType, forceType, mechanics, primaryMuscle, secondaryMuscles, equipment, amountOfReps, amountOfSets } = exerciseData;

                volumePerMuscle[primaryMuscle] -= amountOfReps * amountOfSets;

                secondaryMuscles.forEach((secondaryMuscle) => {
                    volumePerMuscle[secondaryMuscle] -= amountOfReps * amountOfSets;
                })

            })

        })
    } catch (error) {
        console.error(error);
        return 0;
    }

    return JSON.stringify(volumePerMuscle);
}

export default ExerciseScoreCalculator;