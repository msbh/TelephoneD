import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../firebaseConfig';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as Location from 'expo-location';
import { countries } from 'country-data'; // Import country-data to map country codes
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import config from '../config'; // Import the configuration file

const LoginScreen = ({ navigation }) => {
    const [countryCode, setCountryCode] = useState('+1'); // Default country code
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const user = firebase.auth().currentUser;
            if (user) {
                navigation.navigate('HomeScreen');
            }
        };

        checkUserLoggedIn();

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${config.googleApiKey}`);
            const data = await response.json();
            if (data.results.length > 0) {
                const country = data.results[0].address_components.find(component => component.types.includes('country'));
                if (country) {
                    const countryCode = country.short_name;
                    const callingCode = getCallingCode(countryCode);
                    setCountryCode(`+${callingCode}`);
                }
            }
        })();
    }, []);

    const getCallingCode = (countryCode) => {
        const country = countries[countryCode];
        return country ? country.countryCallingCodes[0] : '1';
    };

    const validatePhoneNumber = (phoneNumber, countryCode) => {
        const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, countryCode);
        return phoneNumberObj && phoneNumberObj.isValid();
    };

    const handleSendOtp = async () => {
        if (!validatePhoneNumber(phoneNumber, countryCode)) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
            return;
        }

        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(`${countryCode}${phoneNumber}`, recaptchaVerifier.current);
        setVerificationId(verificationId);
        Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
    };

    const handleLogin = async () => {
        if (!verificationId) {
            Alert.alert('Error', 'Please request an OTP first.');
            return;
        }

        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
        try {
            await firebase.auth().signInWithCredential(credential);
            navigation.navigate('HomeScreen');
        } catch (error) {
            Alert.alert('Error', 'Failed to log in. Please check your OTP and try again.');
        }
    };

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
            />
            <Text style={styles.title}>Login</Text>
            <View style={styles.phoneContainer}>
                <TextInput
                    style={styles.countryCodeInput}
                    placeholder="+1"
                    value={countryCode}
                    onChangeText={setCountryCode}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.phoneInput}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
            </View>
            <Button title="Send OTP" onPress={handleSendOtp} />
            <TextInput
                style={styles.input}
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    countryCodeInput: {
        width: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    phoneInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    link: {
        color: '#007BFF',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default LoginScreen;