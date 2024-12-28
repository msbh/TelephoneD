import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { firebase } from '../firebaseConfig';

const CallDetectionService = () => {
    const [callerName, setCallerName] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const callDetector = new CallDetectorManager(
            (event, number) => {
                if (event === 'Incoming') {
                    checkCaller(number);
                }
            },
            true,
            () => { },
            {
                title: 'Phone State Permission',
                message: 'This app needs access to your phone state to detect incoming calls.',
            }
        );

        return () => {
            callDetector.dispose();
        };
    }, []);

    const checkCaller = async (number) => {
        try {
            const contactsRef = firebase.firestore().collection('contacts');
            const snapshot = await contactsRef.get();
            let found = false;

            snapshot.forEach((doc) => {
                const contacts = doc.data().contacts;
                contacts.forEach((contact) => {
                    if (contact.number === number) {
                        setCallerName(contact.names[0]); // Assuming the first name is the primary name
                        setVisible(true);
                        found = true;
                    }
                });
            });

            if (!found) {
                setCallerName('Unknown');
                setVisible(true);
            }
        } catch (error) {
            console.error('Error checking caller:', error);
        }
    };

    return (
        <Dialog
            visible={visible}
            onTouchOutside={() => setVisible(false)}
        >
            <DialogContent>
                <View style={styles.popup}>
                    <Text style={styles.callerName}>{callerName}</Text>
                </View>
            </DialogContent>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    popup: {
        padding: 20,
        alignItems: 'center',
    },
    callerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CallDetectionService;