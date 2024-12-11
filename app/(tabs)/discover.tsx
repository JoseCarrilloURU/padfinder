import React, { useEffect, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  Image,
  Text,
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
import { MotiView, MotiImage, MotiText } from "moti";
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
import Header from "@/components/header";

const mockData = [
  {
    id: 1,
    name: "Andrea Pérez",
    age: 20,
    gender: "Femenino",
    courts: ["Cancha 1", "Cancha 2", "Cancha 3"],
  },
  {
    id: 2,
    name: "Álex Hernández",
    age: 20,
    gender: "Masculino",
    courts: ["Cancha 1", "Cancha 2", "Cancha 3"],
  },
  {
    id: 3,
    name: "Mario González",
    age: 25,
    gender: "Masculino",
    courts: ["Cancha 1", "Cancha 2", "Cancha 3"],
  },
  {
    id: 4,
    name: "Gabriel G(ar)ay",
    age: 21,
    gender: "Masculino",
    courts: ["Cancha 1", "Cancha 2", "Cancha 3"],
  },
  {
    id: 5,
    name: "Atlina García",
    age: 19,
    gender: "Femenino",
    courts: ["Cancha 1", "Cancha 2", "Cancha 3"],
  },
  {
    id: 6,
    name: "Andrés Sánchez",
    age: 27,
    gender: "Masculino",
    courts: ["Cancha 1", "Cancha 2", "Cancha 3"],
  },
];

export default function Discover() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = "#fff";
  const color2 = "#bcf";

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  const handleSwipeLeft = () => {
    console.log("Swipe Left Pressed");
  };
  const handleSwipeRight = () => {
    console.log("Swipe Right Pressed");
  };

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
      <Header originTab={0} />
      <AnimatedButton
        onPress={handleSwipeLeft}
        disabled={false}
        source={require("@/assets/images/app/SwipeLeft3.png")}
        style={swipestyles.swipeleft}
      />
      <AnimatedButton
        onPress={handleSwipeRight}
        disabled={false}
        source={require("@/assets/images/app/SwipeRight.png")}
        style={swipestyles.swiperight}
      />
    </View>
  );
}

const swipestyles = StyleSheet.create({
  swipeleft: {
    position: "absolute",
    top: 670,
    left: 70,
    width: 80,
    height: 80,
  },
  swiperight: {
    position: "absolute",
    top: 670,
    left: 240,
    width: 80,
    height: 80,
  },
});
