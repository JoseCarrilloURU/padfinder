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

const MockMessages = [
  {
    id: 1,
    message: "Hola, ¿cómo estás?",
  },
  {
    id: 2,
    message: "Bien, gracias y tú?",
  },
  {
    id: 1,
    message: "También bien, ¿qué has hecho hoy?",
  },
  {
    id: 2,
    message: "He ido a correr, ¿tú?",
  },
];

export default function Chat() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = "#fff";
  const color2 = "#bcf";
  const color3 = "#fcb"; // Cambiar por rosa

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  const handleImgButton = () => {
    console.log("Image Button Pressed");
  };
  const handleSendButton = () => {
    console.log("Send Message Button Pressed");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* EN ESTA PANTALLA EL DEGRADADO VA A AZUL O ROSA POR GÉNERO, MAÑANA LO HAGO */}
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
      <AnimatedButton
        onPress={handleImgButton}
        disabled={false}
        source={require("@/assets/images/app/ImgButtonShade.png")}
        style={chatstyles.imgbutton}
      />
      <TextInput
        placeholder="Escribe un mensaje..."
        placeholderTextColor="#999"
        style={chatstyles.textinput}
        keyboardType="email-address"
        multiline={false}
        scrollEnabled={false}
        numberOfLines={1}
        maxLength={50}
      />
      <AnimatedButton
        onPress={handleImgButton}
        disabled={false}
        source={require("@/assets/images/app/SendButtonShade.png")}
        style={chatstyles.sendbutton}
      />
    </View>
  );
}

const chatstyles = StyleSheet.create({
  imgbutton: {
    position: "absolute",
    top: 745,
    left: 8,
    width: 70,
    height: 70,
  },
  sendbutton: {
    position: "absolute",
    top: 745,
    left: 315,
    width: 70,
    height: 70,
  },
  textinput: {
    position: "absolute",
    fontFamily: "BoldFont",
    fontSize: 17,
    bottom: 20,
    left: 85,
    width: 220,
    height: "auto",
    zIndex: 5,
    lineHeight: 30,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "white",
    boxShadow: "2 2 12px rgba(0,0,0,0.2)",
  },
  textinputcontainer: {
    position: "absolute",
    width: 300,
    height: 50,
    top: 500,
    left: 16,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: "transparent",
    backgroundColor: "white",
    boxShadow: "2 2 15px rgba(0,0,0,0.5)",
  },
});
