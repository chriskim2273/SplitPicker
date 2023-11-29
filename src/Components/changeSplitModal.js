import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Icon } from 'react-native-paper';
import { SplitData } from '../Context/SplitContext';

const ChangeSplitModal = () => {
    const { splitData, currentSplitId } = SplitData();

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

    return (
        <View>
            <Portal>
                <Modal visible={selectVisible} onDismiss={hideSelectModal} contentContainerStyle={containerStyle}>
                    <Text>Select Split</Text>
                </Modal>
                <Modal visible={changeNametVisible} onDismiss={hideChangeNameModal} contentContainerStyle={containerStyle}>
                    <Text>Change Name.</Text>
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