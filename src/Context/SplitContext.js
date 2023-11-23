import { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ExerciseScoreCalculator from '../Calculations/exerciseScoreCalculation';

const SplitContext = createContext()

export const SplitContextProvider = ({ children }) => {
    const exerciseTemplate = {
        blankExercise: true,
        exerciseName: undefined,
        exerciseType: undefined,
        forceType: undefined,
        mechanics: undefined,
        primaryMuscle: undefined,
        secondaryMuscles: [],
        equipment: undefined,
        amountOfReps: undefined,
        amountOfSets: undefined,
    }
    const nonBlankExerciseExample = {
        blankExercise: false,
        exerciseName: "",
        amountOfReps: 0,
        amountOfSets: 0,
        machineName: "",
        bodyPartsWorked: []
    }

    const defaultSplitData = [
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
    ];

    const [splitData, setSplitData] = useState(defaultSplitData);
    const [isReady, setIsReady] = useState(false);

    const PERSISTENCE_KEY = 'SPLIT_DATA_V1';
    useEffect(() => {
        const restoreSplit = async () => {
            try {
                /*
                const initialUrl = await Linking.getInitialURL();

                if (Platform.OS !== 'web' && initialUrl == null) {
                    // Only restore state if there's no deep link and we're not on web
                    */
                const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                console.log("Saved State: " + String(savedStateString));
                const state = savedStateString ? JSON.parse(savedStateString) : defaultSplitData;

                setSplitData(state);
            } finally {

                //
                setIsReady(true);
            }
        };
        if (!isReady) {
            restoreSplit();
        }
    }, [isReady]); // The effect will re-run whenever the 'value' changes



    const saveSplitDataLocally = async () => {
        console.log("Saving to async storage.")
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(splitData));
    }

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared successfully.');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };
    //clearAsyncStorage();

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
        saveSplitDataLocally();
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
        saveSplitDataLocally();
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
        saveSplitDataLocally();
    }

    const addNewExercise = () => {

    }

    const removeExercise = (dayIndex, exerciseIndex) => {
        splitData[dayIndex]["exercises"].splice(exerciseIndex, 1);
        setSplitData(splitData);
        saveSplitDataLocally();
    }

    return (<SplitContext.Provider value={{ splitData, setExercise, addDay, addExerciseToDay, removeExercise, setExerciseSetsandReps }}>{children}</SplitContext.Provider>)
}

export const SplitData = () => {
    return useContext(SplitContext)
}