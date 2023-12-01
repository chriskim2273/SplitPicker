import * as React from 'react';
import { View } from 'react-native';
import { Card, Text, HelperText, TextInput } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { SplitData } from '../Context/SplitContext';

const ExerciseCard = (props) => {
    const { setExerciseSetsandReps } = SplitData();

    const [refreshExerciseCard, setRefreshExerciseCard] = props.refreshExerciseCard;
    //const exerciseName = props?.exerciseName;
    const exerciseNumber = props?.exerciseNumber;
    const dayNumber = props?.dayNumber;
    const { blankExercise, exerciseName, exerciseType, forceType, mechanics, primaryMuscle, secondaryMuscles, equipment, amountOfReps, amountOfSets } = props.exerciseData;

    const [userInputReps, setUserInputReps] = React.useState(amountOfReps);
    const [userInputSets, setUserInputSets] = React.useState(amountOfSets);

    const onChangeReps = text => {
        if (text == '')
            setUserInputReps(text);
        if (!hasErrors(text)) {
            setUserInputReps(Number(text));
            console.log("Changed reps and sets to: " + String(userInputReps) + " x " + String(userInputSets));
            setExerciseSetsandReps(dayNumber - 1, exerciseNumber - 1, userInputSets, Number(text));
            setRefreshExerciseCard(!refreshExerciseCard);
        }
    }
    const onChangeSets = text => {
        if (text == '')
            setUserInputSets(text);
        if (!hasErrors(text)) {
            setUserInputSets(Number(text));
            console.log("Changed reps and sets to: " + String(userInputSets) + " x " + String(userInputSets));
            setExerciseSetsandReps(dayNumber - 1, exerciseNumber - 1, Number(text), userInputReps);
            setRefreshExerciseCard(!refreshExerciseCard);
        }
    }

    const hasErrors = (input) => {
        return !Number.isInteger(Number(input)) && input != '';
    };

    return (
        <Card style={tw`w-60 flex flex-row justify-around items-center bg-gray-300 p-4`}>
            <Text>{exerciseName}</Text>
            <View>
                <TextInput label="Sets" value={String(userInputSets)} onChangeText={onChangeSets} />
                <HelperText type="error" visible={hasErrors(userInputSets)}>
                    Not a number!
                </HelperText>
            </View>
            <View>
                <TextInput label="Reps" value={String(userInputReps)} onChangeText={onChangeReps} />
                <HelperText type="error" visible={hasErrors(userInputReps)}>
                    Not a number!
                </HelperText>
            </View>
        </Card>
    )
}
export default ExerciseCard;