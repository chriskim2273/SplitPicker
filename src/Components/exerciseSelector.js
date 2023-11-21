import { useState, useEffect } from 'react';
import { Button, Portal, Modal, SegmentedButtons, Text, Card, IconButton, MD3Colors, Chip, Searchbar } from 'react-native-paper';
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
    const presetExercises = props.presetExercises;


    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

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



    const presetExerciseCards = () => {
        // Some list of exercises
        // Replace this with database stuff
        return (
            presetExercises.map((exerciseData, index) => {
                if (exerciseData.exerciseName.toLowerCase().includes(searchQuery.toLowerCase()))
                    return (
                        <Card key={index + "_preset_exercise_card"}>
                            <Card.Title
                                title={exerciseData.exerciseName}
                            />
                            <Card.Content>
                                <Chip icon="information">Equipment: {exerciseData.equipment}</Chip>
                                <Chip icon="information">Exercise Type: {exerciseData.exerciseType}</Chip>
                                <Chip icon="information">Force Type: {exerciseData.forceType}</Chip>
                                <Chip icon="information">Mechanics: {exerciseData.mechanics}</Chip>
                                <Chip icon="information">Primary Muscle: {exerciseData.primaryMuscle}</Chip>
                                <Chip icon="information">Secondary Muscles: {exerciseData.secondaryMuscles}</Chip>
                                <Text>
                                    Yes.
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
                    )
            })
        )
    }


    const exerciseTab = () => {
        switch (tab) {
            case 'preset':
                //style={tw`w-full flex justify-center items-center flex-col`}
                return (<SafeAreaView style={tw`h-full`}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={tw`mt-2 mb-4`}
                    />
                    <ScrollView style={tw`flex`}>
                        {presetExerciseCards()}
                    </ScrollView >
                </SafeAreaView>);
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