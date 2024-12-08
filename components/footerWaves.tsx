import { MotiView, MotiImage, MotiText } from "moti";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { Easing } from "react-native-reanimated";

const FooterWaves = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View>
      <View style={footerstyles.waveContainer}>
        <MotiView
          from={{ translateX: 0 }}
          animate={{ translateX: -450 }}
          transition={{
            type: "timing",
            duration: 10000,
            easing: Easing.linear,
            loop: true,
            repeatReverse: false,
          }}
          style={[
            footerstyles.waveWrapper,
            { bottom: 0, opacity: 1, zIndex: 3 },
          ]}
        >
          <MotiImage
            source={require("@/assets/images/index/wave.png")}
            style={footerstyles.wave}
          />
          <MotiImage
            source={require("@/assets/images/index/wave.png")}
            style={footerstyles.wave}
          />
        </MotiView>
        <MotiView
          from={{ translateX: -450 }}
          animate={{ translateX: 0 }}
          transition={{
            type: "timing",
            duration: 15000,
            easing: Easing.linear,
            loop: true,
            repeatReverse: false,
          }}
          style={[
            footerstyles.waveWrapper,
            { bottom: 12, opacity: 0.7, zIndex: 2 },
          ]}
        >
          <MotiImage
            source={require("@/assets/images/index/wave.png")}
            style={footerstyles.wave}
          />
          <MotiImage
            source={require("@/assets/images/index/wave.png")}
            style={footerstyles.wave}
          />
        </MotiView>
        <MotiView
          from={{ translateX: 0 }}
          animate={{ translateX: -450 }}
          transition={{
            type: "timing",
            duration: 20000,
            easing: Easing.linear,
            loop: true,
            repeatReverse: false,
          }}
          style={[
            footerstyles.waveWrapper,
            { bottom: 14, opacity: 0.4, zIndex: 1 },
          ]}
        >
          <MotiImage
            source={require("@/assets/images/index/wave.png")}
            style={footerstyles.wave}
          />
          <MotiImage
            source={require("@/assets/images/index/wave.png")}
            style={footerstyles.wave}
          />
        </MotiView>
      </View>
      <View style={footerstyles.footer} />
    </View>
  );
};

const footerstyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
  },
  waveContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    width: "100%",
    height: 100,
    overflow: "hidden",
  },
  waveWrapper: {
    position: "absolute",
    flexDirection: "row",
  },
  wave: {
    width: 450,
    height: 45,
  },
});

export default FooterWaves;
