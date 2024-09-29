import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {BGImage, Logo, userplaceholder} from '../assets';
import {mobileH, mobileW} from '../src/Utils/config';
import {Langch} from '../src/Utils/Lang_provider';
import {Color, Font, color} from '../src/Utils/Colors';
import {CameraGallery, UserInput} from '../Components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {LocalImg} from '../src/Utils/Images';
import {mediaprovider} from '../MediaProvider/Mediaprovider';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {fireStoreDB, firebaseAuth} from '../Config/firebase.config';
import {doc, setDoc} from 'firebase/firestore';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [image, setImage] = useState(null);
  const [mediamodal, setMediamodal] = useState(false);
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const navigation = useNavigation();

  Camerapopen = async () => {
    mediaprovider
      .launchCamera(false)
      .then(res => {
        // console.log('camerares', res);
        setImage(res.path);
        setMediamodal(false);
      })
      .catch(error => {
        setMediamodal(false);
        console.log('error', error);
        if (Platform.OS == 'ios') {
          if (error == 'Error: User did not grant camera permission.') {
            setTimeout(() => {
              open_settings();
            }, 1000);
          }
        } else {
          if (error == 'Error: Required permission missing') {
            open_settings();
          }
        }
      });
  };

  Galleryopen = () => {
    mediaprovider
      .launchGellery(false)
      .then(res => {
        // console.log('camerares', res);
        setImage(res.path);
        setMediamodal(false);
      })
      .catch(error => {
        this.setState({mediamodal: false});
        console.log('error', error);
        if (Platform.OS == 'ios') {
          if (
            error ==
            'Error: Cannot access images. Please allow access if you want to be able to select images.'
          ) {
            setTimeout(() => {
              open_settings();
            }, 1000);
          }
        } else {
          if (error == 'Error: Required permission missing') {
            open_settings();
          }
        }
      });
  };

  open_settings = () => {
    Alert.alert(
      'Alert',
      'This app need permissions, please allow it',
      [
        {
          text: 'Close',
          onPress: () => {
            console.log('nothing user cancle it ');
          },
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleSignup = async () => {
    if (getEmailValidationStatus && email !== '') {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        userCred => {
          console.log('user', userCred.user);
          const data = {
            _id: userCred?.user.uid,
            fullName: name,
            profilePic: image,
            providerData: userCred?.user.providerData[0],
          };

          setDoc(doc(fireStoreDB, 'users', userCred?.user.uid), data).then(
            () => {
              navigation.navigate('LoginScreen');
            },
          );
        },
      );
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
            height: (mobileH * 85) / 100,
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
              height: (mobileW * 14) / 100,
              width: (mobileW * 14) / 100,
            }}
            resizeMode="contain"></Image>

          <Text
            style={{
              color: color.primaryText,
              fontSize: (mobileW * 5) / 100,
              fontFamily: Font.FontSemiBold,
              marginTop: (mobileH * 1.5) / 100,
            }}>
            {Langch.JoinWithUs}
          </Text>

          {/* profile Image Section */}

          <View
            style={{
              width: mobileW,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: (mobileH * 2.5) / 100,
            }}>
            <TouchableOpacity
              onPress={() => setMediamodal(true)}
              activeOpacity={0.7}
              style={{
                height: (mobileW * 22) / 100,
                width: (mobileW * 22) / 100,
                padding: (mobileW * 1) / 100,
                borderRadius: (mobileW * 30) / 100,
                borderColor: color.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: (mobileW * 0.7) / 100,
              }}>
              <Image
                source={image == null ? userplaceholder : {uri: image}}
                style={{
                  height: (mobileW * 20) / 100,
                  width: (mobileW * 20) / 100,
                  borderRadius: (mobileW * 30) / 100,
                  resizeMode: 'cover',
                }}></Image>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: (mobileH * 1) / 100,
            }}>
            {/* Alert */}

            {/* Full Name */}

            <UserInput
              placeholder="First Name"
              isPassword={false}
              setStateValue={setName}
            />

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
              onPress={handleSignup}
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
                {Langch.signUp}
              </Text>
            </TouchableOpacity>
          </View>

          {/* have an account */}

          <View
            style={{
              marginTop: (mobileH * 2.5) / 100,
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
              {Langch.haveAnAccount}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              activeOpacity={0.7}
              style={{padding: 0, margin: 0}}>
              <Text
                style={{
                  fontSize: (mobileW * 4) / 100,
                  color: color.primary,
                  fontFamily: Font.FontSemiBold,
                }}>
                {Langch.loginHere}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {mediamodal && (
        <CameraGallery
          mediamodal={mediamodal}
          Camerapopen={() => {
            Camerapopen();
          }}
          Galleryopen={() => {
            Galleryopen();
          }}
          Canclemedia={() => {
            setMediamodal(false);
            setImage(null);
          }}
        />
      )}
    </View>
  );
};
export default SignUpScreen;
