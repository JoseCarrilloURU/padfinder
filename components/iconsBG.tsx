import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import IconsStripe from "@/components/iconsStripe";

const IconsBG = () => {
  return (
    <View style={bgstyles.iconContainer}>
      <IconsStripe right={false} style={bgstyles.stripe} />
      <IconsStripe right={true} style={bgstyles.stripe} />
      <IconsStripe right={false} style={bgstyles.stripe} />
      <IconsStripe right={true} style={bgstyles.stripe} />
      <IconsStripe right={false} style={bgstyles.stripe} />
      <IconsStripe right={true} style={bgstyles.stripe} />
      <IconsStripe right={false} style={bgstyles.stripe} />
      <IconsStripe right={true} style={bgstyles.stripe} />
      <IconsStripe right={false} style={bgstyles.stripe} />
      <IconsStripe right={true} style={bgstyles.stripe} />
      <IconsStripe right={false} style={bgstyles.stripe} />
      <IconsStripe right={true} style={bgstyles.stripe} />
    </View>
  );
};

const bgstyles = StyleSheet.create({
  iconContainer: {
    transform: [{ rotate: "10deg" }],
  },
  stripe: {
    marginVertical: 13, // Adjust the vertical padding as needed
  },
});

export default IconsBG;
