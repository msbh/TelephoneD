import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import CallLogs from 'react-native-call-log';

const CallHistoryScreen = () => {
    const [callHistory, setCallHistory] = useState([]);

    useEffect(() => {
        const fetchCallHistory = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
                        {
                            title: 'Call Log Permission',
                            message: 'This app needs access to your call logs',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        const logs = await CallLogs.loadAll();
                        setCallHistory(logs);
                    } else {
                        console.log('Call Log permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            } else {
                console.log('Call Log access is not available on iOS');
            }
        };

        fetchCallHistory();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.callItem}>
            <Text style={styles.callerName}>{item.name || 'Unknown'}</Text>
            <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            <Text style={styles.callType}>Type: {item.type}</Text>
            <Text style={styles.callDuration}>Duration: {item.duration} seconds</Text>
            <Text style={styles.timestamp}>{new Date(parseInt(item.timestamp)).toLocaleString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Call History</Text>
            <FlatList
                data={callHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
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
    callItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    callerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    phoneNumber: {
        fontSize: 16,
        color: '#555',
    },
    callType: {
        fontSize: 14,
        color: '#777',
    },
    callDuration: {
        fontSize: 14,
        color: '#777',
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
    },
});

export default CallHistoryScreen;