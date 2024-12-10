import React, { useEffect, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  Canvas,
  Rect,
  RoundedRect,
  LinearGradient,
  RadialGradient,
  vec,
} from "@shopify/react-native-skia";
import IconsBG from "@/components/iconsBG";
import { MotiView, MotiImage, MotiText, ScrollView } from "moti";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { router, SplashScreen } from "expo-router";
import FooterWaves from "@/components/footerWaves";
import AnimatedButton from "@/components/AnimatedButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "@/components/soundUtils";
import { BlurView } from "expo-blur";
import { backdropImageMap } from "@/components/imageMaps";
import Header from "@/components/header";

const MockUser = {
  id: 3,
  name: "Mario González",
  username: "mario.gonzalez",
  email: "mariomail@gmail.com",
  age: 25,
  gender: "Masculino",
  courts: ["Cancha 1", "Cancha 2", "Cancha 3"],
};

export default function Profile() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = "cyan";
  const color2 = "blue";

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          width: width,
          height: appHeight,
        }}
      >
        <Rect x={0} y={0} width={width} height={appHeight}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, appHeight)}
            colors={colors}
          />
        </Rect>
      </Canvas>
      <View style={{ position: "absolute", top: 120 }}>
        <IconsBG />
      </View>
      <Header />
      <BlurView intensity={60} tint="light" style={profilestyles.blurcard} />
    </View>
  );
}

const profilestyles = StyleSheet.create({
  blurcard: {
    position: "absolute",
    width: 340,
    height: 380,
    top: 140,
    left: 25,
    borderRadius: 50,
    overflow: "hidden",
    boxShadow: "4 4 12px rgba(0,0,0,0.2)",
  },
});
