import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Button from "../components/Button";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
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
        </View>
        <View style={styles.buttons}>
          <Button onPress={pressOpen} title="Open"></Button>
          <Button onPress={pressClose} title="Close"></Button>
          <Button
            title="go to Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}>
          <View style={styles.day}>
            <Text></Text>
            <Text style={styles.temp}>{temp}˚C</Text>
            <Text style={styles.description}>{weather}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    fontSize: 60,
    marginTop: 50,
  },
  description: {
    fontSize: 30,
  },
  buttons: {
    gap: 10,
  },
});
