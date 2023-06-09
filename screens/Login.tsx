/* eslint-disable prettier/prettier */
import {TextInput, View, StyleSheet, Alert, Image, Text} from 'react-native';
import Button from '../components/Button';
import React, {useState, useRef} from 'react';
import Main from './Main';
const LoginLogo = '../assets/LoginLogo.png';
const MainColor = 'rgb(120,163,232)';
export default function Login({navigation}: any) {
  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');
  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);

  const onFocusNext = (index: number) => {
    if (ref_input[index + 1] && index < ref_input.length - 1) {
      ref_input[index + 1].current?.focus();
    } else if (ref_input[index + 1] && index === ref_input.length - 1) {
      ref_input[index].current?.blur();
    }
  };

  const onPressLogin = () => {
    if (!userID || !userPW) {
      Alert.alert('아이디와 비밀번호를 입력해주세요');
    } else {
      navigation.navigate('Main');
      setUserID('');
      setUserPW('');
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.Icons} source={require(LoginLogo)} />
        <TextInput
          style={styles.inputs}
          placeholderTextColor={MainColor}
          placeholder="ID"
          ref={ref_input[0]}
          onSubmitEditing={() => onFocusNext(0)}
          value={userID}
          onChangeText={valueID => setUserID(valueID)}
          returnKeyType="next"
        />
        <TextInput
          style={styles.inputs}
          placeholder="PW"
          placeholderTextColor={MainColor}
          ref={ref_input[1]}
          onSubmitEditing={() => onFocusNext(1)}
          value={userPW}
          secureTextEntry
          onChangeText={valuePW => setUserPW(valuePW)}
          returnKeyType="next"
        />
        <View style={styles.buttons}>
          <Button title="Login" onPress={onPressLogin} />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  container: {
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputs: {
    padding: 10,
    width: '90%',
    fontSize: 18,
    margin: 10,
    color: 'black',
    borderBottomWidth: 1,
  },
  Icons: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
