import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {mobileH, mobileW} from '../src/Utils/config';
import {Font, color} from '../src/Utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {userplaceholder} from '../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {doc, setDoc} from 'firebase/firestore';
import {fireStoreDB} from '../Config/firebase.config';
import { msgProvider } from '../MessageProvider/messageProvider';

const AddtoChatScreen = () => {
  const navigation = useNavigation();
  const [addChat, setAddchat] = useState('');
  const user = useSelector(state => state.user?.user);

  const CreatenewChat = async () => {
    let id = `${Date.now()}`;

    const docdata = {
      id: id,
      user: user,
      chatName: addChat,
      lastmsg : ''
    };

    if (addChat != '') {
      setDoc(doc(fireStoreDB,'chats',id), docdata)
        .then(() => {
            console.log("success")
          setAddchat('');
          navigation.replace('Home');
        })
        .catch(err => {
          Alert.alert('Error ', err);
        });
    }else{
      msgProvider.toast("Please enter chat name", 'center');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.whiteColor,
      }}>
      <KeyboardAwareScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: mobileW,
          alignItems: 'center',
          flex: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            width: mobileW,
            backgroundColor: color.primary,
            flex: 0.5,
            paddingTop: (mobileH * 1) / 100,
            paddingHorizontal: (mobileW * 5) / 100,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: (mobileH * 1.5) / 100,
            }}>
            {/* go back */}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}>
              <MaterialIcons name="chevron-left" size={40} color={'#fbfbfb'} />
            </TouchableOpacity>

            {/* middle section */}

            {/* last section */}

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                height: (mobileW * 14) / 100,
                width: (mobileW * 14) / 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Image
            source={
              user?.profilePic != null
                ? {uri: user?.profilePic}
                : userplaceholder
            }
            style={{
              width: (mobileW * 12.5) / 100,
              height: (mobileW * 12.5) / 100,
              borderRadius: (mobileW * 30) / 100,
            }}
            resizeMode="cover"></Image> */}
              <Image
                source={userplaceholder}
                style={{
                  width: (mobileW * 12.5) / 100,
                  height: (mobileW * 12.5) / 100,
                  borderRadius: (mobileW * 30) / 100,
                }}
                resizeMode="cover"></Image>
            </TouchableOpacity>
          </View>

          {/* bottom section */}

          <View
            style={{
              backgroundColor: '#fff',
              flex: 1,
              width: mobileW,
              borderTopLeftRadius: (mobileW * 12) / 100,
              borderTopRightRadius: (mobileW * 12) / 100,
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: (mobileW * 5) / 100,
              marginTop: (mobileH * 5) / 100,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: mobileW,
                paddingHorizontal: (mobileW * 5) / 100,
              }}>
              <View
                style={{
                  borderWidth: (mobileW * 0.2) / 100,
                  borderColor: color.grayColor,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: (mobileW * 2) / 100,
                  paddingHorizontal: (mobileW * 3) / 100,
                  marginHorizontal: (mobileW * 2) / 100,
                  marginTop: (mobileH * 1.5) / 100,
                  height: (mobileH * 7) / 100,
                }}>
                {/* icon */}
                <Ionicons name="chatbubbles" size={24} color={'#777'} />
                {/* textInput */}

                <TextInput
                  style={{
                    flex: 1,
                    color: color.primaryText,
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.FontSemiBold,
                    marginLeft: (mobileW * 1) / 100,
                    marginRight: (mobileW * 1) / 100,
                  }}
                  placeholder="Create a chat"
                  placeholderTextColor={'#999'}
                  value={addChat}
                  onChangeText={text => setAddchat(text)}
                  autoCapitalize="none"
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />

                {/* Icon */}

                <TouchableOpacity onPress={CreatenewChat} activeOpacity={0.7}>
                  <FontAwesome name="send" color={'#777'} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddtoChatScreen;
