import React, {Component, useState} from 'react';
import {
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {color, Font} from '../src/Utils/Colors';
import {Langch} from '../src/Utils/Lang_provider';
import {BlurView} from '@react-native-community/blur';
import {mobileH, mobileW} from '../src/Utils/config';

const screenWidth = Math.round(Dimensions.get('window').width);

const CameraGallery = ({mediamodal, Camerapopen, Galleryopen, Canclemedia}) => {
  const [modalVisible, setModalVisible] = useState(mediamodal);
  return (
    <BlurView
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
        width: mobileW,
        height: mobileH,
      }}
      blurType="light"
      blurAmount={40}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={mediamodal}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            width: screenWidth,
          }}>
          <View style={{alignSelf: 'center', width: '100%'}}>
            <TouchableOpacity
              style={{
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.9}
              onPress={() => {
                Camerapopen();
              }}>
              <View
                style={{
                  width: '94%',
                  backgroundColor: color.whiteColor,
                  borderRadius: 30,
                  paddingVertical: (screenWidth * 3.5) / 100,
                  elevation : 10
                }}>
                <Text
                  style={{
                    fontFamily: Font.FontSemiBold,
                    textAlign: 'center',
                    fontSize: (screenWidth * 4) / 100,
                    color: color.primaryText,
                  }}>
                  {Langch.MediaCamera}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                Galleryopen();
              }}>
              <View
                style={{
                  width: '94%',
                  backgroundColor: color.whiteColor,
                  borderRadius: 30,
                  paddingVertical: (screenWidth * 3.5) / 100,
                  elevation : 10
                }}>
                <Text
                  style={{
                    fontFamily: Font.FontSemiBold,
                    textAlign: 'center',
                    fontSize: (screenWidth * 4) / 100,
                    color: color.primaryText,
                  }}>
                  {Langch.Mediagallery}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
              alignSelf: 'center',
              borderRadius: 30,
              backgroundColor: color.primary,
              width: '94%',
              justifyContent: 'center',
              alignItems: 'center',
              elevation : 10
            }}>
            <TouchableOpacity
              onPress={() => {
                Canclemedia();
              }}
              style={{
                alignSelf: 'center',
                width: '94%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: (screenWidth * 3.5) / 100,
              }}>
              <Text
                style={{
                  fontFamily: Font.FontSemiBold,
                  fontSize: (screenWidth * 4) / 100,
                  color: color.whiteColor,
                }}>
                {Langch.cancelmedia}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BlurView>
  );
};

export default CameraGallery;
