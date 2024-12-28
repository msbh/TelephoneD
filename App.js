import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import OTPScreen from './src/screens/OTPScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import ContactUploadScreen from './src/screens/ContactUploadScreen';
import LoginScreen from './src/screens/LoginScreen';
import CallerIdentificationScreen from './src/screens/CallerIdentificationScreen';
import SearchByNumberScreen from './src/screens/SearchByNumber';
import CommunityTaggingScreen from './src/screens/CommunityTagging';
import ProfileCreationScreen from './src/screens/ProfileCreation';
import PrivacySettingsScreen from './src/screens/PrivacySettings';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import CallHistoryScreen from './src/screens/CallHistoryScreen'; // Import CallHistoryScreen
import CallDetectionService from './src/services/CallDetectionService'; // Import CallDetectionService

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Telephone Directory' }} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ title: 'Verify OTP' }} />
        <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
        <Stack.Screen name="ContactUploadScreen" component={ContactUploadScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CallerIdentificationScreen" component={CallerIdentificationScreen} />
        <Stack.Screen name="SearchByNumberScreen" component={SearchByNumberScreen} />
        <Stack.Screen name="CommunityTaggingScreen" component={CommunityTaggingScreen} />
        <Stack.Screen name="ProfileCreationScreen" component={ProfileCreationScreen} />
        <Stack.Screen name="PrivacySettingsScreen" component={PrivacySettingsScreen} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        <Stack.Screen name="CallHistoryScreen" component={CallHistoryScreen} options={{ title: 'Call History' }} />
      </Stack.Navigator>
      <CallDetectionService />
    </NavigationContainer>
  );
};

export default App;