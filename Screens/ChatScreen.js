import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {mobileH, mobileW} from '../src/Utils/config';
import {Font, color} from '../src/Utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {userplaceholder} from '../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import {fireStoreDB} from '../Config/firebase.config';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const ChatScreen = ({route}) => {
  const {room} = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsloading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState('');
  const user = useSelector(state => state.user?.user);

  const [otherUserID, setOtherUserID] = useState(0);
  const [otherUsername, setOtherUserName] = useState("");

  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      roomId: room.id,
      timeStamp: timeStamp,
      message: message,
      user: user,
      lastMsg: '',
    };

    setMessage('');
    await addDoc(
      collection(doc(fireStoreDB, 'chats', room.id), 'messages'),
      _doc,
    )
      .then(() => {})
      .catch(err => {
        Alert.alert(err);
      });
  };

  useLayoutEffect(() => {
    const msgQuery = query(
      collection(fireStoreDB, 'chats', room?.id, 'messages'),
      orderBy('timeStamp', 'asc'),
    );

    const unsubscribe = onSnapshot(msgQuery, querySnap => {
      const upMsg = querySnap.docs.map(doc => doc.data());
      setMessages(upMsg);
      setIsloading(false);
      getOtherUserID(upMsg);
    });
    return unsubscribe;
  }, []);


 const getOtherUserID =  (upMsg) => {
  upMsg.map((msg, i) => {
    if(msg.user.providerData.email !== user.providerData.email){
      setOtherUserID(msg.user._id);
      setOtherUserName(msg.user.fullName);
      console.log("otheruserId", msg.user._id);
      console.log("otherUsername", msg.user.fullName);
      return;
    }
  })
 };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.whiteColor,
        height: mobileH,
      }}>
      {/* header */}
      <View
        style={{
          width: mobileW,
          height: (mobileH * 25) / 100,
          backgroundColor: color.primary,
          paddingTop: (mobileH * 1) / 100,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: (mobileH * 1.5) / 100,
            marginLeft: (mobileW * 1) / 100,
          }}>
          {/* go back */}

          <TouchableOpacity
            style={{}}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={45} color={'#fff'} />
          </TouchableOpacity>

          {/* middle section */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: (mobileW * 2) / 100,
            }}>
            <View
              style={{
                height: (mobileW * 12) / 100,
                width: (mobileW * 12) / 100,
                borderRadius: (mobileW * 30) / 100,
                borderColor: color.whiteColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: (mobileW * 0.2) / 100,
              }}>
              <FontAwesome5 name="users" size={25} color={'#fff'} />
            </View>

            <View
              style={{
                marginLeft: (mobileW * 2) / 100,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: (mobileW * 4) / 100,
                  fontFamily: Font.FontSemiBold,
                }}>
                {room.chatName.length > 16
                  ? `${room.chatName.slice(0, 16)}..`
                  : room.chatName}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: (mobileW * 4) / 100,
                  fontFamily: Font.FontSemiBold,
                }}>
                online
              </Text>
            </View>
          </View>

          {/* last section */}

          <View
            style={{
              height: (mobileW * 14) / 100,
              width: (mobileW * 14) / 100,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
              marginLeft: (mobileW * 1) / 100,
            }}>
            {/* <TouchableOpacity activeOpacity={0.7} style={{}}>
              <FontAwesome5 name="video" size={24} color={'#fff'} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}>
              <FontAwesome5 name="phone" size={24} color={'#fff'} />
            </TouchableOpacity> */}

            <ZegoSendCallInvitationButton
              invitees={[{userID : otherUserID.toString() , userName : otherUsername}]}
              isVideoCall={false}
              resourceID={'Zego_data'}
            />
            <ZegoSendCallInvitationButton
              invitees={[{userID : otherUserID.toString() , userName : otherUsername}]}
              isVideoCall={true}
              resourceID={'Zego_video_call'}
            />

            <TouchableOpacity activeOpacity={0.7}>
              <Entypo name="dots-three-vertical" size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: (-mobileH * 12) / 100,
        }}></View>

      {/* bottom section */}

      <View
        style={{
          width: mobileW,
          flex: 1,
          borderTopLeftRadius: (mobileW * 12) / 100,
          borderTopRightRadius: (mobileW * 12) / 100,
          alignSelf: 'center',
          backgroundColor: '#fff',
        }}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={180}>
          <>
            <ScrollView style={{}}>
              {isLoading ? (
                <View
                  style={{
                    width: mobileW,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: (mobileH * 1) / 100,
                  }}>
                  <ActivityIndicator size={'large'} color={'#43C651'} />
                </View>
              ) : (
                <>
                  {/* messages */}

                  {messages?.map((msg, i) =>
                    msg.user.providerData.email === user.providerData.email ? (
                      <>
                        <View key={i}>
                          <View
                            style={{
                              paddingHorizontal: (mobileW * 3) / 100,
                              paddingVertical: (mobileH * 1) / 100,
                              backgroundColor: color.primary,
                              borderTopLeftRadius: (mobileW * 5) / 100,
                              borderTopRightRadius: (mobileW * 5) / 100,
                              borderBottomLeftRadius: (mobileW * 5) / 100,
                              width: 'auto',
                              position: 'relative',
                              alignSelf: 'flex-end',
                              marginRight: (mobileW * 7) / 100,
                              marginLeft: (mobileW * 8) / 100,
                              marginBottom: (mobileH * 1) / 100,
                              marginTop:
                                i == 0
                                  ? (mobileH * 3) / 100
                                  : (mobileH * 1) / 100,
                            }}>
                            <Text
                              style={{
                                color: color.whiteColor,
                                fontSize: (mobileW * 4) / 100,
                                fontFamily: Font.FontSemiBold,
                              }}>
                              {msg.message}
                            </Text>
                          </View>

                          <View
                            style={{
                              alignSelf: 'flex-end',
                              marginRight: (mobileW * 7) / 100,
                              // marginTop: (mobileH * 0.5) / 100,
                            }}>
                            {msg?.timeStamp?.seconds && (
                              <Text
                                style={{
                                  color: color.blackColor,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 3) / 100,
                                }}>
                                {new Date(
                                  parseInt(msg?.timeStamp?.seconds) * 1000,
                                ).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: true,
                                })}
                              </Text>
                            )}
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <View key={i}>
                          <View
                            style={{
                              paddingHorizontal: (mobileW * 3.5) / 100,
                              paddingVertical: (mobileH * 1) / 100,
                              backgroundColor: 'lightgrey',
                              borderTopLeftRadius: (mobileW * 30) / 100,
                              borderTopRightRadius: (mobileW * 30) / 100,
                              borderBottomRightRadius: (mobileW * 30) / 100,
                              width: 'auto',
                              position: 'relative',
                              alignSelf: 'flex-start',
                              marginRight: (mobileW * 7) / 100,
                              marginLeft: (mobileW * 8) / 100,
                              marginBottom: (mobileH * 1) / 100,
                              marginTop:
                                i == 0
                                  ? (mobileH * 3) / 100
                                  : (mobileH * 1) / 100,
                            }}>
                            <Text
                              style={{
                                color: color.primaryText,
                                fontSize: (mobileW * 4) / 100,
                                fontFamily: Font.FontSemiBold,
                              }}>
                              {msg.message}
                            </Text>
                          </View>
                          <View
                            style={{
                              alignSelf: 'flex-start',
                              marginLeft: (mobileW * 8) / 100,
                              //marginTop: (mobileH * 0.5) / 100,
                            }}>
                            {msg?.timeStamp?.seconds && (
                              <Text
                                style={{
                                  color: color.blackColor,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 3) / 100,
                                }}>
                                {new Date(
                                  parseInt(msg?.timeStamp?.seconds) * 1000,
                                ).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: true,
                                })}
                              </Text>
                            )}
                          </View>
                        </View>
                      </>
                    ),
                  )}
                </>
              )}
            </ScrollView>
          </>
        </KeyboardAvoidingView>

        {/* send message container */}
        <View
          style={{
            width: mobileW,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: (mobileW * 2) / 100,
            position: 'absolute',
            bottom: (mobileH * 3) / 100,
          }}>
          <View
            style={{
              backgroundColor: 'lightgrey',
              borderRadius: (mobileW * 3) / 100,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: (mobileW * 1) / 100,
              paddingHorizontal: (mobileW * 3) / 100,
              width: (mobileW * 85) / 100,
              height: (mobileH * 7) / 100,
            }}>
            <TouchableOpacity activeOpacity={0.7}>
              <Entypo name="emoji-happy" size={24} color={'#555'} />
            </TouchableOpacity>

            <TextInput
              style={{
                flex: 1,
                color: color.primaryText,
                fontSize: (mobileW * 4) / 100,
                fontFamily: Font.FontSemiBold,
                marginLeft: (mobileW * 1.5) / 100,
              }}
              placeholder="Type here..."
              placeholderTextColor={'#999'}
              value={message}
              onChangeText={text => setMessage(text)}
              autoCapitalize="none"
              returnKeyLabel="done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />

            <TouchableOpacity activeOpacity={0.7}>
              <Entypo name="mic" size={24} color={'#43C651'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={sendMessage}
            activeOpacity={0.7}
            style={{}}>
            <FontAwesome name="send" size={24} color={'#555'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* end bottom section */}
    </View>
  );
};

export default ChatScreen;
