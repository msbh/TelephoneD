import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OTPVerification = ({ navigation }) => {
    const [otp, setOtp] = useState('');

    const handleVerifyOtp = () => {
        // Verify OTP logic here
        console.log('OTP verified:', otp);
        navigation.navigate('Home');
    };

    const handleResendOtp = () => {
        // Resend OTP logic here
        console.log('OTP resent');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
            />
            <Button title="Verify" onPress={handleVerifyOtp} />
            <Button title="Resend OTP" onPress={handleResendOtp} />
            <Text style={styles.message}>Check your SMS inbox for the OTP.</Text>
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
    message: {
        marginTop: 20,
        textAlign: 'center',
        color: 'gray',
    },
});

export default OTPVerification;