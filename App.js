import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import GestureBasics from "./Activities/GestureBasics";
import ScrollViewPro from "./Activities/ScrollViewPro";
import { ColorInterpolation } from "./Activities/ColorInterpolation";
import { ImageDoubleTap } from "./Activities/ImageDoubleTap";

export default function AnimatedStyleUpdateExample() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const SIZE = 100;

  const handleRotation = (progress) => {
    "worklet";
    return `${progress.value * 2 * Math.PI} rad`;
  };
  const animatedStyles = useAnimatedStyle(() => {
    "worklet";
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  });

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      {/* Gesture basic for dragging a component */}
      {/* <GestureBasics /> */}

      {/* Animation for loading screen */}
      {/* <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: "red" },
          animatedStyles,
        ]}
      /> */}

      {/* Scroll View */}
      {/* <ScrollViewPro /> */}

      {/* Color Interpolation */}
      {/* <ColorInterpolation /> */}

      {/* Double Tap Instagram  */}
      <ImageDoubleTap />

      {/* <Button title="hello"></Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    justifyContent: "center",
  },
});
