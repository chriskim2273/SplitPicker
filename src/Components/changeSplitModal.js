import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Icon } from 'react-native-paper';
import { SplitData } from '../Context/SplitContext';

const ChangeSplitModal = () => {
    const [visible, setVisible] = React.useState(false);
    const { splitData, currentSplitId } = SplitData();

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    let splitName = "N/A"
    if (currentSplitId in splitData)
        splitName = splitData[currentSplitId].split_name

    return (
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
            <Button onPress={showModal}>
                {splitName}
                <Icon source="camera"
                    size={20} />
            </Button>
        </View>
    );
};

export default ChangeSplitModal;