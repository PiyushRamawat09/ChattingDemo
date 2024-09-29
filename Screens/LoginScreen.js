import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {BGImage, Logo} from '../assets';
import {mobileH, mobileW} from '../src/Utils/config';
import {Langch} from '../src/Utils/Lang_provider';
import {Color, Font, color} from '../src/Utils/Colors';
import {UserInput} from '../Components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {fireStoreDB, firebaseAuth} from '../Config/firebase.config';
import {getDoc, doc} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../Context/Actions/userActiosn';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertmessage] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== '') {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(userCred => {
          if (userCred) {
            console.log('id', userCred?.user.uid);
            getDoc(doc(fireStoreDB, 'users', userCred?.user.uid)).then(
              docSnap => {
                if (docSnap.exists()) {
                  console.log('user data: ', docSnap.data());
                  dispatch(SET_USER(docSnap.data()))
                  navigation.navigate("Home")
                }
              },
            );
          }
        })
        .catch(err => {
          console.log('Error: ', err.message);
          if (err.message) {
            setAlert(true);
            setAlertmessage('Invalid Email/Password');
          }
        });
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled">
        <Image
          source={BGImage}
          style={{
            height: (mobileH * 45) / 100,
            width: mobileW,
          }}
          resizeMode="cover"></Image>

        <View
          style={{
            backgroundColor: '#fff',
            height: (mobileH * 80) / 100,
            width: mobileW,
            borderTopLeftRadius: (mobileW * 18) / 100,
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: (mobileW * 5) / 100,
            marginTop: (-mobileH * 25) / 100,
          }}>
          <Image
            source={Logo}
            style={{
              height: (mobileW * 16) / 100,
              width: (mobileW * 16) / 100,
            }}
            resizeMode="contain"></Image>

          <Text
            style={{
              color: color.primaryText,
              fontSize: (mobileW * 5) / 100,
              fontFamily: Font.FontSemiBold,
              marginTop: (mobileH * 2.5) / 100,
            }}>
            {Langch.welcomeBack}
          </Text>

          <View
            style={{
              marginTop: (mobileH * 2) / 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* Alert */}

            {alert && (
              <Text
                style={{
                  color: 'red',
                  fontSize: (mobileW * 5) / 100,
                  fontFamily: Font.FontSemiBold,
                }}>
                {alertMessage}
              </Text>
            )}

            {/* email  */}

            <UserInput
              placeholder="Enter Email"
              isPassword={false}
              setStateValue={setEmail}
              setGetEmailValidationStatus={setGetEmailValidationStatus}
            />

            {/* password */}

            <UserInput
              placeholder="Enter Password"
              isPassword={true}
              setStateValue={setPassword}
            />

            {/* Login button */}

            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.7}
              style={{
                width: (mobileW * 90) / 100,
                borderRadius: (mobileW * 2) / 100,
                backgroundColor: color.primary,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: (mobileH * 2) / 100,
                marginTop: (mobileH * 5) / 100,
              }}>
              <Text
                style={{
                  color: color.whiteColor,
                  fontSize: (mobileW * 5) / 100,
                  fontFamily: Font.FontBold,
                }}>
                {Langch.signIn}
              </Text>
            </TouchableOpacity>
          </View>

          {/* don't have an account */}

          <View
            style={{
              marginTop: (mobileH * 3) / 100,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: (mobileW * 4) / 100,
                color: color.primaryText,
                fontFamily: Font.FontSemiBold,
              }}>
              {Langch.donthaveAnAccount}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
              activeOpacity={0.7}>
              <Text
                style={{
                  fontSize: (mobileW * 4) / 100,
                  color: color.primary,
                  fontFamily: Font.FontSemiBold,
                }}>
                {Langch.createHere}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;
