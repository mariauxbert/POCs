

import React, { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import * as LocalAuthentication from "expo-local-authentication";
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()
import { RSA } from 'react-native-rsa-native';

let message = "my secret message";
const App = () => {
  const [lockedOpen, setLockedOpen] = useState(false);

  const authenticate = async () => {


    if (Platform.OS == 'android') {
      rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject

        if (available && biometryType === BiometryTypes.TouchID) {
          console.log('TouchID is supported')
        } else if (available && biometryType === BiometryTypes.FaceID) {
          console.log('FaceID is supported')
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          console.log('Biometrics is supported')
        } else {
          console.log('Biometrics not supported')
        }
      })

      rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then((resultObject) => {
          const { success } = resultObject

          if (success) {
            setLockedOpen(true)
            console.log('successful biometrics provided')
          } else {
            console.log('user cancelled biometric prompt')
          }
        })
        .catch(() => {
          console.log('biometrics failed')
        })
    }
    if (Platform.OS == 'ios') {
      const enrolled = await LocalAuthentication.getEnrolledLevelAsync();
      const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();

      console.log("enrolled", enrolled);
      console.log("supported", supported);
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Not Supported")
        return

      }

      const res = await LocalAuthentication.authenticateAsync();
      console.log("res", res);
      if (res.success) {
        setLockedOpen(true)
      }
    }

  }

 const checKeys=()=>{
  rnBiometrics.biometricKeysExist()
  .then((resultObject) => {
    const { keysExist } = resultObject

    if (keysExist) {
      console.log('Keys exist')
      authenticate();
    } else {
      Alert.alert('User do not exist. Please Signup')
     //console.log('Keys do not exist or were deleted')
    }
  })

  }


  const signUp=()=>{
    let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
// let payload = epochTimeSeconds + 'some message'

// const rnBiometrics = new ReactNativeBiometrics()

// rnBiometrics.createSignature({
//     promptMessage: 'Sign in',
//     payload: payload
//   })
//   .then((resultObject) => {
//     const { success, signature } = resultObject

//     if (success) {
//       console.log(signature)
//     //  verifySignatureWithServer(signature, payload)
//     }
//   })
    rnBiometrics.createKeys()
    .then((resultObject) => {
      const { publicKey } = resultObject;

      console.log(resultObject)
    // sendPublicKeyToServer(publicKey)
   })
  }
  useEffect(() => {


    // authenticate();
  }, [])
  const isDarkMode = useColorScheme() === 'dark';

  const encryption = () => {
    RSA.generateKeys(4096) // set key size
      .then(keys => {
        console.log('4096 private:', keys.private); // the private key
        console.log('4096 public:', keys.public); // the public key
        RSA.encrypt(message, keys.public)
          .then(encodedMessage => {
            console.log(`the encoded message is ${encodedMessage}`);
            RSA.decrypt(encodedMessage, keys.private)
              .then(decryptedMessage => {
                console.log(`The original message was ${decryptedMessage}`);
              });
          });
      });
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}

      />




      {!lockedOpen ?
        <View style={styles.container}>
          <Text style={styles.heading}>Biometric Login</Text>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => checKeys()}>
            <Text style={styles.texts}>Please Use biometric login</Text>
            <Image source={Platform.OS == 'android' ? require('./../assets/fingerprint.png') : require('./../assets/security.png')}
              style={{ width: 80, height: 80 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#ffff', borderRadius: 5 }} onPress={() => signUp()}>
            <Text style={[styles.texts, { margin: 10 }]}>Signup</Text>

          </TouchableOpacity>
        </View>
        :
        <View style={[styles.container, { backgroundColor: '#A19B88', width: '100%' }]}><Text style={[styles.heading, { color: '#ffff', margin: 20 }]}>Welcome Back!</Text>
          <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#ffff', borderRadius: 5, margin: 10 }} onPress={() => encryption()}>
            <Text style={[styles.texts, { margin: 10 }]}>Encode</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#ffff', borderRadius: 5 }} onPress={() => setLockedOpen(false)}>
            <Text style={[styles.texts, { margin: 10 }]}>Logout</Text>

          </TouchableOpacity>
        </View>
      }

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold'

  },
  texts: {
    fontSize: 15,
    margin: 20


  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Adjust the image's resizeMode as needed
  },
});


export default App;


