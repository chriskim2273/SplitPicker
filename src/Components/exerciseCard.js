import * as React from 'react';
import { Card, Text } from 'react-native-paper';

const ExerciseCard = (props) => {
    const [refreshExerciseCard, setRefreshExerciseCard] = props.refreshExerciseCard;
    //const exerciseName = props?.exerciseName;
    const exerciseNumber = props?.exerciseNumber;
    const dayNumber = props?.dayNumber;
    const { blankExercise, exerciseName, amountOfReps, amountOfSets, machineName, bodyPartsWorked } = props.exerciseData;

    return (
        <Card><Text>{exerciseName}</Text></Card>
    )
}
export default ExerciseCard;