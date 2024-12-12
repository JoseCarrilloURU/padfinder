import React, { useEffect, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import AnimatedButton from "@/components/AnimatedButton";

interface HeaderProps {
  originTab: number;
}

const Header: React.FC<HeaderProps> = ({ originTab }) => {
  const handleLogOut = () => {
    console.log("Log out Pressed");
    router.navigate("/");
  };
  const handleGoBack = () => {
    console.log("Go Back Pressed");
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#fff",
          height: 100,
          position: "absolute",
          width: "100%",
          borderBottomRightRadius: 40,
          borderBottomStartRadius: 40,
          boxShadow: "0 0 12px rgba(0,0,0,0.4)",
          zIndex: 100,
        }}
      />
      <Image
        source={require("@/assets/images/index/LogoHDShade.png")}
        style={{
          position: "absolute",
          top: 38,
          right: 18,
          width: 85,
          height: 50,
          zIndex: 101,
        }}
      />
      <View style={{ zIndex: 105 }}>
        {originTab === 0 && (
          <AnimatedButton
            onPress={handleLogOut}
            disabled={false}
            source={require("@/assets/images/app/LogOut.png")}
            style={{
              position: "absolute",
              top: 37,
              left: 15,
              width: 113,
              height: 50,
            }}
          />
        )}
        {originTab == 1 && (
          <AnimatedButton
            onPress={handleGoBack}
            disabled={false}
            source={require("@/assets/images/app/GoBack.png")}
            style={{
              position: "absolute",
              top: 42,
              left: 11,
              width: 120,
              height: 37,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Header;
