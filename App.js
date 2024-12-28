import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationScreen from './src/screens/RegistrationScreen';
import OTPScreen from './src/screens/OTPScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrationScreen">
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ title: 'Verify OTP' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
