import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.content}>
                {/* Your privacy policy content goes here */}
                This is the privacy policy content.
            </Text>
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
    content: {
        fontSize: 16,
    },
});

export default PrivacyPolicyScreen;