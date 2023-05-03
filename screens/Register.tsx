import { Text, TextInput, View, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import React, { useState, useRef, useEffect } from "react";
const Register = ({ navigation }: any) => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const onPressRegistser = () => {
    if (!userID || !userPW || !confirmPW || !userEmail) {
      Alert.alert("모든 입력란에 입력해주세요");
    } else {
      navigation.navigate("Main");
    }
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="아이디"
          onChangeText={(userID) => setUserID(userID)}
          returnKeyType="next"></TextInput>
        <TextInput
          autoComplete="email"
          style={styles.inputs}
          placeholder="비밀번호"
          secureTextEntry
          onChangeText={(userPW) => setUserPW(userPW)}
          returnKeyType="next"></TextInput>
        <TextInput
          style={styles.inputs}
          placeholder="비밀번호 확인"
          secureTextEntry
          onChangeText={(confirmPW) => setConfirmPW(confirmPW)}
          returnKeyType="next"></TextInput>
        <TextInput
          style={styles.inputs}
          placeholder="이메일"
          onChangeText={(userEmail) => setUserEmail(userEmail)}
          returnKeyType="next"></TextInput>
        <View style={styles.buttons}>
          <Button title="회원가입" onPress={onPressRegistser}></Button>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  container: {
    justifyContent: "center",
    height: "100%",
  },
  inputs: {
    padding: 10,
    fontSize: 18,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
  },
  logo: {
    fontSize: 64,
    textAlign: "center",
  },
});

export default Register;
