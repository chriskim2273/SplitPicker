import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Icon } from 'react-native-paper';

const ChangeSplitModal = () => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    return (
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
            <Button onPress={showModal}>
                Split Name
                <Icon source="camera"
                    size={20} />
            </Button>
        </View>
    );
};

export default ChangeSplitModal;