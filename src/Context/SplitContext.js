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
    const nonBlankExerciseTemplate = {
        blankExercise: false,
        exerciseName: "",
        amountOfReps: 0,
        amountOfSets: 0,
        machineName: "",
        bodyPartsWorked: []
    }
    const [splitData, setSplitData] = useState([
        {
            day_name: "e",
            exercises: [exerciseTemplate, nonBlankExerciseTemplate]
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

    const addExerciseToDay = (day, exercise) => {
        let exerciseData = exercise;
        exerciseData = {
            exercise_name: "",
            reps: 0,
            sets: 0
        }
        let newSplitData = splitData.find((split_day) => split_day.day_name == day).exercises.push(exerciseData);
        setSplitData(newSplitData);
    }

    const setExercise = (event, day, exercise) => {
        let exerciseData = exercise;
        exerciseData = {
            exercise_name: "",
            reps: 0,
            sets: 0
        }
        console.log(day);
        console.log(splitData[day])
        //let newSplitData = splitData.find((split_day) => split_day.day_name == day).exercises.push(exerciseData);
        //setSplitData(newSplitData);
    }

    return (<SplitContext.Provider value={{ splitData }}>{children}</SplitContext.Provider>)
}

export const SplitData = () => {
    return useContext(SplitContext)
}