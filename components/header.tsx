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
import { AnimatePresence } from "moti";

const Header = () => {
  const handleLogOut = () => {
    console.log("Log out Pressed");
    router.navigate("/");
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
        <AnimatedButton
          onPress={handleLogOut}
          disabled={false}
          source={require("@/assets/images/app/LogOut.png")}
          style={{
            position: "absolute",
            top: 38,
            left: 15,
            width: 97,
            height: 52,
          }}
        />
      </View>
    </View>
  );
};

export default Header;
