/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, Alert} from 'react-native';
import Button from '../components/Button';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import {NetworkInfo} from 'react-native-network-info';

const AddDevice = ({navigation: {navigate}}) => {
  const [currentWifi, setCurrentWifi] = useState('Tenda_33C350');
  const [isconnected, setIsconnected] = useState(false);
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
        setIsconnected(true);
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
    <View style={styles.container}>
      <View style={styles.header}>
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
                  if (peripheralsArray !== null) {
                    setDevices(peripheralsArray);
                  }

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
      </View>
      <View style={styles.deviceButton}>
        {devices ? (
          devices.map(data => (
            <Button
              key={data.id}
              title={data.advertising.localName}
              onPress={() => {
                connectBlueTooth(data.id);
                navigate('기기설정', {
                  id: data.id,
                  name: data.name,
                  isconnected: isconnected,
                  wifi: currentWifi,
                });
              }}
            />
          ))
        ) : (
          <Text>No Device</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  deviceButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 10,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  container: {
    flex: 1,
  },
});
export default AddDevice;
