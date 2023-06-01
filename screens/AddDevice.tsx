/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import Button from '../components/Button';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import {NetworkInfo} from 'react-native-network-info';
import AsyncStorage from '@react-native-community/async-storage';

const AddDevice = () => {
  const [writeData, setWriteData] = useState(Buffer.from('test'));
  const [currentWifi, setCurrentWifi] = useState('');
  const [devices, setDevices] = useState([
    {
      advertising: {
        isConnectable: true,
        localName: 'ESP32',
        manufacturerData: {
          CDVType: 'ArrayBuffer',
          bytes: [Array],
          data: 'AgEGBglFU1AzMgIKCREHS5Exw8nFzI+eRbUfAcKvTwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
        },
        serviceData: {},
        serviceUUIDs: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'],
        txPowerLevel: 9,
      },
      id: '68:67:25:EC:07:F2',
      name: 'ESP32',
      rssi: -47,
    },
  ]);
  const [ableBlueTooth, setAbleBlueTooth] = useState(false);
  const getBluetoothInfo = async () => {
    await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is Granted');
          setAbleBlueTooth(true);
      }
    });
  };

  const scanBlueTooth = async () => {
    await BleManager.start();
    await BleManager.scan([], 5, true, {})
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };
  const connectBlueTooth = (UID: string) => {
    console.log(UID);
    BleManager.connect(UID)
      .then(() => {
        console.log('Connected');
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };
  const getWifiInfo = async () => {
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(data =>
      console.log('WIFI', data),
    );
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is Granted');
            // Get SSID
            NetworkInfo.getSSID().then(ssid => setCurrentWifi(ssid));
            console.log(currentWifi);
        }
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getBluetoothInfo();
    scanBlueTooth();
    getWifiInfo();
  }, []);

  return (
    <View>
      {ableBlueTooth ? (
        <Button
          title="SearchDevice"
          onPress={() => {
            scanBlueTooth();
            BleManager.getDiscoveredPeripherals()
              .then(peripheralsArray => {
                // Success code
                console.log(
                  'Discovered peripherals: ' + peripheralsArray.length,
                );
                setDevices(peripheralsArray);
                console.log(peripheralsArray);
              })
              .catch(error => {
                console.log(error);
              });
          }}
        />
      ) : (
        <Text>Unable connect BlueTooth</Text>
      )}
      <View style={styles.deviceButton}>
        {devices ? (
          devices.map(data => (
            <Button
              key={data.id}
              title={data.advertising.localName}
              onPress={() => {
                console.log(data);
                connectBlueTooth(data.id);
              }}
            />
          ))
        ) : (
          <Button title="No Device" onPress={() => {}} />
        )}
        <Button
          title="기기정보보내기 (테스트)"
          onPress={() => {
            setWriteData(Buffer.from(currentWifi));
            console.log(writeData.toJSON().data);
            BleManager.write(
              '68:67:25:EC:07:F2',
              '6E400001-B5A3-F393-E0A9-E50E24DCCA9E',
              '6E400002-B5A3-F393-E0A9-E50E24DCCA9E',
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
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  deviceButton: {
    flexDirection: 'column',
  },
});
export default AddDevice;
