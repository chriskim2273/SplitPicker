import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Icon, IconButton, MD3Colors, TextInput } from 'react-native-paper';
import { SplitData } from '../Context/SplitContext';
import tw from 'tailwind-react-native-classnames';

const ChangeSplitModal = () => {
    const { splitData, currentSplitId, addNewSplit, setSplit, changeSplitName, deleteSplit } = SplitData();

    const [selectVisible, setSelectVisible] = React.useState(false);
    const showSelectModal = () => setSelectVisible(true);
    const hideSelectModal = () => setSelectVisible(false);


    const [changeNametVisible, setChangeNameVisible] = React.useState(false);
    const showChangeNameModal = () => setChangeNameVisible(true);
    const hideChangeNameModal = () => setChangeNameVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    let splitName = "N/A"
    if (currentSplitId in splitData)
        splitName = splitData[currentSplitId].split_name

    const getAllSplitNames = () => {
        let splitSelectButtons = [];
        for (let split_id in splitData) {
            splitSelectButtons.push(
                <Button key={"select_button_" + split_id} onLongPress={() => {
                    deleteSplit(split_id);
                    hideSelectModal();
                }}
                    onPress={() => {
                        setSplit(split_id);
                        hideSelectModal();
                    }}>{split_id + ": " + splitData[split_id]['split_name']}</Button>
            );
        }
        return splitSelectButtons;
    }

    const currentSplitName = splitData[currentSplitId] != undefined ? splitData[currentSplitId]['split_name'] : "";

    const [splitNameText, setSplitNameText] = React.useState(currentSplitName);

    return (
        <View>
            <Portal>
                <Modal visible={selectVisible} onDismiss={hideSelectModal} contentContainerStyle={containerStyle}>
                    <Text>Select Split</Text>
                    {getAllSplitNames()}
                    <IconButton
                        icon="plus"
                        style={tw`flex justify-center items-center`}
                        iconColor={MD3Colors.primary10}
                        size={30}
                        onPress={() => {
                            console.log("Added new split");
                            addNewSplit();
                            hideSelectModal();
                            //startRefreshMain(!refreshMain);
                        }}
                    />
                </Modal>
                <Modal visible={changeNametVisible} onDismiss={hideChangeNameModal} contentContainerStyle={containerStyle}>
                    <TextInput
                        label="Split Name"
                        value={splitNameText}
                        onChangeText={text => setSplitNameText(text)}
                    />
                    <IconButton
                        icon="plus"
                        style={tw`flex justify-center items-center`}
                        iconColor={MD3Colors.primary10}
                        size={30}
                        onPress={() => {
                            console.log("Set current split name to " + splitNameText);
                            changeSplitName(currentSplitId, splitNameText);
                            setSplitNameText("");
                            //startRefreshMain(!refreshMain);
                        }}
                    />
                </Modal>
            </Portal>
            <Button onPress={showSelectModal} onLongPress={showChangeNameModal}>
                {splitName}
                <Icon source="camera"
                    size={20} />
            </Button>
        </View>
    );
};

export default ChangeSplitModal;