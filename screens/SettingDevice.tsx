import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

import Button from '../components/Button';
import WindowButtons from '../components/WindowButtons';
const livingRoom = require('../assets/ico/livingRoom.png');
const kitchen = require('../assets/ico/kitchen.png');
const window = require('../assets/ico/window.png');
const bathroom = require('../assets/ico/bathroom.png');

const SettingDevice = ({route, navigation}: any) => {
  const {id, name, isConnected, wifi} = route.params;
  console.log(route.params);
  const windowData = [
    {
      key: 1,
      title: '',
      img: livingRoom,
    },
    {
      key: 2,
      title: '',
      img: kitchen,
    },
    {
      key: 3,
      title: '',
      img: window,
    },
    {
      key: 4,
      title: '',
      img: bathroom,
    },
  ];
  const [newName, setNewName] = useState(name);
  const [newWifi, setNewWifi] = useState(wifi);
  const [wifiPW, setWifiPW] = useState('');
  const [currentState, setCurrentState] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.Texts}>
        <View style={styles.settingOption}>
          <Text style={styles.title}>기기 이름</Text>
          <TextInput
            placeholderTextColor={'black'}
            style={styles.content}
            placeholder={name}
            onChangeText={data => setNewName(data)}
          />
        </View>
        <View style={styles.settingOption}>
          <Text style={styles.title}>기기 ID</Text>
          <Text style={styles.content}>{id}</Text>
        </View>
        <View style={styles.settingOption}>
          <Text style={styles.title}>연결성공여부</Text>
          <Text style={styles.content}>{isConnected ? '성공' : '실패'}</Text>
        </View>
        <View style={styles.settingOption}>
          <Text style={styles.title}>연결할 WIFI SSID</Text>
          <TextInput
            placeholderTextColor={'black'}
            style={styles.content}
            placeholder={wifi}
            onChangeText={data => setNewWifi(data)}
          />
        </View>
        <View style={styles.settingOption}>
          <Text style={styles.title}>연결할 WIFI 비밀번호</Text>
          <TextInput
            placeholderTextColor={'black'}
            style={styles.content}
            placeholder={wifiPW}
            onChangeText={data => setNewWifi(data)}
          />
        </View>
        <View style={styles.settingOption}>
          <Text style={styles.title}>설정할 이미지</Text>
          <View style={styles.buttons}>
            {windowData.map(data => (
              <WindowButtons
                state={data.key}
                title={data.title}
                img={data.img}
                currentState={currentState}
                onPress={() => {
                  setCurrentState(data.key);
                }}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          title="설정완료"
          onPress={() => {
            navigation.navigate('Main', {
              name: newName,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Texts: {
    flex: 9,
  },
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
  settingOption: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {fontSize: 18, color: 'black'},
  content: {fontSize: 18, color: 'black'},
  buttons: {
    flexDirection: 'row',
    gap: 20,
  },
});
export default SettingDevice;
