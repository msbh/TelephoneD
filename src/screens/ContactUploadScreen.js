import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import { uploadContactsToDatabase } from '../services/contactService'; // Assume you have a service to upload contacts to your database

const ContactUploadScreen = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data);
                }
            }
        })();
    }, []);

    const handleUploadContacts = async () => {
        await uploadContactsToDatabase(contacts);
        alert('Contacts uploaded successfully!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Your Contacts</Text>
            <Button title="Upload Contacts" onPress={handleUploadContacts} />
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
                            <Text key={index} style={styles.contactNumber}>{phone.number}</Text>
                        ))}
                    </View>
                )}
            />
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
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactNumber: {
        fontSize: 16,
        color: 'gray',
    },
});

export default ContactUploadScreen;