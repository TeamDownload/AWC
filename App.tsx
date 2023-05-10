import { createStackNavigator } from "@react-navigation/stack";
import Main from "./screens/Main";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Splash from "./screens/Splash";
import Scenario from "./screens/Scenario";
import Setting from "./screens/Setting";
import Footer from "./components/Footer";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen
            name="Scenario"
            component={Scenario}
            options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Footer" component={Footer}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
