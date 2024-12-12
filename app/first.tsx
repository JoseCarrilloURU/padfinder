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
import { MotiView, MotiImage } from "moti";
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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { playSound } from "@/components/soundUtils";
import { BlurView } from "expo-blur";
import Header from "@/components/header";
import { backdropImageMap } from "@/components/imageMaps";

export default function First() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = "#87eaff";
  const color2 = "blue";

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [picSet, setPicSet] = useState(false);
  const [gender, setGender] = useState<"off" | "m" | "f">("off");
  const [exp, setExp] = useState<"off" | "p" | "i" | "v">("off");

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  const handlePictureSet = () => {
    console.log("Picture Change Set");
    setPicSet(true); // SOLO SI LA FOTO SI SE CAMBIA
  };

  const handleM = () => {
    console.log("Masculino");
    setGender("m");
  };
  const handleF = () => {
    console.log("Femenino");
    setGender("f");
  };
  const handleP = () => {
    console.log("Principiante");
    setExp("p");
  };
  const handleI = () => {
    console.log("Intermedio");
    setExp("i");
  };
  const handleV = () => {
    console.log("Veterano");
    setExp("v");
  };

  const handleStartPress = () => {
    console.log("Start pressed");
    // router.push("/(tabs)/discover");
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

      <MotiView style={{ position: "absolute", flex: 1 }}>
        <MotiImage
          source={require("@/assets/images/app/firsttitle1.png")}
          style={firststyles.logintitle}
        />
      </MotiView>
      <MotiView style={{ position: "absolute", flex: 1 }}>
        <BlurView intensity={55} tint="light" style={firststyles.blur}>
          <Text style={firststyles.texttitle}>Tu Nombre</Text>
          <View style={firststyles.textinputcontainer}>
            <MaterialCommunityIcons
              name="numeric-1-circle"
              size={25}
              style={firststyles.textinputicon}
              color="#999"
            />
            <TextInput
              placeholder="Mario"
              placeholderTextColor="#999"
              style={firststyles.textinput}
              keyboardType="url"
              multiline={false}
              scrollEnabled={false}
              numberOfLines={1}
              maxLength={50}
              value={name}
              onChangeText={setName}
            />
          </View>
        </BlurView>
      </MotiView>
      <MotiView style={{ position: "absolute", flex: 1 }}>
        <BlurView
          intensity={0}
          tint="light"
          style={[firststyles.blur, { top: 210, boxShadow: "" }]}
        >
          <Text style={firststyles.texttitle}>Tu Apellido</Text>
          <View style={firststyles.textinputcontainer}>
            <MaterialCommunityIcons
              name="numeric-2-circle"
              size={25}
              style={firststyles.textinputicon}
              color="#999"
            />
            <TextInput
              placeholder="González"
              placeholderTextColor="#999"
              style={firststyles.textinput}
              keyboardType="url"
              multiline={false}
              scrollEnabled={false}
              numberOfLines={1}
              maxLength={50}
              value={lastname}
              onChangeText={setLastname}
            />
          </View>
        </BlurView>
      </MotiView>
      <MotiView style={{ position: "absolute", flex: 1 }}>
        <BlurView
          intensity={0}
          tint="light"
          style={[firststyles.blur, { top: 320, boxShadow: "" }]}
        >
          <Text style={firststyles.texttitle}>Tu Edad</Text>
          <View style={firststyles.textinputcontainer}>
            <MaterialCommunityIcons
              name="numeric-3-circle"
              size={25}
              style={firststyles.textinputicon}
              color="#999"
            />
            <TextInput
              placeholder="25"
              placeholderTextColor="#999"
              style={firststyles.textinput}
              keyboardType="number-pad"
              multiline={false}
              scrollEnabled={false}
              numberOfLines={1}
              maxLength={2}
              value={age}
              onChangeText={setAge}
            />
          </View>
        </BlurView>
      </MotiView>
      <Image style={firststyles.image} />
      <AnimatedButton
        onPress={handlePictureSet}
        source={require("@/assets/images/app/ImgReplace.png")}
        style={firststyles.pictureset}
        disabled={false}
      />
      <Pressable onPress={handleM}>
        <MotiImage
          from={{
            scale: 0.8,
            opacity: 0.4,
          }}
          animate={gender === "m" ? { scale: 1.1, opacity: 1 } : {}}
          transition={{
            type: "timing",
            duration: 800,
          }}
          source={require("@/assets/images/app/M.png")}
          style={firststyles.genders}
        />
      </Pressable>
      <Pressable onPress={handleF}>
        <MotiImage
          from={{
            scale: 0.8,
            opacity: 0.4,
          }}
          animate={gender === "f" ? { scale: 1.1, opacity: 1 } : {}}
          transition={{
            type: "timing",
            duration: 800,
          }}
          source={require("@/assets/images/app/F.png")}
          style={[firststyles.genders, { left: 205, height: 55 }]}
        />
      </Pressable>
      <Pressable onPress={handleP}>
        <MotiImage
          from={{
            scale: 0.8,
            opacity: 0.4,
          }}
          animate={exp === "p" ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: "timing",
            duration: 800,
          }}
          source={require("@/assets/images/app/P.png")}
          style={firststyles.exps}
        />
      </Pressable>
      <Pressable onPress={handleI}>
        <MotiImage
          from={{
            scale: 0.8,
            opacity: 0.4,
          }}
          animate={exp === "i" ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: "timing",
            duration: 800,
          }}
          source={require("@/assets/images/app/I.png")}
          style={[firststyles.exps, { top: 668 }]}
        />
      </Pressable>
      <Pressable onPress={handleV}>
        <MotiImage
          from={{
            scale: 0.8,
            opacity: 0.4,
          }}
          animate={exp === "v" ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: "timing",
            duration: 800,
          }}
          source={require("@/assets/images/app/V.png")}
          style={[firststyles.exps, { top: 718 }]}
        />
      </Pressable>
      <MotiView style={{ position: "absolute", flex: 1 }}>
        <AnimatedButton
          onPress={handleStartPress}
          disabled={false}
          source={require("@/assets/images/app/Start.png")}
          style={firststyles.mainbutton}
        />
      </MotiView>
    </View>
  );
}

