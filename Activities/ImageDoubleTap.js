import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useCallback, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const SIZE = width;
const AnimatedImage = Animated.createAnimatedComponent(Image);

export const ImageDoubleTap = () => {
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);
  return (
    <View style={[styles.container]}>
      <GestureHandlerRootView style={styles.rootview}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <Animated.View>
            <ImageBackground
              source={require("../assets/image_bg.jpeg")}
              style={styles.image}
            >
              <AnimatedImage
                source={require("../assets/heart.png")}
                resizeMode="center"
                style={[
                  {
                    width: SIZE / 3,
                    height: SIZE / 3,

                    shadowOffset: { width: 0, height: 20 },
                    // shadowOpacity: 0.4,
                    shadowRadius: 35,
                  },
                  rStyle,
                ]}
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  rootview: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});
