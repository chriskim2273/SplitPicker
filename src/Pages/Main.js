import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import ExerciseScore from '../Components/exerciseScore';
import Header from '../Components/header';
import { SplitData } from '../Context/SplitContext';
import SplitDay from '../Components/splitDay';
import ExerciseScoreCalculator from '../Calculations/exerciseScoreCalculation';
import ChangeSplitModal from '../Components/changeSplitModal';
import registerNewUser from '../API/axiosRequests';
import { UserAuth } from '../Context/AuthContext';

function Main() {
    const { user } = UserAuth();
    const { splitData } = SplitData();
    const [refresh, startRefresh] = useState(false);
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

    const [exerciseScore, setExerciseScore] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://exerciseapi3.p.rapidapi.com/exercise/primary_muscle/Lower%20Back';
            const url_c = 'https://exerciseapi3.p.rapidapi.com/exercise/primary_muscle/Chest';
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
                /*const response_c = await fetch(url_c, options);
                const result_c = await response_c.text();
                const resultObject_c = JSON.parse(result_c);
                console.log(resultObject_c);
                setPresetExercises(presetExercises.concat(modifyExerciseAPIData(resultObject_c.exercises)));*/
            } catch (error) {
                console.error(error);
            }
        };
        fetchData(); // Call the function to fetch data when the component mounts
        console.log('user' + JSON.stringify(user));
        //registerNewUser(user);

        //const calculateExerciseScore = await ExerciseScoreCalculator(splitData);
    }, []); // Empty dependency array to ensure it runs only once

    //console.log("SCOREEE: " + String(exerciseScore));
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
    //console.log(splitDayArray);



    return (
        <SafeAreaView>
            <ExerciseScore exerciseScore={ExerciseScoreCalculator(splitData)} />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {splitDayArray.map((splitDay, index) => (
                    <SplitDay key={index + "_split_day"} refreshMain={[refresh, startRefresh]} splitData={splitDay} dayName={splitDay.day_number} dayNumber={index + 1} presetExercises={presetExercises} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
export default Main;