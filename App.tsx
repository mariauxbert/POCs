

import React, { useContext, useEffect } from 'react';
import { Button, Text, View, StyleSheet ,useColorScheme} from 'react-native';
import Constants from 'expo-constants';
import ErrorBoundary from 'react-native-error-boundary';
import { NetworkProvider } from './context/NetworkContext';

import { NavigationContainer,  DarkTheme,
  DefaultTheme, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SimpleComp from './Comp';
import ComponentWithError from './screens/CompoentWithErrors';
import { ErrorFallback } from "./utils/ErrorFallback";
import { checkLocationPermission , requestCameraPermission, requestLocationPermission,checkCameraPermission} from './utils/PermissionsUtil';
import MediaPicker from './screens/MediaPicker';
import { setNavigationReference } from './utils/NavigationRef';
import {  Platform,LogLevel } from '@dynatrace/react-native-plugin';

import { Dynatrace, DataCollectionLevel, UserPrivacyOptions } from '@dynatrace/react-native-plugin';
import {  ConfigurationBuilder } from '@dynatrace/react-native-plugin';
import Biometrics  from './screens/OldBiometric';


const App = () => {
  const theme = useColorScheme();
  const Stack = createStackNavigator();


 // const configurationBuilder = new ConfigurationBuilder("https://bf07731ogr.bf.dynatrace.com/mbeacon", "a0299a68-e245-42e0-85a8-f2c61d5d2857");
useEffect(()=>{
let privacyConfig = new UserPrivacyOptions(DataCollectionLevel.UserBehavior, true);
Dynatrace.applyUserPrivacyOptions(privacyConfig);
  checkCamera()
  checkLocation()
  requestLocationPermission()
},[])

//
// Checking camera permission
const checkCamera = async () => {
  const cameraPermissionGranted = await checkCameraPermission();
  if (!cameraPermissionGranted) {
    const permissionGranted = await requestCameraPermission();
    if (!permissionGranted) {
      // Handle camera permission denied
    }
  }
};

// Checking location permission
const checkLocation = async () => {
  const locationPermissionGranted = await checkLocationPermission();
  if (!locationPermissionGranted) {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
      console.log("grated No");
      
      // Handle location permission denied
    }
  }
};


 
  return (
    <NetworkProvider >
      <ErrorBoundary FallbackComponent={ErrorFallback} >
       <NavigationContainer  ref={setNavigationReference}>
        <Stack.Navigator>
      <Stack.Screen name="Home" component={SimpleComp} />
      <Stack.Screen name="ComponentWithError" component={ComponentWithError} />
      <Stack.Screen name="MediaPicker" component={MediaPicker} />
      <Stack.Screen name='BioMetrics' component={Biometrics} />
      </Stack.Navigator>
      </NavigationContainer>
      </ErrorBoundary>
    </NetworkProvider>
  )
}



export default App