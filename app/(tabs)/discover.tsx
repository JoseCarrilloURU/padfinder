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
import { fetchWrapper } from "../services/wrapper";
import { BASE_URL } from "../constants";
import { useAuth } from "../context/auth/authContext";

interface ApiUser {
  _id: string;
  username: string;
  person_id: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    genre: {
      _id: string;
      description: string;
    };
    age: number;
    experience: number;
  };
  status: boolean;
  match_id: string;
}

interface Swiper {
  id: number;
  name: string;
  age: number;
  gender: string;
  username: string;
  exp: string;
  imageUrl: string;
  match_id: string;
  user_id: string;
}

export default function Discover() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = "#fff";
  const color2 = "#bcf";
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef(0);
  const [swipers, setSwipers] = useState<Swiper[]>([]);

  const { user, token } = useAuth();

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  const handleSwipeLeft = async (
    match_id: string | undefined,
    user_id: string
  ) => {
    if (match_id) {
      const response = await fetchWrapper(`${BASE_URL}match`, {
        method: "PUT",
        token: token ?? "",
        body: JSON.stringify({ id: match_id, status_match: "rejected" }),
      });
      if (response.data) {
        console.log("Se rechazo el match correctamente");
      } else {
        console.log(
          "Hubo un error al actualizar el match a rechazo",
          response.error
        );
      }
    } else {
      const response = await fetchWrapper(`${BASE_URL}match`, {
        method: "POST",
        token: token ?? "",
        body: JSON.stringify({
          source_user: user?.id,
          target_user: user_id,
          status_match: "rejected",
        }),
      });
      if (response.data) {
        console.log("Se rechazo el match correctamente");
      } else {
        console.log("Hubo un error al enviar el match", response.error);
      }
    }
    if (currentIndexRef.current < swipers.length - 1) {
      currentIndexRef.current += 1;
      flatListRef.current?.scrollToIndex({ index: currentIndexRef.current });
    }
  };

  const handleSwipeRight = async (
    match_id: string | undefined,
    user_id: string
  ) => {
    console.log(
      "PRUEBA",
      swipers[currentIndexRef.current],
      currentIndexRef.current
    );
    console.log("User y Match", user_id, match_id);
    console.log("Swipe Right Pressed");
    if (match_id) {
      const response = await fetchWrapper(`${BASE_URL}chat`, {
        method: "POST",
        token: token ?? "",
        body: JSON.stringify({ users: [user?.id, user_id], name: "Chat" }),
      });
      if (response.data) {
        console.log("Se creo el chat correctamente");
      } else {
        console.log("Error en la creacion", response.error);
      }
    } else {
      const response = await fetchWrapper(`${BASE_URL}match`, {
        method: "POST",
        token: token ?? "",
        body: JSON.stringify({
          source_user: user?.id,
          target_user: user_id,
          status_match: "accepted",
        }),
      });
      if (response.data) {
        console.log("Se envio el match correctamente");
      } else {
        console.log("Hubo un error al enviar el match", response.error);
      }
    }

    if (currentIndexRef.current < swipers.length - 1) {
      currentIndexRef.current += 1;
      flatListRef.current?.scrollToIndex({ index: currentIndexRef.current });
    }
  };

  useEffect(() => {
    console.log("Entro en descubrir", user?.id);
    const fetchSwipe = async () => {
      try {
        const response = await fetchWrapper(
          `${BASE_URL}user?swipe=${user?.id}`,
          {
            method: "GET",
            token: token ?? "",
          }
        );
        if (response.data) {
          const mappedData = (
            Array.isArray(response.data) ? response.data : [response.data]
          ).map((apiUser: ApiUser, index: number) => ({
            id: index + 1,
            name: `${apiUser.person_id.name} ${apiUser.person_id.lastname}`,
            age: apiUser.person_id.age ?? 22,
            gender: apiUser.person_id.genre?.description,
            username: apiUser.username,
            user_id: apiUser._id,
            exp: getExperienceRange(apiUser.person_id.experience),
            imageUrl: `${BASE_URL}user/image?id=${apiUser._id}`,
            match_id: apiUser.match_id,
          }));
          setSwipers(mappedData);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchSwipe();
  }, [user]);

  const getExperienceRange = (months: number) => {
    if (months <= 6) {
      return "Principiante (0 a 6 meses)";
    } else if (months <= 11) {
      return "Intermedio (6 a 11 meses)";
    } else {
      return "Avanzado (Más de 1 año)";
    }
  };

  const Swiper: React.FC<Swiper> = ({
    id,
    name,
    age,
    gender,
    username,
    exp,
    imageUrl,
    match_id,
    user_id,
  }) => {
    const genderImage =
      gender === "Masculino"
        ? require("@/assets/images/app/M.png")
        : require("@/assets/images/app/F.png");

    return (
      <View style={swipestyles.itemContainer}>
        <View style={swipestyles.card} />
        <Image source={{ uri: imageUrl }} style={swipestyles.image} />
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
          data={swipers}
          renderItem={({ item, index }) => {
            currentIndexRef.current = index;
            return (
              <Swiper
                id={item.id}
                name={item.name}
                age={item.age}
                username={item.username}
                gender={item.gender}
                exp={item.exp}
                imageUrl={item.imageUrl}
                match_id={item.match_id}
                user_id={item.user_id}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <AnimatedButton
        onPress={() =>
          handleSwipeLeft(
            swipers[currentIndexRef.current]?.match_id,
            swipers[currentIndexRef.current]?.user_id
          )
        }
        disabled={false}
        source={require("@/assets/images/app/SwipeLeft3.png")}
        style={swipestyles.swipeleft}
      />
      <AnimatedButton
        onPress={() =>
          handleSwipeRight(
            swipers[currentIndexRef.current]?.match_id,
            swipers[currentIndexRef.current]?.user_id
          )
        }
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
