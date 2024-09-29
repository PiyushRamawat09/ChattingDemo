import React from 'react';
import {View, Text, StatusBar, KeyboardAvoidingView} from 'react-native';
import {mobileH, mobileW} from './src/Utils/config';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddtoChatScreen,
  ChatScreen,
  Home,
  LoginScreen,
  SignUpScreen,
  SplashScreen,
} from './Screens/Index';
import {Provider} from 'react-redux';
import {store, persistor} from './Context/reducers/store';
import {PersistGate} from 'redux-persist/integration/react';

import {ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen} from "@zegocloud/zego-uikit-prebuilt-call-rn"

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="white"
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddtoChatScreen" component={AddtoChatScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />

            <Stack.Screen
              options={{headerShown: false}}
              // DO NOT change the name
              name="ZegoUIKitPrebuiltCallWaitingScreen"
              component={ZegoUIKitPrebuiltCallWaitingScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              // DO NOT change the name
              name="ZegoUIKitPrebuiltCallInCallScreen"
              component={ZegoUIKitPrebuiltCallInCallScreen}
            />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
