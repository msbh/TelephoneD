import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Button title="Upload Contacts" onPress={() => navigation.navigate('ContactUpload')} />
            <Button title="View Call History" onPress={() => navigation.navigate('CallHistory')} />
            <Button title="Search by Number" onPress={() => navigation.navigate('SearchByNumber')} />
            <Button title="Spam Detection" onPress={() => navigation.navigate('SpamDetection')} />
            <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
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
});

export default HomeScreen;