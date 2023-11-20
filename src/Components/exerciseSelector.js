import { useState, useEffect } from 'react';
import { Button, Portal, Modal, SegmentedButtons, Text, Card, IconButton, MD3Colors, Chip } from 'react-native-paper';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SplitData } from '../Context/SplitContext';

const ExerciseSelector = (props) => {
    const { setExercise } = SplitData();
    const [visible, setVisible] = useState(false);
    const [tab, setTab] = useState('preset'); // Default tab, change later.

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 30 };

    const [refreshExerciseCard, setRefreshExerciseCard] = props.refreshExerciseCard;
    const exerciseName = props?.exerciseName;
    const exerciseNumber = props?.exerciseNumber;
    const dayNumber = props?.dayNumber;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        },
    });

    console.log(tab);

    const tempPresetExercises = [
        {
            blankExercise: false,
            exerciseName: "Dumbbell Bench Press",
            amountOfReps: 5,
            amountOfSets: 5,
            machineName: "Dumbbell",
            bodyPartsWorked: ["Chest"]
        },
        {
            blankExercise: false,
            exerciseName: "Barbell Bench Press",
            amountOfReps: 5,
            amountOfSets: 5,
            machineName: "Flat Bench Barbell",
            bodyPartsWorked: ["Chest"]
        },
        {
            blankExercise: false,
            exerciseName: "Dumbbell Shoulder Press",
            amountOfReps: 5,
            amountOfSets: 5,
            machineName: "Dumbbell",
            bodyPartsWorked: ["Shoulder"]
        },
        {
            blankExercise: false,
            exerciseName: "Lat Pulldown",
            amountOfReps: 5,
            amountOfSets: 5,
            machineName: "Lat Pulldown",
            bodyPartsWorked: ["Back"]
        }
    ]
    const [exerciseData, setExerciseData] = useState(tempPresetExercises);

    const modifyExerciseAPIData = (data) => {
        const arrayData = Array.from(data, (item) => item);
        return arrayData.map((data, index) => {
            let { bodyPart, equipment, gifUrl, id, instructions, name, secondaryMuscles, target } = data;
            secondaryMuscles.push(target)
            return {
                blankExercise: false,
                exerciseName: name,
                amountOfReps: 5,
                amountOfSets: 5,
                machineName: equipment,
                bodyPartsWorked: secondaryMuscles
            };
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '94be559db4mshbdd38f0bcf1590ep1eb01fjsn248ac7172cc5',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json(); // Assuming the response is JSON
                console.log(result);
                setExerciseData(modifyExerciseAPIData(result)); // Set the fetched data to the state variable
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, []); // Empty dependency array to ensure it runs only once

    const presetExercises = () => {
        // Some list of exercises
        // Replace this with database stuff.

        return (
            exerciseData.map((exerciseData, index) => (
                <Card key={index + "_preset_exercise_card"}>
                    <Card.Title
                        title={exerciseData.exerciseName}
                    />
                    <Card.Content>
                        <Chip icon="information">Sets: {exerciseData.amountOfSets}</Chip>
                        <Chip icon="information">Reps: {exerciseData.amountOfReps}</Chip>
                        <Text>
                            Body Parts Worked: {String(exerciseData.bodyPartsWorked)}
                            Machine Name: {exerciseData.machineName}
                        </Text>
                    </Card.Content>
                    <Card.Actions>
                        <IconButton
                            icon="checkbox-marked-circle-plus-outline"
                            iconColor={MD3Colors.error50}
                            size={20}
                            onPress={() => {
                                console.log("PLUS!!");
                                setExercise(dayNumber - 1, exerciseNumber - 1, exerciseData);
                                setRefreshExerciseCard(!refreshExerciseCard);
                            }}
                        />
                    </Card.Actions>
                </Card>
            ))
        )
    }

    const exerciseTab = () => {
        switch (tab) {
            case 'preset':
                //style={tw`w-full flex justify-center items-center flex-col`}
                return (<ScrollView >
                    {presetExercises()}
                </ScrollView >);
            case 'community':
                return <Text> Community! </Text>;
            case 'user':
                return <Text> User! </Text>;
            case 'create':
                return <Text> Create! </Text>
            default:
                return <Text> IDK. </Text>;
        }
    }

    return (
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <SafeAreaView>
                        <SegmentedButtons
                            value={tab}
                            onValueChange={setTab}
                            density='large'
                            buttons={[
                                {
                                    value: 'preset',
                                    label: 'Preset',
                                },
                                {
                                    value: 'community',
                                    label: 'Catalog',
                                },
                                {
                                    value: 'user',
                                    label: "User's",
                                },
                            ]}
                        />
                        {exerciseTab()}
                    </SafeAreaView>
                </Modal>
            </Portal>
            <Button icon="arm-flex-outline" mode="contained" onPress={showModal}>
                Select Exercise
            </Button>
        </View>

    );
}
export default ExerciseSelector;