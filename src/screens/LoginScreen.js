import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    const handleSendOtp = () => {
        // Send OTP logic here
        console.log('OTP sent to:', phoneNumber);
    };

    const handleLogin = () => {
        // Login logic here
        console.log('User logged in:', { phoneNumber, otp });
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
            />
            <Button title="Send OTP" onPress={handleSendOtp} />
            <Button title="Log In" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    link: {
        color: '#007BFF',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default LoginScreen;