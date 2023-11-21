import { useState } from 'react';
import { Image } from 'react-native';
import { Card, Button, Modal, Portal, Text, ProgressBar, MD3Colors } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { ExerciseScoreCalculator, volumePerMuscle } from '../Calculations/exerciseScoreCalculation';

const ExerciseScore = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    return (

        <Card style={tw`relative top-0 w-full flex justify-center items-center flex-col mb-4`}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>{ExerciseScoreCalculator()}</Text>
                    <Text>{"\n"}</Text>
                    <Text>{volumePerMuscle()}</Text>
                </Modal>
            </Portal>

            <Card.Title title="Exercise Score" />
            <ProgressBar onPress={showModal} style={tw`flex justify-between items-center`} progress={ExerciseScoreCalculator()} color={MD3Colors.error50} />
            <Card.Actions>
                <Button style={{ marginTop: 5 }} onPress={showModal}>
                    Show Score
                </Button>
            </Card.Actions>
        </Card>
    );
};

export default ExerciseScore;