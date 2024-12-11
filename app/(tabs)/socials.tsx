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

interface Partner {
  id: number;
  name: string;
  age: number;
  gender: string;
  lastMessage: string;
}

const mockData = [
  {
    id: 1,
    name: "Andrea Pérez",
    age: 20,
    gender: "Femenino",
    lastMessage: "pipipipi",
  },
  {
    id: 2,
    name: "Álex Hernández",
    age: 20,
    gender: "Masculino",
    lastMessage: "Me dijo que no era pelirroja",
  },
  {
    id: 4,
    name: "Gabriel G(ar)ay",
    age: 21,
    gender: "Masculino",
    lastMessage: "English or Spanish",
  },
  {
    id: 5,
    name: "Atlina García",
    age: 19,
    gender: "Femenino",
    lastMessage: "No spoileen Arcane",
  },
  {
    id: 6,
    name: "Andrés Sánchez",
    age: 27,
    gender: "Masculino",
    lastMessage: "Qué buena estuvo la cerveza",
  },
  {
    id: 3,
    name: "Mario González",
    age: 25,
    gender: "Masculino",
    lastMessage: "El diseño está espartano",
  },
];

export default function Socials() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = "#fff";
  const color2 = "#cfb";

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  const handleChatPress = () => {
    console.log("Chat Pressed");
    router.push("/chat");
  };

  const Partner: React.FC<Partner> = ({
    id,
    name,
    age,
    gender,
    lastMessage,
  }) => (
    <View style={socialstyles.itemContainer}>
      <Pressable onPress={handleChatPress}>
        <BlurView
          intensity={95}
          tint="prominent"
          style={socialstyles.blurcard}
        />
        <Image source={backdropImageMap[id]} style={socialstyles.itemimage} />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={socialstyles.itemdata}
        >
          {name}, {age}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={socialstyles.itemmessage}
        >
          {lastMessage}
        </Text>
      </Pressable>
    </View>
  );

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("@/assets/images/app/chattitle.png")}
          style={socialstyles.chattitle}
        />
        <View style={socialstyles.listcontainer}>
          <FlatList
            data={mockData}
            renderItem={({ item }) => (
              <Partner
                id={item.id}
                name={item.name}
                age={item.age}
                gender={item.gender}
                lastMessage={item.lastMessage}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const socialstyles = StyleSheet.create({
  chattitle: {
    position: "relative",
    top: 117,
    left: 20,
    width: 200,
    height: 35,
  },
  itemdata: {
    position: "absolute",
    fontFamily: "BlackFont",
    textShadowRadius: 2,
    fontSize: 20,
    top: 20,
    left: 108,
    width: 240,
  },
  itemmessage: {
    position: "absolute",
    fontFamily: "BaseItalic",
    color: "#222",
    fontSize: 15,
    top: 52,
    left: 108,
    width: 240,
  },
  itemimage: {
    position: "absolute",
    width: 75,
    height: 75,
    top: 9.5,
    left: 15,
    borderRadius: 40,
    borderColor: "#fff",
    borderWidth: 2,
    boxShadow: "3 3 12px rgba(0,0,0,0.3)",
  },
  blurcard: {
    width: 360,
    left: 4,
    height: 95,
    borderRadius: 30,
    overflow: "hidden",
    boxShadow: "2 2 15px rgba(0,0,0,0.3)",
  },
  itemContainer: {
    width: 400,
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 12,
  },
  listcontainer: {
    marginTop: 120,
    height: "auto",
    marginBottom: 75,
  },
});
