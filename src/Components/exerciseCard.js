import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const ExerciseCard = (props) => {
    const [refreshExerciseCard, setRefreshExerciseCard] = props.refreshExerciseCard;
    //const exerciseName = props?.exerciseName;
    const exerciseNumber = props?.exerciseNumber;
    const dayNumber = props?.dayNumber;
    const { blankExercise, exerciseName, amountOfReps, amountOfSets, machineName, bodyPartsWorked } = props.exerciseData;

    return (
        <Card style={tw`w-60 flex flex-row justify-around items-center bg-gray-300 p-4`}>
            <Text>{exerciseName}</Text>
            <Text>{amountOfSets}</Text>
            <Text>{amountOfReps}</Text>
        </Card>
    )
}
export default ExerciseCard;