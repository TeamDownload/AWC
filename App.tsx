import { createStackNavigator } from "@react-navigation/stack";
import Main from "./screens/Main";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Text, Button } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: "",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
