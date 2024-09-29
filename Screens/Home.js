import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Font, color} from '../src/Utils/Colors';
import {mobileH, mobileW} from '../src/Utils/config';
import {Logo, userplaceholder} from '../assets';
import {Langch} from '../src/Utils/Lang_provider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {fireStoreDB} from '../Config/firebase.config';

import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import { appID, appSign } from '../Config/utils';

const Home = () => {
  const user = useSelector(state => state.user?.user);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);

  const navigation = useNavigation();

  // useEffect(() => {
  //   console.log('user pic', user.profilePic);
  // }, []);

  useLayoutEffect(() => {
    initService();
    console.log('user pic', user.profilePic);
    const chatQuery = query(
      collection(fireStoreDB, 'chats'),
      orderBy('id', 'desc'),
    );
    console.log('ChatQuery', chatQuery);
    const unsubscribe = onSnapshot(chatQuery, querySnapshot => {
      const chatrooms = querySnapshot.docs.map(doc => doc.data());
      setChats(chatrooms);
      setIsLoading(false);
    });

    console.log("chatrooms", chats);
    console.log("user", user);
    // return the unsubscribe function to stop listening to the updates

    return unsubscribe;
  }, []);

  const initService =  () => {
    return ZegoUIKitPrebuiltCallService.init(
      appID, 
      appSign, 
      user._id,
      user.fullName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'calling.mp3',
          outgoingCallFileName: 'calling.mp3',
        },
        androidNotificationConfig: {
          channelID: "Zego_video_call",
          channelName: "Zego_video_call",
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        requireConfig : data => {
          return {
            onHangUp : duration => {
              navigation.navigate('Home')
            }
          }
        }
      });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.whiteColor,
      }}>
      <View
        style={{
          width: mobileW,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: (mobileW * 5) / 100,
          paddingTop: (mobileH * 3) / 100,
          paddingBottom: (mobileH * 1.5) / 100,
        }}>
        <Image
          source={Logo}
          style={{
            width: (mobileW * 12) / 100,
            height: (mobileW * 12) / 100,
          }}
          resizeMode="cover"></Image>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            height: (mobileW * 14) / 100,
            width: (mobileW * 14) / 100,
            padding: (mobileW * 1) / 100,
            borderRadius: (mobileW * 30) / 100,
            borderColor: color.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: (mobileW * 0.2) / 100,
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

      {/* Scrolling Area */}

      <ScrollView
        style={{
          width: mobileW,
        }}>
        <View
          style={{
            width: mobileW,
            paddingHorizontal: (mobileW * 5) / 100,
          }}>
          {/* message title */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: color.primaryText,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4.5) / 100,
              }}>
              {Langch.messages}
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AddtoChatScreen')}>
              <Ionicons name="chatbox" color="#555" size={28} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Loader */}

        {isLoading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: (mobileH * 1) / 100,
            }}>
            <ActivityIndicator size={'large'} color={'#43C651'} />
          </View>
        ) : (
          <View
            style={{
              paddingBottom: (mobileH * 5) / 100,
            }}>
            {chats && chats.length > 0 ? (
              chats?.map(rooms => <MessageCard key={rooms.id} room={rooms} />)
            ) : (
            <View style = {{
              flex : 1,
              justifyContent :'center',
              alignItems : 'center' 
            }}>
                <Text
                  style={{
                    color: color.primaryText,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 5) / 100,
                  }}>
                  {Langch.nochatrooms}
                </Text>
                </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const MessageCard = ({room}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatScreen', {
          room: room,
        })
      }
      activeOpacity={0.7}
      style={{
        width: mobileW,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: (mobileW * 5) / 100,
        marginTop: (mobileH * 1.5) / 100,
      }}>
      {/* Image */}

      <View
        style={{
          height: (mobileW * 14) / 100,
          width: (mobileW * 14) / 100,
          borderRadius: (mobileW * 30) / 100,
          borderColor: color.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: (mobileW * 0.2) / 100,
        }}>
        <FontAwesome5 name="users" size={25} color={'#555'} />
      </View>

      {/* content */}

      <View
        style={{
          marginLeft: (mobileW * 3) / 100,
          width: (mobileW * 62) / 100,
        }}>
        <Text
          style={{
            color: color.primaryText,
            fontSize: (mobileW * 4) / 100,
            fontFamily: Font.FontSemiBold,
          }}>
          {room.chatName}
        </Text>

        {/* <Text
          style={{
            color: color.primaryText,
            fontSize: (mobileW * 3) / 100,
            fontFamily: Font.FontMedium,
            lineHeight: (mobileH * 2) / 100,
          }}>
          Lorem ipsum dolor sit amet consec tetur adip isicing icing elit...
        </Text> */}
      </View>

      {/* Time text */}

      <Text
        style={{
          color: color.primary,
          fontSize: (mobileW * 3) / 100,
          fontFamily: Font.FontSemiBold,
        }}>
        27 min
      </Text>
    </TouchableOpacity>
  );
};

export default Home;
