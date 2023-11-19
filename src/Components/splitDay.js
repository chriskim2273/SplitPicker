import { useState, useEffect } from 'react';
import { Avatar, Button, Card, Text, List, MD3Colors, IconButton, Divider } from 'react-native-paper';
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
    const { setExercise, addDay, addExerciseToDay } = SplitData();

    const dayNumber = props?.dayNumber === undefined ? "#N/A" : props.dayNumber;
    const splitDayData = props?.splitData;
    let exerciseArray = Array.from(splitDayData?.exercises);
    // exerciseArray should be an array of objects detialed in splitcontext now.
    console.log(exerciseArray);

    const [refreshComponent, setRefreshComponent] = useState(false);
    return (
        <Card style={tw`w-full flex justify-center items-center flex-col`}>
            <Card.Title
                title={"Day " + dayNumber}
            />
            <Card.Content>
                <List.Section>
                    <List.Subheader>Exercises For This Day</List.Subheader>
                    {exerciseArray.map((exercise, index) => {
                        const { blankExercise } = exercise;

                        if (blankExercise)
                            return (
                                <ExerciseSelector key={index + "_blank_exercise"} exerciseNumber={index + 1} exerciseData={exercise} dayNumber={dayNumber} refreshExerciseCard={[refreshComponent, setRefreshComponent]} />
                            )
                        else
                            return (
                                < ExerciseCard key={index + "_exercise"} exerciseNumber={index + 1} exerciseData={exercise} dayNumber={dayNumber} refreshExerciseCard={[refreshComponent, setRefreshComponent]} />
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