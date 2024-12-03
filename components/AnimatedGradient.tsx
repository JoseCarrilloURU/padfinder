import React, { useEffect } from "react";
import { Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const AnimatedGradient = () => {
  const colors = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colors, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(colors, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [colors]);

  const backgroundColor = colors.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ff0000", "#0000ff"], // Change these colors to your desired gradient colors
  });

  return (
    <Animated.View style={{ flex: 1, backgroundColor }}>
      <LinearGradient
        colors={["#ff0000", "#0000ff"]} // Static colors as a fallback
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
};

export default AnimatedGradient;
