import React from "react";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import IconsBG from "@/components/iconsBG";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;

  return (
    <View style={styles.container}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={appHeight}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, appHeight)}
            colors={["blue", "cyan"]}
          />
        </Rect>
      </Canvas>
      <View style={styles.content}>
        <IconsBG />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
