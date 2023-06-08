/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import Button from '../components/Button';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import {getData, postData} from '../api/api';
import {Buffer} from 'buffer';
import BleManager from 'react-native-ble-manager';

const openIMG = '../assets/open.png';
const closeIMG = '../assets/close.png';
const tempData = [];
const Control = ({navigation, route}) => {
  const title = route.params.name;
  navigation.setOptions({title: title});
  const [bleID, setBLEID] = useState('68:67:25:EC:07:F2');
  const [serviceID, setServiceID] = useState(
    '6E400001-B5A3-F393-E0A9-E50E24DCCA9E',
  );
  const [characterID, setCharacterID] = useState(
    '6E400002-B5A3-F393-E0A9-E50E24DCCA9E',
  );
  const [writeData, setWriteData] = useState(Buffer.from('test'));
  const sendData = (method: string) => {
    setWriteData(Buffer.from(method));
    console.log(writeData.toJSON().data);
    BleManager.write(
      bleID,
      serviceID,
      characterID,
      // encode & extract raw `number[]`.
      // Each number should be in the 0-255 range as it is converted from a valid byte.
      writeData.toJSON().data,
    )
      .then(() => {
        // Success code
        console.log('Write: ' + writeData);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

  const [logUse, setLogUse] = useState(0);
  const clickCloseButton = () => {
    let time = new Date();
    tempData.push({
      key: tempData.length + 1,
      time: time.toString(),
      method: 'close',
    });
    setLogUse(logUse + 1);
    sendData('close');
    console.log('close');
  };
  const clickOpenButton = () => {
    let time = new Date();
    tempData.push({
      key: tempData.length + 1,
      time: time.toString(),
      method: 'open',
    });
    sendData('open');
    setLogUse(logUse + 1);
    console.log('open');
    console.log(tempData);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Pressable onPress={clickOpenButton}>
            <Image style={styles.Icons} source={require(openIMG)} />
          </Pressable>
          <Button title="열기" onPress={clickOpenButton} />
        </View>
        <View style={styles.button}>
          <Pressable onPress={clickCloseButton}>
            <Image style={styles.Icons} source={require(closeIMG)} />
          </Pressable>
          <Button title="닫기" onPress={clickCloseButton} />
        </View>
      </View>
      <View style={styles.logContainer}>
        <Text style={styles.viewTitle}>LOG</Text>
        {tempData ? (
          tempData.map(data => (
            <Text style={styles.log} key={data.key}>
              {data.time} / {data.method}
            </Text>
          ))
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
  Icons: {
    height: 128,
    width: 128,
  },
  buttons: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    alignItems: 'center',
  },
  logContainer: {
    flex: 3,
    alignItems: 'center',
  },
  log: {
    color: 'black',
  },
  viewTitle: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
});
export default Control;
