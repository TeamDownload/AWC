import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import Weather from "../components/Weahter";
import Footer from "../components/Footer";
const { height, width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "0f19516defde52e001b3416c1ed2e6b2";
export default function Main({ navigation }: any) {
  const [location, setLocation] = useState("Loading...");
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeahter] = useState("");
  const [temp, setTemp] = useState("");
  const getWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const {
      coords: { longitude, latitude },
    } = await Location.getCurrentPositionAsync({});
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temp = data.main.temp;
        const weather = data.weather[0].description;
        setWeahter(weather);
        setTemp(temp);
      });

    setLocation([location[0].region, location[0].district].join(" "));
  };

  const pressOpen = () => {};
  const pressClose = () => {};
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{location}</Text>
          <View style={styles.weather}>
            <Text style={styles.temp}>{temp}˚C</Text>
            <Weather weather={weather}></Weather>
          </View>
        </View>
        <View style={styles.buttons}></View>
        <Button
          title="HI"
          onPress={() => {
            navigation.navigate("Splash");
          }}></Button>
        <Footer Screen="Main"></Footer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: "row",
  },
  footerTab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "gray",
  },
  container: {
    flex: 1,
  },
  city: {
    flex: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "500",
  },
  weather: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    fontSize: 40,
  },
  description: {
    fontSize: 30,
  },
  buttons: {
    flex: 1,
    gap: 10,
  },
});
const activeFooter = StyleSheet.flatten([styles.footerTab, styles.active]);
