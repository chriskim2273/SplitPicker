import { useState } from 'react';
import { Avatar, Button, Card, Text, List, MD3Colors, IconButton, Divider } from 'react-native-paper';
import ExerciseSelector from './exerciseSelector';
import tw from 'tailwind-react-native-classnames';
import ExerciseCard from './exerciseCard';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

/*
<Card.Actions>
<Button>Cancel</Button>
<Button>Ok</Button>
</Card.Actions>
*/

const SplitDay = (props) => {
    const dayNumber = props?.dayNumber === undefined ? "#N/A" : props.dayNumber;
    const splitData = props?.splitData;
    let exerciseArray = Array.from(splitData?.exercises);
    // exerciseArray should be an array of objects detialed in splitcontext now.
    console.log(exerciseArray);


    const [exerciseAmount, setExerciseAmount] = useState(1);
    return (
        <Card style={tw`w-full flex justify-center items-center flex-col`}>
            <Card.Title
                title={"Day " + dayNumber}
            />
            <Card.Content>
                <List.Section>
                    <List.Subheader>Exercises For This Day</List.Subheader>
                    {exerciseArray.map((exercise, index) => {
                        const { blankExercise,
                            exerciseName,
                            amountOfReps,
                            amountOfSets,
                            machineName,
                            bodyPartsWorked } = exercise;

                        if (blankExercise)
                            return (
                                <ExerciseSelector key={index + "_exercise"} exerciseNumber={index + 1} exerciseData={exercise} />
                            )
                        else
                            return (
                                < ExerciseCard />
                            )
                    })}
                    <IconButton
                        icon="plus"
                        style={tw`flex justify-center items-center`}
                        iconColor={MD3Colors.primary10}
                        size={30}
                        onPress={() => setExerciseAmount(exerciseAmount + 1)}
                    />
                </List.Section>
            </Card.Content>
        </Card>
    );
}
export default SplitDay;