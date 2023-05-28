import { View, Text, StyleSheet } from "react-native";

export const ColourSelector = () => {
  return (
    <>
      <View style={styles.topContainer}>
        <Text>a</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text>b</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 5,
    width: "100%",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
