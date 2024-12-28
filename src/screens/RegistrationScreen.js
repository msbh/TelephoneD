import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, CheckBox } from 'react-native';
import { firebase } from '../firebaseConfig';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as Location from 'expo-location';
import { countries } from 'country-data'; // Import country-data to map country codes
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import CryptoJS from 'crypto-js';
import config from '../config'; // Import the configuration file

const RegistrationScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [countryCode, setCountryCode] = useState('+1'); // Default country code
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false);
    const recaptchaVerifier = useRef(null);

    useEffect(() => {
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

    const validateName = (name) => {
        return name.trim().length > 0 && name.trim().length < 30;
    };

    const validateOtp = (otp) => {
        return otp.trim().length < 10 && otp.trim().length > 3; // Assuming OTP is 6 digits
    };

    const sendOtp = async () => {
        if (!validatePhoneNumber(phoneNumber, countryCode)) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
            return;
        }

        if (!validateName(name)) {
            Alert.alert('Invalid Name', 'Please enter your name. Not more than 30 characters');
            return;
        }

        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(`${countryCode}${phoneNumber}`, recaptchaVerifier.current);
        setVerificationId(verificationId);
    };

    const verifyOtp = async () => {
        if (!validateOtp(otp)) {
            Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
            return;
        }

        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
        await firebase.auth().signInWithCredential(credential);
        // Save user info to Firestore
        const user = firebase.auth().currentUser;
        const userContact = {
            id: user.uid,
            name,
            phoneNumber: `${countryCode}${phoneNumber}`,
        };
        await firebase.firestore().collection('users').doc(user.uid).set(userContact);
        await saveUserAsContact(userContact);
        navigation.navigate('HomeScreen');
    };

    const saveUserAsContact = async (userContact) => {
        const encryptedNumber = CryptoJS.SHA256(userContact.phoneNumber).toString();
        const contactEntry = {
            number: userContact.phoneNumber,
            encryptedData: CryptoJS.AES.encrypt(JSON.stringify({
                names: [userContact.name],
                count: 1,
            }), config.encryptionKey).toString(),
        };

        try {
            await firebase.firestore().collection('contacts').doc(userContact.id).set({
                contacts: [contactEntry],
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to save user as contact.');
        }
    };

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
            />
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
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
            <View style={styles.privacyPolicyContainer}>
                <CheckBox
                    value={isPrivacyPolicyAccepted}
                    onValueChange={setIsPrivacyPolicyAccepted}
                />
                <Text style={styles.privacyPolicyText}>
                    I accept the{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                        Privacy Policy
                    </Text>
                </Text>
            </View>
            <Button title="Send OTP" onPress={sendOtp} disabled={!isPrivacyPolicyAccepted || !validateName(name)} />
            <TextInput
                style={styles.input}
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
            />
            <Button title="Verify OTP" onPress={verifyOtp} disabled={!validateOtp(otp)} />
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.link}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
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
        backgroundColor: '#fff',
        marginRight: 10,
    },
    phoneInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    privacyPolicyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    privacyPolicyText: {
        marginLeft: 10,
        color: '#333',
    },
    link: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
});

export default RegistrationScreen;