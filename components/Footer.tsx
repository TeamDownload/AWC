import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
const Footer = ({ Screen }: any, { navigation }: any) => {
  if (Screen == "Main") {
    return (
      <View style={styles.footer}>
        <Pressable style={activeFooter}>
          <Text style={{ color: "white" }}>Main</Text>
        </Pressable>
        <Pressable
          style={styles.footerTab}
          onPress={() => navigation.navigate("Scenario")}>
          <Text>Scenario</Text>
        </Pressable>
        <Pressable
          style={styles.footerTab}
          onPress={() => navigation.navigate("Setting")}>
          <Text>Setting</Text>
        </Pressable>
      </View>
    );
  } else if (Screen == "Scenario") {
    return (
      <View style={styles.footer}>
        <Pressable
          style={styles.footerTab}
          onPress={() => navigation.navigate("Main")}>
          <Text>Main</Text>
        </Pressable>
        <Pressable style={activeFooter}>
          <Text style={{ color: "white" }}>Scenario</Text>
        </Pressable>
        <Pressable
          style={styles.footerTab}
          onPress={() => navigation.navigate("Setting")}>
          <Text>Setting</Text>
        </Pressable>
      </View>
    );
  } else if (Screen == "Setting") {
    <View style={styles.footer}>
      <Pressable
        style={styles.footerTab}
        onPress={() => navigation.navigate("Main")}>
        <Text>Main</Text>
      </Pressable>
      <Pressable
        style={styles.footerTab}
        onPress={() => navigation.navigate("Scenario")}>
        <Text>Scenario</Text>
      </Pressable>
      <Pressable style={activeFooter}>
        <Text style={{ color: "white" }}>Setting</Text>
      </Pressable>
    </View>;
  }

  return <Text>Error</Text>;
};
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
});
const activeFooter = StyleSheet.flatten([styles.footerTab, styles.active]);
export default Footer;
