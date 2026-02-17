import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 50,
    gap: 15,
  },
  formContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  formText: {
    color: "white",
    fontSize: 20,
  },
  input: {
    color: "white",
    padding: 15,
    width: "80%",
    fontSize: 17,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#808080",
  },
  emailCodeTitle: {
    color: "#ffffff",
    fontSize: 15,
  },
  emailCodeContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
