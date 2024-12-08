import React from "react";
import { Easing } from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface IconsStripeProps {
  right: boolean;
  style: any;
}

const IconsStripe: React.FC<IconsStripeProps> = ({ right, style }) => {
  const opa = 0.1;
  const size = 43;
  const col = "#555";

  return (
    <MotiView
      from={{
        translateX: right ? "-50%" : "0%",
      }}
      animate={{ translateX: right ? "0%" : "-50%" }}
      transition={{
        loop: true,
        repeatReverse: false,
        type: "timing",
        easing: Easing.linear,
        duration: 45000, // Adjust the duration to control the speed
      }}
      style={[bgstyles.iconContainer, style]}
    >
      <MaterialCommunityIcons
        name="tennis-ball"
        size={42}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="tennis"
        size={40}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialIcons
        name="network-ping"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="map-marker"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="cellphone-nfc"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="account-group"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="gesture-swipe"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="chat"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="bell-check"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="handshake"
        size={42}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="account-voice"
        size={42}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="sword-cross"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="fire"
        size={45}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="map"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="lightning-bolt"
        size={45}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="pine-tree"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="earth"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="beer"
        size={40}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />

      {/*SEPARACIÓN*/}

      <MaterialCommunityIcons
        name="tennis-ball"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="tennis"
        size={40}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialIcons
        name="network-ping"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="map-marker"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="cellphone-nfc"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="account-group"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="gesture-swipe"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="chat"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="bell-check"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="handshake"
        size={42}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="account-voice"
        size={42}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="sword-cross"
        size={41}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="fire"
        size={45}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="map"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="lightning-bolt"
        size={45}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="pine-tree"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="earth"
        size={size}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
      <MaterialCommunityIcons
        name="beer"
        size={40}
        color={col}
        opacity={opa}
        style={bgstyles.icon}
      />
    </MotiView>
  );
};

const bgstyles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  icon: {
    marginHorizontal: 6,
  },
});

export default IconsStripe;
