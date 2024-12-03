import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
