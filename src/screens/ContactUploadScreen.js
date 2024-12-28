import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { firebase } from '../firebaseConfig';
import CryptoJS from 'crypto-js';
import config from '../config'; // Import the configuration file

const ContactUploadScreen = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data);
                }
            } else {
                Alert.alert('Permission Denied', 'You need to grant contacts permission to use this feature.');
            }
        })();
    }, []);

    const encryptContact = (contact) => {
        const contactString = JSON.stringify(contact);
        return CryptoJS.AES.encrypt(contactString, config.encryptionKey).toString();
    };

    const uploadContacts = async () => {
        const user = firebase.auth().currentUser;
        if (!user) {
            Alert.alert('Not Logged In', 'You need to be logged in to upload contacts.');
            return;
        }

        const userContact = {
            id: user.uid,
            name: user.displayName || 'Unknown',
            phoneNumbers: [{ number: user.phoneNumber }],
        };

        const allContacts = [...contacts, userContact];

        const contactMap = new Map();

        allContacts.forEach(contact => {
            contact.phoneNumbers.forEach(phone => {
                const encryptedNumber = CryptoJS.SHA256(phone.number).toString();
                if (!contactMap.has(encryptedNumber)) {
                    contactMap.set(encryptedNumber, {
                        number: phone.number,
                        names: new Set(),
                        count: 0,
                    });
                }
                const contactEntry = contactMap.get(encryptedNumber);
                contactEntry.names.add(contact.name);
                contactEntry.count += 1;
            });
        });

        const encryptedContacts = Array.from(contactMap.values()).map(contact => ({
            number: contact.number,
            encryptedData: encryptContact({
                names: Array.from(contact.names),
                count: contact.count,
            }),
        }));

        try {
            await firebase.firestore().collection('contacts').doc(user.uid).set({
                contacts: encryptedContacts,
            });
            Alert.alert('Success', 'Contacts uploaded successfully.');
        } catch (error) {
            Alert.alert('Error', 'Failed to upload contacts.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Contacts</Text>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        <Text>{item.name}</Text>
                        {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
                            <Text key={index}>{phone.number}</Text>
                        ))}
                    </View>
                )}
            />
            <Button title="Upload Contacts" onPress={uploadContacts} />
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
    contactItem: {
        marginBottom: 10,
    },
});

export default ContactUploadScreen;