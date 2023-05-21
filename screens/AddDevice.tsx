/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import BleManager from 'react-native-ble-manager';
import Button from '../components/Button';

const AddDevice = () => {
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
  useEffect(() => {
    getBluetoothInfo();
  }, []);

  return (
    <View>
      {ableBlueTooth ? (
        <Button
          title="addDevice"
          onPress={() => {
            BleManager.start({showAlert: false}).then(() =>
              console.log('BlueTooth initialized'),
            );
            BleManager.scan([], 5, true);
            BleManager.enableBluetooth()
              .then(response => console.log(response))
              .then(data => console.log(data));
            BleManager.getConnectedPeripherals([]).then(results => {
              if (results.length === 0) {
                console.log('No connected bluetooth devices');
              } else {
                for (let i = 0; i < results.length; i++) {
                  console.log(results[i]);
                }
              }
            });
          }}
        />
      ) : (
        <Text>Unable connect BlueTooth</Text>
      )}
    </View>
  );
};

export default AddDevice;
