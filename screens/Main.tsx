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
const { height, width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "0f19516defde52e001b3416c1ed2e6b2";
export default function Main({ navigation }: any) {
  const [location, setLocation] = useState("Loading...");
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeahter] = useState("");
  const [temp, setTemp] = useState("");
  const [footerTab, setFooterTab] = useState("Main");
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
        console.log(data);
        const temp = data.main.temp;
        const weather = data.weather[0].description;
        setWeahter(weather);
        setTemp(temp);
      });

    setLocation([location[0].region, location[0].district].join(" "));
  };

  useEffect(() => {
    getWeather();
  }, []);
  if (footerTab == "Main") {
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
            title="Logout"
            onPress={() => {
              navigation.navigate("Splash");
            }}></Button>
        </View>
        <View>
          <Button title="Control" onPress ={() => {
            navigation.navigate("Control");
          }}></Button>
        </View>

        <View style={styles.footer}>
          <Pressable style={activeFooter} onPress={() => setFooterTab("Main")}>
            <Text style={{ color: "white" }}>Main</Text>
          </Pressable>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab("Scenario")}>
            <Text>Scenario</Text>
          </Pressable>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab("Setting")}>
            <Text>Setting</Text>
          </Pressable>
        </View>
      </>
    );
  } else if (footerTab == "Scenario") {
    return (
      <>
        <View style={styles.container}>
          <Text>{footerTab}</Text>
          <View style={styles.buttons}></View>
          <Button
            title="Logout"
            onPress={() => {
              navigation.navigate("Splash");
            }}></Button>
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab("Main")}>
            <Text>Main</Text>
          </Pressable>
          <Pressable
            style={activeFooter}
            onPress={() => setFooterTab("Scenario")}>
            <Text style={{ color: "white" }}>Scenario</Text>
          </Pressable>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab("Setting")}>
            <Text>Setting</Text>
          </Pressable>
        </View>
      </>
    );
  } else if (footerTab == "Setting") {
    return (
      <>
        <View style={styles.container}>
          <Text>{footerTab}</Text>
          <View style={styles.buttons}></View>
          <Button
            title="Logout"
            onPress={() => {
              navigation.navigate("Splash");
            }}></Button>
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab("Main")}>
            <Text>Main</Text>
          </Pressable>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab("Scenario")}>
            <Text>Scenario</Text>
          </Pressable>
          <Pressable
            style={activeFooter}
            onPress={() => setFooterTab("Setting")}>
            <Text style={{ color: "white" }}>Setting</Text>
          </Pressable>
        </View>
      </>
    );
  }
  else{
    return(<></>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 16,
  },
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
