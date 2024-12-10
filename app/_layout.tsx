import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { Platform, View, Image, StyleSheet, StatusBar } from "react-native";
import { useTransition } from "@/components/useTransition";
import * as Font from "expo-font";
import useDisableBackButton from "@/components/useDisableBackButton";
import { MotiView } from "moti";
import { playSound } from "../components/soundUtils";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const isTransitioning = useTransition();

  if (Platform.OS === "android") {
    useDisableBackButton();
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      TitleFont: require("@/assets/fonts/FugazOne-Regular.ttf"),
      BaseFont: require("@/assets/fonts/CreatoDisplay-Bold.otf"),
      BaseItalic: require("@/assets/fonts/CreatoDisplay-BoldItalic.otf"),
      BoldFont: require("@/assets/fonts/CreatoDisplay-ExtraBold.otf"),
      BlackFont: require("@/assets/fonts/CreatoDisplay-BlackItalic.otf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    // const loadMusic = async () => {
    //   await playSound(require("@/assets/sound/Music.mp3"), {
    //     isLooping: true,
    //     volume: 0.4,
    //   });
    // };
    // setTimeout(() => {
    //   loadMusic();
    // }, 300);

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <MotiView
        from={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ type: "timing", duration: 1000, delay: 800 }}
        pointerEvents="none"
        style={{
          backgroundColor: "white",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 80,
        }}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="chat" />
      </Stack>
    </View>
  );
}
