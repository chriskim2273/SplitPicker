import { useState } from 'react';
import { Button, Portal, Modal, SegmentedButtons, Text, Card, IconButton, MD3Colors, Chip } from 'react-native-paper';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const ExerciseSelector = (props) => {
    const [visible, setVisible] = useState(false);
    const [tab, setTab] = useState('walk'); // Default tab, change later.

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const exerciseName = props?.exerciseName;
    const exerciseNumber = props?.exerciseNumber;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        },
    });

    console.log(tab);

    const exerciseTab = () => {
        switch (tab) {
            case 'preset':
                return (<View style={tw`w-full flex justify-center items-center flex-col`}>
                    <Card>
                        <Card.Title
                            title={"Exercise"}
                        />
                        <Card.Content>
                            <Chip icon="information">Sets {": 5"}</Chip>
                            <Chip icon="information">Reps {": 5"}</Chip>
                            <Text>
                                Exercise Details. Joejoejoe
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <IconButton
                                icon="plus"
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={() => console.log('Pressed')}
                            />
                        </Card.Actions>
                    </Card>
                </View >);
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
                    <SafeAreaView >
                        <SegmentedButtons
                            value={tab}
                            onValueChange={setTab}
                            buttons={[
                                {
                                    value: 'preset',
                                    label: 'Preset Exercises',
                                },
                                {
                                    value: 'community',
                                    label: 'Community Submitted Exercises',
                                },
                                {
                                    value: 'user',
                                    label: 'User Created Exercises',
                                },
                                {
                                    value: 'create',
                                    label: 'Create A New Exercise',
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