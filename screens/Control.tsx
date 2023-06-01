/* eslint-disable prettier/prettier */
import React from 'react';
import Button from '../components/Button';
import {Text, View, StyleSheet} from 'react-native';
import {getData, postData} from '../api/api';
const clickCloseButton = () => {
  postData();
};
const clickOpenButton = () => {
  getData();
};

const Control = () => {
  return (
    <View style={styles.container}>
      <Text>dd</Text>
      <Button title="Open" onPress={clickOpenButton} />
      <Button title="Close" onPress={clickCloseButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Control;
