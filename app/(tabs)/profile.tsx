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
import { BASE_URL } from "../constants";
import { useAuth } from "../context/auth/authContext";
import { fetchWrapper } from "../services/wrapper";

interface User {
  _id: string;
  person_id: {
    _id: string;
    email: string;
    experience: number;
    name: string;
    lastname: string;
    age: number;
    genre: {
      _id: string;
      description: string;
    };
  };
  status: boolean;
  username: string;
}

interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  exp: string;
  imageUrl: string;
}

export default function Profile() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = "white";
  const color2 = "#bbb";

  const { user, token } = useAuth();
  const [profile, setProfile] = useState({} as UserData);

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetchWrapper(`${BASE_URL}user?id=${user?.id}`, {
        method: "GET",
        token: token ?? "",
      });
      const apiUser = response.data as User;
      const updatedProfile = {
        id: apiUser._id,
        name: apiUser.person_id.name,
        username: apiUser.username,
        email: apiUser.person_id.email,
        age: apiUser.person_id.age ?? 22,
        gender: apiUser.person_id.genre.description,
        exp: getExperienceRange(apiUser.person_id.experience),
        imageUrl: `${BASE_URL}user/image?id=${user?.id}`,
      } as UserData;
      setProfile(updatedProfile);
    };
    fetchProfile();
  }, [user, token]);

  const handleEditImg = () => {
    console.log("Edit Button Pressed");
  };

  const getExperienceRange = (months: number) => {
    if (months <= 6) {
      return 'Principiante (0 a 6 meses)';
    } else if (months <= 11) {
      return 'Intermedio (6 a 11 meses)';
    } else {
      return 'Avanzado (Más de 1 año)';
    }
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
      <Image
        source={require("@/assets/images/app/profiletitle.png")}
        style={profilestyles.title}
      />
      <AnimatedButton
        source={require("@/assets/images/app/EditButton.png")}
        style={profilestyles.editbutton}
        onPress={handleEditImg}
        disabled={false}
      />
      <Image source={{ uri: profile.imageUrl }} style={profilestyles.image} />
      <Text style={profilestyles.name}>{profile.name}</Text>
      <Text style={[profilestyles.creds, { top: 635 }]}>
        @{profile.username}
      </Text>
      <Text style={[profilestyles.creds, { top: 668, fontSize: 21 }]}>
        {profile.email}
      </Text>
      <Text
        style={[
          profilestyles.creds,
          { fontSize: 24, fontFamily: "BaseItalic" },
        ]}
      >
        {profile.age} años - {profile.gender}
      </Text>
      <Text
        style={[
          profilestyles.creds,
          {
            fontSize: 16,
            fontFamily: "BaseItalic",
            top: 510,
          },
        ]}
      >
        {profile.exp} jugando Pádel
      </Text>
      <BlurView intensity={80} tint="light" style={profilestyles.blurcard} />
      <BlurView
        intensity={80}
        tint="light"
        style={[profilestyles.blurcard, { height: 130, top: 580 }]}
      />
      <Text
        style={[
          profilestyles.name,
          { top: 590, textDecorationLine: "underline", fontSize: 30 },
        ]}
      >
        Tus Credenciales:
      </Text>
    </View>
  );
}

const profilestyles = StyleSheet.create({
  editbutton: {
    position: "absolute",
    top: 185,
    left: 255,
    width: 55,
    height: 55,
    zIndex: 500,
    opacity: 1,
  },
  name: {
    position: "absolute",
    fontFamily: "BlackFont",
    textAlign: "center",
    top: 415,
    left: 30,
    fontSize: 34,
    zIndex: 100,
    textShadowRadius: 3,
    borderWidth: 0,
    textDecorationLine: "underline",
    width: 330,
  },
  title: {
    position: "absolute",
    top: 112,
    left: 105,
    width: 180,
    height: 55,
  },
  creds: {
    position: "absolute",
    fontFamily: "BoldFont",
    textAlign: "center",
    color: "#222",
    top: 478,
    left: 30,
    fontSize: 22,
    zIndex: 100,
    textShadowRadius: 1,
    borderWidth: 0,
    // textDecorationLine: "underline",
    width: 330,
  },
  image: {
    position: "absolute",
    width: 200,
    height: 200,
    top: 200,
    left: 96,
    borderRadius: 40,
    borderColor: "white",
    borderWidth: 4,
    zIndex: 1,
    boxShadow: "4 4 15px rgba(0,0,0,0.5)",
  },
  blurcard: {
    position: "absolute",
    width: 340,
    height: 375,
    top: 180,
    left: 25,
    borderRadius: 45,
    overflow: "hidden",
    boxShadow: "4 4 12px rgba(0,0,0,0.2)",
    zIndex: 0,
  },
});
