import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {color} from '../src/Utils/Colors';
import {Logo} from '../assets';
import {mobileH, mobileW} from '../src/Utils/config';
import {fireStoreDB, firebaseAuth} from '../Config/firebase.config';
import {useNavigation} from '@react-navigation/native';
import {doc, getDoc} from 'firebase/firestore';
import {SET_USER} from '../Context/Actions/userActiosn';
import {useDispatch, useSelector} from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user?.user);

  useEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    console.log('I m', user);

    if (user?._id) {
      setTimeout(() => {
        navigation.replace('Home');
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.replace('LoginScreen');
      }, 2000);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.whiteColor,
        alignItems: 'center',
      }}>
      <Image
        source={Logo}
        style={{
          width: (mobileW * 30) / 100,
          height: (mobileW * 30) / 100,
          resizeMode: 'cover',
          marginTop: (mobileH * 25) / 100,
          marginBottom: (mobileH * 10) / 100,
        }}></Image>

      <ActivityIndicator size={'large'} color={'#43C651'} />
    </View>
  );
};

export default SplashScreen;
