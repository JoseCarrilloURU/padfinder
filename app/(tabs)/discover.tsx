import React, { useEffect, useState, useRef } from "react";
import {
  Pressable,
  TextInput,
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  requireNativeComponent,
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
import { MotiView, MotiImage, useAnimationState } from "moti";
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
import { backdropImageMap } from "@/components/imageMaps";

interface Swiper {
  id: number;
  name: string;
  age: number;
  gender: string;
  username: string;
  exp: string;
}

const mockData = [
  {
    id: 1,
    name: "Andrea Pérez",
    age: 20,
    gender: "Femenino",
    username: "andrea.perez",
    exp: "Principiante (0 a 6 meses)",
  },
  {
    id: 2,
    name: "Álex Hernández",
    age: 20,
    gender: "Masculino",
    username: "elpecuca",
    exp: "Intermedio (7 a 11 meses)",
  },
  {
    id: 3,
    name: "Mario González",
    age: 25,
    gender: "Masculino",
    username: "mgur",
    exp: "Avanzado (Más de 1 año)",
  },
  {
    id: 4,
    name: "Gabriel Garay",
    age: 21,
    gender: "Masculino",
    username: "garayyy",
    exp: "Intermedio (7 a 11 meses)",
  },
  {
    id: 5,
    name: "Atlina García",
    age: 19,
    gender: "Femenino",
    username: "elatla",
    exp: "Principiante (0 a 6 meses)",
  },
  {
    id: 6,
    name: "Andrés Sánchez",
    age: 27,
    gender: "Masculino",
    username: "ansaun",
    exp: "Avanzado (Más de 1 año)",
  },
];

export default function Discover() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = "#fff";
  const color2 = "#bcf";
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  const handleSwipeLeft = () => {
    console.log("Swipe Left Pressed");
    if (currentIndex < mockData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleSwipeRight = () => {
    console.log("Swipe Right Pressed");
    if (currentIndex < mockData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const Swiper: React.FC<Swiper> = ({
    id,
    name,
    age,
    gender,
    username,
    exp,
  }) => {
    const genderImage =
      gender === "Masculino"
        ? require("@/assets/images/app/M.png")
        : require("@/assets/images/app/F.png");

    return (
      <View style={swipestyles.itemContainer}>
        <View style={swipestyles.card} />
        <Image source={backdropImageMap[id]} style={swipestyles.image} />
        <Image source={genderImage} style={swipestyles.gender} />
        <Image
          source={require("@/assets/images/app/P.png")}
          style={swipestyles.exp}
        />
        <Text style={swipestyles.name}>{name}</Text>
        <Text style={swipestyles.data}>@{username}</Text>
        <Text style={swipestyles.age}>{age} años</Text>
      </View>
    );
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
      <View style={swipestyles.listcontainer}>
        <FlatList
          ref={flatListRef}
          data={mockData}
          renderItem={({ item }) => (
            <Swiper
              id={item.id}
              name={item.name}
              age={item.age}
              username={item.username}
              gender={item.gender}
              exp={item.exp}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
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

      <View style={swipestyles.card}></View>
    </View>
  );
}

const swipestyles = StyleSheet.create({
  age: {
    position: "absolute",
    fontFamily: "BoldFont",
    textAlign: "center",
    color: "#222",
    top: 392,
    left: 18,
    fontSize: 22,
    zIndex: 100,
    textShadowRadius: 5,
    borderWidth: 0,
    width: 325,
  },
  data: {
    position: "absolute",
    fontFamily: "BaseItalic",
    textAlign: "center",
    color: "#222",
    top: 355,
    left: 18,
    fontSize: 20,
    zIndex: 100,
    textShadowRadius: 1,
    borderWidth: 0,
    width: 325,
  },
  name: {
    position: "absolute",
    fontFamily: "BlackFont",
    textAlign: "center",
    top: 315,
    left: 17,
    fontSize: 34,
    zIndex: 100,
    textShadowRadius: 3,
    borderWidth: 0,
    width: 329,
  },
  exp: {
    position: "absolute",
    width: 238,
    height: 50,
    left: 65,
    top: 472,
    zIndex: 106,
  },
  gender: {
    position: "absolute",
    width: 140,
    height: 46,
    left: 114,
    top: 423,
    zIndex: 106,
  },
  image: {
    position: "absolute",
    borderRadius: 60,
    width: 280,
    height: 280,
    left: 38,
    top: 22,
    zIndex: 106,
    boxShadow: "4 4 12px rgba(0,0,0,0.3)",
  },
  card: {
    position: "relative",
    backgroundColor: "white",
    opacity: 0.7,
    height: 538,
    width: 330,
    left: 16,
    overflow: "hidden",
    borderRadius: 60,
    zIndex: 0,
    boxShadow: "3 3 12px rgba(0,0,0,0.3)",
  },
  itemContainer: {
    width: 400,
    marginLeft: 12,
    marginTop: 50,
    marginBottom: 110,
  },
  listcontainer: {
    marginTop: 70,
    marginBottom: 57,
  },
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
