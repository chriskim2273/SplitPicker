import { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserAuth } from './AuthContext';

import ExerciseScoreCalculator from '../Calculations/exerciseScoreCalculation';

const SplitContext = createContext()

export const SplitContextProvider = ({ children }) => {
    const { saveSplitsToDatabase } = UserAuth();

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

    const generateObjectId = () => {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

    const randomObjectId = String(generateObjectId());
    console.log(randomObjectId);

    const [currentSplitId, setCurrentSplitId] = useState(randomObjectId);
    // SET THIS TO BE THE FIRST ID IN SPLITDATA.. OMGMOMOGOGMGMOGOMGOMGOM

    const blankSingleSplitData = {
        [randomObjectId]: {
            'creater_user_id': undefined,
            'date_created': Date.now().toString(36),
            'likes': 0,
            'dislikes': 0,
            'split_name': 'Default Name 1',
            'split_data': [
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] }
            ]
        }
    }

    const defaultSplitData = blankSingleSplitData

    const [splitData, setSplitData] = useState(defaultSplitData);
    const [isReady, setIsReady] = useState(false);

    const SPLIT_DATA_KEY = 'SPLIT_DATA_V1';
    const SPLIT_ID_KEY = 'SPLIT_ID_V1';
    useEffect(() => {
        const restoreSplit = async () => {
            try {
                /*
                const initialUrl = await Linking.getInitialURL();

                if (Platform.OS !== 'web' && initialUrl == null) {
                    // Only restore state if there's no deep link and we're not on web
                    */
                const savedStateString = await AsyncStorage.getItem(SPLIT_DATA_KEY);
                console.log("Saved State: " + String(savedStateString));
                const splitState = savedStateString ? JSON.parse(savedStateString) : defaultSplitData;
                const savedSplitId = await AsyncStorage.getItem(SPLIT_ID_KEY);
                console.log("Saved State: " + String(savedSplitId));
                const splitIdState = savedSplitId ? JSON.parse(savedSplitId) : randomObjectId;

                setSplitData(splitState);
                setCurrentSplitId(splitIdState);
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
        AsyncStorage.setItem(SPLIT_DATA_KEY, JSON.stringify(splitData));
        AsyncStorage.setItem(SPLIT_ID_KEY, JSON.stringify(currentSplitId));
        saveSplitsToDatabase(splitData);
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

    const deleteSplit = (split_id) => {
        let splitIds = Object.keys(splitData);
        if (splitIds.length > 1) {
            delete splitData[split_id];
            setSplitData(splitData);
            saveSplitDataLocally();
        }
        splitIds = Object.keys(splitData);
        setCurrentSplitId(splitIds[0]);
    }

    const changeSplitName = (split_id, new_split_name) => {
        splitData[split_id]['split_name'] = new_split_name;
        setSplitData(splitData);
        saveSplitDataLocally();
    }

    const addNewSplit = () => {
        const newSplitId = String(generateObjectId());
        let largestNumber = 0;
        for (let split_id in splitData) {
            let split_name = splitData[split_id]['split_name']
            let parts = split_name.split(" ");
            if (parts[0] == "Default" && parts[1] == "Name") {
                let number = parseInt(parts[2]);
                if (!isNaN(number))
                    if (number > largestNumber) {
                        largestNumber = number;
                    }
            }
        }
        splitData[newSplitId] = {
            'creater_user_id': undefined,
            'date_created': Date.now().toString(36),
            'likes': 0,
            'dislikes': 0,
            'split_name': 'Default Name ' + String(largestNumber + 1),
            'split_data': [
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] },
                { 'day_name': '', 'exercises': [] }
            ]
        }
        setSplitData(splitData);
        setCurrentSplitId(newSplitId);
        saveSplitDataLocally();
    }

    const setSplit = (split_id) => {
        setCurrentSplitId(split_id);
        saveSplitDataLocally();
    }

    const addDay = () => {
        let newSplitData = splitData[currentSplitId].split_data.push({
            day_name: "",
            exercises: []
        })
        setSplitData(newSplitData);
    }

    const addExerciseToDay = (dayIndex) => {
        splitData[currentSplitId].split_data[dayIndex]['exercises'].push({ ...exerciseTemplate })
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
        splitData[currentSplitId].split_data[dayIndex]['exercises'][exerciseIndex] = exerciseData
        setSplitData(splitData);
        saveSplitDataLocally();
        //console.log(day);
        //console.log(splitData[dayIndex])


        //let newSplitData = splitData.find((split_day) => split_day.day_name == day).exercises.push(exerciseData);
        //setSplitData(newSplitData);
    }

    const setExerciseSetsandReps = (dayIndex, exerciseIndex, newSets, newReps) => {
        splitData[currentSplitId].split_data[dayIndex]['exercises'][exerciseIndex]["amountOfSets"] = newSets;
        splitData[currentSplitId].split_data[dayIndex]['exercises'][exerciseIndex]["amountOfReps"] = newReps;
        console.log(splitData[currentSplitId].split_data[dayIndex]['exercises'][exerciseIndex]);
        setSplitData(splitData);
        saveSplitDataLocally();
    }

    const addNewExercise = () => {

    }

    const removeExercise = (dayIndex, exerciseIndex) => {
        splitData[currentSplitId].split_data[dayIndex]["exercises"].splice(exerciseIndex, 1);
        setSplitData(splitData);
        saveSplitDataLocally();
    }

    return (<SplitContext.Provider value={{ splitData, currentSplitId, setExercise, addDay, addExerciseToDay, removeExercise, setExerciseSetsandReps, addNewSplit, setSplit, changeSplitName, deleteSplit }}>{children}</SplitContext.Provider>)
}

export const SplitData = () => {
    return useContext(SplitContext)
}