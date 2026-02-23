import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 11,
    minHeight: 35,
    maxWidth: "100%",
  },

  containerLeft: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: "#79848f",
  },

  containerRight: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#1b5ae3",
  },
});
