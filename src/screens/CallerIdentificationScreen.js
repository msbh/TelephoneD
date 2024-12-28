import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CallerIdentificationScreen = ({ route }) => {
    const { callerName, phoneNumber } = route.params;

    const handleTagAsSpam = () => {
        // Logic to tag as spam
    };

    const handleAddToContacts = () => {
        // Logic to add to contacts
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Incoming Call</Text>
            <Text style={styles.callerInfo}>{callerName || phoneNumber}</Text>
            <Button title="Tag as Spam" onPress={handleTagAsSpam} />
            <Button title="Add to Contacts" onPress={handleAddToContacts} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    callerInfo: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default CallerIdentificationScreen;