import { useState, useEffect } from 'react';
import { Avatar, Button, Card, Text, List, MD3Colors, IconButton, Divider } from 'react-native-paper';
import { View } from 'react-native';
import ExerciseSelector from './exerciseSelector';
import tw from 'tailwind-react-native-classnames';
import ExerciseCard from './exerciseCard';
import { SplitData } from '../Context/SplitContext';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

/*
<Card.Actions>
<Button>Cancel</Button>
<Button>Ok</Button>
</Card.Actions>
*/

const SplitDay = (props) => {
    const { setExercise, addDay, addExerciseToDay, removeExercise } = SplitData();

    const dayNumber = props?.dayNumber === undefined ? "#N/A" : props.dayNumber;
    const splitDayData = props?.splitData;
    const presetExercises = props.presetExercises;
    let exerciseArray = Array.from(splitDayData?.exercises);
    // exerciseArray should be an array of objects detialed in splitcontext now.
    console.log(exerciseArray);
    const [refreshMain, startRefreshMain] = props.refreshMain;

    //const [refreshComponent, setRefreshComponent] = useState(false);
    return (
        <Card style={tw`w-full flex justify-center items-center`}>
            <Card.Title
                title={"Day " + dayNumber}
            />
            <Card.Content>
                <List.Section style={tw`w-80 flex justify-around items-center bg-gray-300`}>
                    <List.Subheader>Exercises For This Day</List.Subheader>
                    {exerciseArray.map((exercise, index) => {
                        const { blankExercise } = exercise;

                        if (blankExercise)
                            return (
                                <View key={index + "_exercise_view"} style={tw`w-full flex flex-row justify-evenly items-center bg-gray-300`}>
                                    <ExerciseSelector key={index + "_blank_exercise"} exerciseNumber={index + 1} exerciseData={exercise} dayNumber={dayNumber} refreshExerciseCard={[refreshMain, startRefreshMain]} presetExercises={presetExercises} />
                                    <IconButton
                                        icon="minus"
                                        style={tw`flex justify-center items-center`}
                                        iconColor={MD3Colors.primary10}
                                        size={30}
                                        onPress={() => {
                                            console.log("Remove exercise (" + String(index) + " from day " + String(dayNumber));
                                            removeExercise(dayNumber - 1, index);
                                            //setRefreshComponent(!refreshComponent);
                                            startRefreshMain(!refreshMain);
                                        }}
                                    />
                                </View>
                            )
                        else
                            return (
                                <View key={index + "_exercise_view"} style={tw`w-full flex flex-row justify-evenly items-center bg-gray-300`}>
                                    < ExerciseCard key={index + "_exercise"} exerciseNumber={index + 1} exerciseData={exercise} dayNumber={dayNumber} refreshExerciseCard={[refreshMain, startRefreshMain]} />
                                    <IconButton
                                        icon="minus"
                                        style={tw`flex justify-center items-center`}
                                        iconColor={MD3Colors.primary10}
                                        size={30}
                                        onPress={() => {
                                            console.log("Remove exercise (" + String(index) + " from day " + String(dayNumber));
                                            removeExercise(dayNumber - 1, index);
                                            //setRefreshComponent(!refreshComponent);

                                            startRefreshMain(!refreshMain);
                                        }}
                                    />
                                </View>
                            )
                    })}
                    <IconButton
                        icon="plus"
                        style={tw`flex justify-center items-center`}
                        iconColor={MD3Colors.primary10}
                        size={30}
                        onPress={() => {
                            console.log("Add exercise to day " + String(dayNumber));
                            addExerciseToDay(dayNumber - 1);
                            setRefreshComponent(!refreshComponent);
                        }}
                    />
                </List.Section>
            </Card.Content>
        </Card>
    );
}
export default SplitDay;