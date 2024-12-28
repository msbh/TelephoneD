import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import OTPScreen from './src/screens/OTPScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import ContactUploadScreen from './src/screens/ContactUploadScreen';
import LoginScreen from './src/screens/LoginScreen';
import CallerIdentificationScreen from './src/screens/CallerIdentificationScreen'; // Ensure this matches the file name
import SearchByNumberScreen from './src/screens/SearchByNumber';
import CommunityTaggingScreen from './src/screens/CommunityTagging';
import ProfileCreationScreen from './src/screens/ProfileCreation';
import PrivacySettingsScreen from './src/screens/PrivacySettings';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen'; // Corrected import path

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Telephone Directory' }} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ title: 'Verify OTP' }} />
        <Stack.Screen name="AddContact" component={AddContactScreen} options={{ title: 'Add Contact' }} />
        <Stack.Screen name="ContactUpload" component={ContactUploadScreen} options={{ title: 'Upload Your Contacts' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Log In' }} />
        <Stack.Screen name="CallerIdentification" component={CallerIdentificationScreen} options={{ title: 'Incoming Call' }} />
        <Stack.Screen name="SearchByNumber" component={SearchByNumberScreen} options={{ title: 'Search Contact by Number' }} />
        <Stack.Screen name="CommunityTagging" component={CommunityTaggingScreen} options={{ title: 'Tag Numbers' }} />
        <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} options={{ title: 'Create Your Profile' }} />
        <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ title: 'Privacy Settings' }} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} /> {/* Added PrivacyPolicyScreen */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;