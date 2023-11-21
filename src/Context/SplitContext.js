import { useContext, createContext, useState, useEffect } from 'react';

const SplitContext = createContext()

export const SplitContextProvider = ({ children }) => {
    const exerciseTemplate = {
        blankExercise: true,
        exerciseName: "",
        amountOfReps: 0,
        amountOfSets: 0,
        machineName: "",
        bodyPartsWorked: []
    }
    const nonBlankExerciseExample = {
        blankExercise: false,
        exerciseName: "",
        amountOfReps: 0,
        amountOfSets: 0,
        machineName: "",
        bodyPartsWorked: []
    }
    const [splitData, setSplitData] = useState([
        {
            day_name: "",
            exercises: []
        },
        {
            day_name: "",
            exercises: []
        },
        {
            day_name: "",
            exercises: []
        },
        {
            day_name: "",
            exercises: []
        },
        {
            day_name: "",
            exercises: []
        },
        {
            day_name: "",
            exercises: []
        },
        {
            day_name: "",
            exercises: []
        }
    ]);

    const addDay = () => {
        let newSplitData = splitData.push({
            day_name: "",
            exercises: []
        })
        setSplitData(newSplitData);
    }

    const addExerciseToDay = (dayIndex) => {
        splitData[dayIndex]['exercises'].push({ ...exerciseTemplate })
        setSplitData(splitData);
    }

    const setExercise = (dayIndex, exerciseIndex, exerciseData) => {
        //let exerciseData = exerciseData;
        /*
        exerciseData = {
            exercise_name: "",
            reps: 0,
            sets: 0
        }
        */
        splitData[dayIndex]['exercises'][exerciseIndex] = exerciseData
        setSplitData(splitData);
        //console.log(day);
        //console.log(splitData[dayIndex])


        //let newSplitData = splitData.find((split_day) => split_day.day_name == day).exercises.push(exerciseData);
        //setSplitData(newSplitData);
    }

    const setExerciseSetsandReps = (dayIndex, exerciseIndex, newSets, newReps) => {
        splitData[dayIndex]['exercises'][exerciseIndex]["amountOfSets"] = newSets;
        splitData[dayIndex]['exercises'][exerciseIndex]["amountOfReps"] = newReps;
        console.log(splitData[dayIndex]['exercises'][exerciseIndex]);
        setSplitData(splitData);
    }

    const addNewExercise = () => {

    }

    const removeExercise = (dayIndex, exerciseIndex) => {
        splitData[dayIndex]["exercises"].splice(exerciseIndex, 1);
        setSplitData(splitData);
    }

    return (<SplitContext.Provider value={{ splitData, setExercise, addDay, addExerciseToDay, removeExercise, setExerciseSetsandReps }}>{children}</SplitContext.Provider>)
}

export const SplitData = () => {
    return useContext(SplitContext)
}