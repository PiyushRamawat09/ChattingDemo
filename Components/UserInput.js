import {View, Text, TextInput, TouchableOpacity,Keyboard} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {mobileH, mobileW} from '../src/Utils/config';
import {Font, color} from '../src/Utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserInput = ({
  placeholder,
  isPassword,
  setStateValue,
  setGetEmailValidationStatus,
}) => {
  const [value, setValue] = useState('');
  const [showPass, setShowpass] = useState(true);
  const [icons, setIcons] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useLayoutEffect(() => {
    switch (placeholder) {
      case 'First Name':
        return setIcons('person');
      case 'Enter Email':
        return setIcons('email');
      case 'Enter Password':
        return setIcons('lock');
    }
  }, []);

  const handleTextChanged = text => {
    setValue(text);
    setStateValue(text);
    if (placeholder == 'Enter Email') {
      const emailReegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailReegex.test(value);
      console.log(status);
      setIsEmailValid(status);
      setGetEmailValidationStatus(status);
    }
  };

  return (
    <View
      style={{
        borderWidth: (mobileW * 0.2) / 100,
        borderColor:
          !isEmailValid && placeholder == 'Enter Email' && value.length > 0
            ? 'tomato'
            : color.grayColor,
        paddingHorizontal: (mobileW * 3) / 100,
        paddingVertical: (mobileH * 1) / 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (mobileW * 3) / 100,
        width: (mobileW * 90) / 100,
        marginTop: (mobileH * 2.5) / 100,
      }}>
      <MaterialIcons name={icons} size={25} color="#6c6d83" />

      <TextInput
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          color: color.primaryText,
          fontSize: (mobileW * 5) / 100,
          fontFamily: Font.FontSemiBold,
          marginLeft: (mobileW * 1) / 100,
        }}
        placeholder={placeholder}
        placeholderTextColor={color.primaryText}
        value={value}
        onChangeText={handleTextChanged}
        secureTextEntry={isPassword && showPass}
        autoCapitalize="none"
        returnKeyLabel="done"
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />

      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowpass(!showPass)}
          activeOpacity={0.7}
          style={{
            paddingHorizontal: (mobileW * 0.5) / 100,
          }}>
          <MaterialIcons
            name={`${showPass ? 'visibility' : 'visibility-off'}`}
            size={25}
            color="#6c6d83"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserInput;
