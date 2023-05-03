import { Text, TextInput, View, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import React, { useState } from "react";

export default function Login({ navigation }: any) {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const onPressLogin = () => {
    if (!userID || !userPW) {
      Alert.alert("아이디와 비밀번호를 입력해주세요");
    } else {
      navigation.navigate("Main");
      setUserID("");
      setUserPW("");
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.logo}>AWC</Text>
        <TextInput
          style={styles.inputs}
          placeholder="아이디"
          value={userID}
          onChangeText={(userID) => setUserID(userID)}
          returnKeyType="next"></TextInput>
        <TextInput
          style={styles.inputs}
          placeholder="비밀번호"
          value={userPW}
          secureTextEntry
          onChangeText={(userPW) => setUserPW(userPW)}
          returnKeyType="next"></TextInput>
        <View style={styles.buttons}>
          <Button title="로그인" onPress={onPressLogin}></Button>
          <Button
            title="회원가입"
            onPress={() => navigation.navigate("Register")}></Button>
        </View>
      </View>
    </>
  );
}
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
