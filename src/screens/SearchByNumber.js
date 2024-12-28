import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { searchNumberInDatabase } from '../services/contactService'; // Assume you have a service to search numbers in your database

const SearchByNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const searchResults = await searchNumberInDatabase(phoneNumber);
        setResults(searchResults);
    };

    const renderItem = ({ item }) => (
        <View style={styles.resultItem}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultTag}>{item.tag}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Contact by Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    resultItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    resultName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultTag: {
        fontSize: 16,
        color: 'gray',
    },
});

export default SearchByNumber;