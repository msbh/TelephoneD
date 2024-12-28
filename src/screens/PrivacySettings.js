import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';

const PrivacySettings = () => {
    const [shareName, setShareName] = useState(true);
    const [shareContacts, setShareContacts] = useState(true);

    const handleSaveSettings = () => {
        // Save settings logic here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Privacy Settings</Text>
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Share Name with Others</Text>
                <Switch
                    value={shareName}
                    onValueChange={setShareName}
                />
            </View>
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Share Contacts with Others</Text>
                <Switch
                    value={shareContacts}
                    onValueChange={setShareContacts}
                />
            </View>
            <Button title="Save Settings" onPress={handleSaveSettings} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    settingText: {
        fontSize: 18,
    },
});

export default PrivacySettings;