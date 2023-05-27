import React from "react";

import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const SIZE = width * 0.5;

export default function PageScrollComponent({ index, title, translateX }) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(translateX.value, inputRange, [
      0,
      SIZE / 2,
      0,
    ]);
    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateY,
        },
      ],
      opacity,
    };
  });
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
        },
      ]}
    >
      <Animated.View style={[rStyle, styles.square]}>
        <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: "center",
    backgroundColor: "red",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,256,0.4)",
  },
  text: {
    fontSize: 50,
    color: "white",
    fontWeight: "700",
  },
});

// , { backgroundColor: `rgba(0,0,256,${index + 2})` }
