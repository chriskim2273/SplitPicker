import { useState } from 'react';
import { Image } from 'react-native';
import { Card, Button, Modal, Portal, Text, ProgressBar, MD3Colors } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const ExerciseScore = (props) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    console.log("EXERCISE SCORE RIGHT BEFORE: " + String(props.exerciseScore));
    const exerciseScore = props?.exerciseScore == undefined ? 0 : props.exerciseScore;
    return (

        <Card style={tw`relative top-0 w-full flex justify-center items-center flex-col mb-4`}>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>{exerciseScore}</Text>
                    <Text>{"\n"}</Text>
                    <Text>{exerciseScore}</Text>
                </Modal>
            </Portal>

            <Card.Title title="Exercise Score" />
            <ProgressBar onPress={showModal} style={tw`flex justify-between items-center`} progress={exerciseScore} color={MD3Colors.error50} />
            <Card.Actions>
                <Button style={{ marginTop: 5 }} onPress={showModal}>
                    Show Score
                </Button>
            </Card.Actions>
        </Card>
    );
};

export default ExerciseScore;