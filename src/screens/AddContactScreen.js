import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationScreen from './RegistrationScreen';
import OTPScreen from './OTPScreen';
import HomeScreen from './HomeScreen';
import AddContactScreen from './AddContactScreen';  // Import AddContactScreen

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Telephone Directory' }} />
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ title: 'Register' }} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ title: 'Verify OTP' }} />
                <Stack.Screen name="AddContact" component={AddContactScreen} options={{ title: 'Add Contact' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;