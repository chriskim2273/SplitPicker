import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import ExerciseScore from '../Components/exerciseScore';
import Header from '../Components/header';
import { SplitData } from '../Context/SplitContext';
import SplitDay from '../Components/splitDay';

function Main() {
    const { splitData } = SplitData();
    /*
    console.log(splitData);
    setExercise(0, 0, {
        blankExercise: false,
        exerciseName: "",
        amountOfReps: 0,
        amountOfSets: 0,
        machineName: "",
        bodyPartsWorked: []
    })
    */

    const [presetExercises, setPresetExercises] = useState([]);

    const modifyExerciseAPIData = (data) => {
        const arrayData = Array.from(data, (item) => item);
        return arrayData.map((data, index) => {
            let { equipment, exercise_type, experience, force_type, mechanics, name, primary_muscles, secondary_muscles } = data;
            const validJsonString = secondary_muscles.replace(/'/g, '"');
            const bodyPartsWorked = JSON.parse(validJsonString);
            return {
                blankExercise: false,
                exerciseName: name,
                exerciseType: exercise_type,
                forceType: force_type,
                mechanics: mechanics,
                primaryMuscle: primary_muscles,
                secondaryMuscles: bodyPartsWorked,
                equipment: equipment,
                amountOfReps: 8,
                amountOfSets: 5
            };
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://exerciseapi3.p.rapidapi.com/exercise/primary_muscle/Lower%20Back';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '94be559db4mshbdd38f0bcf1590ep1eb01fjsn248ac7172cc5',
                    'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                const resultObject = JSON.parse(result);
                console.log(resultObject);
                setPresetExercises(modifyExerciseAPIData(resultObject.exercises));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, []); // Empty dependency array to ensure it runs only once

    //const { isOpen, onOpen, onClose } = useDisclosure();
    //const { addDay, addExerciseToDay, setExercise } = SplitData();
    const styles = StyleSheet.create({
        contentContainer: {
            alignItems: 'center',      // Apply alignItems here
            justifyContent: 'center',  // Apply justifyContent here
            // Other styles if needed
        },
    });

    let splitDayArray = Array.from(splitData, item => item);
    console.log(splitDayArray);
    return (
        <PaperProvider>

            <ExerciseScore />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {splitDayArray.map((splitDay, index) => (
                    <SplitDay key={index + "_split_day"} splitData={splitDay} dayName={splitDay.day_number} dayNumber={index + 1} presetExercises={presetExercises} />
                ))}
            </ScrollView>
        </PaperProvider>
    )
}
export default Main;