const firststyles = StyleSheet.create({
  image: {},
  pictureset: {},
  exps: {
    position: "absolute",
    width: 240,
    height: 49,
    left: 80,
    top: 620,
    zIndex: 106,
  },
  genders: {
    position: "absolute",
    width: 160,
    height: 53,
    left: 30,
    top: 560,
    zIndex: 106,
  },
  mainbutton: {
    position: "absolute",
    top: 768,
    left: 95,
    width: 200,
    height: 54,
    zIndex: 5,
  },
  texttitle: {
    position: "absolute",
    fontFamily: "BlackFont",
    color: "#222",
    fontSize: 19,
    top: 18,
    left: 24,
    width: 400,
    height: 30,
    zIndex: 5,
    textShadowRadius: 2,
  },
  blur: {
    position: "absolute",
    width: 335,
    height: 355,
    zIndex: 5,
    top: 100,
    left: 28,
    overflow: "hidden",
    borderRadius: 40,
    // borderWidth: 5,
    // borderColor: "white",
    boxShadow: "2 2 15px rgba(0,0,0,0.3)",
  },
  textinputcontainer: {
    position: "absolute",
    flexDirection: "row",
    width: 300,
    height: 50,
    top: 55,
    left: 16,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: "transparent",
    backgroundColor: "white",
    boxShadow: "2 2 15px rgba(0,0,0,0.5)",
  },
  textinputicon: {
    position: "absolute",
    left: 12,
    top: 9,
  },
  textinput: {
    position: "absolute",
    fontFamily: "BoldFont",
    fontSize: 17,
    top: -2.5,
    left: 43,
    width: 250,
    height: 50,
    zIndex: 5,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  logintitle: {
    position: "absolute",
    top: 45,
    left: 102,
    width: 180,
    height: 45,
    zIndex: 5,
  },
});
