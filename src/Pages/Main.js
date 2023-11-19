import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import ExerciseScore from '../Components/exerciseScore';
import Header from '../Components/header';
import { SplitData } from '../Context/SplitContext';
import SplitDay from '../Components/splitDay';

function Main() {
    const { splitData, setExercise } = SplitData();
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
                    <SplitDay key={index + "_split_day"} splitData={splitDay} dayName={splitDay.day_number} dayNumber={index + 1} />
                ))}
            </ScrollView>
        </PaperProvider>
    )
}
export default Main;