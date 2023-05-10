import React from "react";
import { Image, StyleSheet, Text } from "react-native";

const Clouds = "../assets/ico/clouds.png";
const ClearSky = "../assets/ico/ClearSky.png";
const rain = "../assets/ico/rain.png";
const Cloudy = "../assets/ico/overcastcloud.png";
interface data {
  weather: string;
}
const Weather = ({ weather }: data) => {
  if (weather == "clear sky")
    return <Image style={styles.Icons} source={require(ClearSky)}></Image>;
  return <Text>{weather}</Text>;
};

const styles = StyleSheet.create({
  Icons: {
    height: 48,
    width: 48,
  },
});
export default Weather;
