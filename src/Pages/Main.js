import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import ExerciseScore from '../Components/exerciseScore';
import Header from '../Components/header';
import { SplitData } from '../Context/SplitContext';
import SplitDay from '../Components/splitDay';

function Main() {

    const { splitData } = SplitData();
    console.log(splitData);
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
                    <SplitDay splitData={splitDay} dayName={splitDay.day_number} dayNumber={index + 1} />
                ))}
            </ScrollView>
        </PaperProvider>
    )
}
export default Main;