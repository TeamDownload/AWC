/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';

const Clouds = '../assets/ico/clouds.png';
const ClearSky = '../assets/ico/ClearSky.png';
const rain = '../assets/ico/rain.png';
const mist = '../assets/ico/mist.png';
const overcastClouds = '../assets/ico/overcastcloud.png';
interface data {
  weather: string;
}
const Weather = ({weather}: data) => {
  if (weather === 'Clear') {
    return <Image style={styles.Icons} source={require(ClearSky)} />;
  } else if (weather === 'Clouds') {
    return <Image style={styles.Icons} source={require(overcastClouds)} />;
  } else if (weather === 'Mist') {
    return <Image style={styles.Icons} source={require(mist)} />;
  } else if (weather === 'scattered clouds') {
    return <Image style={styles.Icons} source={require(Clouds)} />;
  }
  return <Text>{weather}</Text>;
};

const styles = StyleSheet.create({
  Icons: {
    height: 64,
    width: 64,
  },
});
export default Weather;
