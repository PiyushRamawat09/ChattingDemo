import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { GoogleSignin, statusCodes} from 'react-native-google-signin';
import {Alert} from 'react-native';
import { webClientId } from '../../Config/utils';

export class SocialLoginProvider extends Component {
    constructor(props) {
      super(props)

      GoogleSignin.configure({
        webClientId: webClientId,
      });
    }
    
    GoogleLogin = async navigation => {
        //Prompts a modal to let the user sign in into your application.
    
        try {
          await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
          });
          const userInfo = await GoogleSignin.signIn();
          console.log('User Info --> ', userInfo);
          var result = {
            social_name: userInfo.user.name,
            social_first_name: userInfo.user.givenName,
            social_last_name: userInfo.user.familyName,
            social_email: userInfo.user.email,
            social_image: userInfo.user.photo,
            social_type: 'google',
            logintype: 'google',
            social_id: userInfo.user.id,
          };
          // alert(JSON.stringify(result));
        //   this.callsocailweb(result, navigation);
        } catch (error) {
          // alert('Message'+error.message)
          console.log('Message', error.message);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing In');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services Not Available or Outdated');
          } else {
            console.log('Some Other Error Happened');
          }
        }
      };
}
 export const SocialLogin = new  SocialLoginProvider();
