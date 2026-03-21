// styles/signup.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { Button, Label } from "@react-navigation/elements";
import { linkTo } from "expo-router/build/global-state/routing";

const styles = StyleSheet.create({
  // container: {
  //   flexGrow: 1,
  //   backgroundColor: COLORS.background,
  //   padding: 20,
  //   justifyContent: "center",
  // },
  // card: {
  //   backgroundColor: COLORS.cardBackground,
  //   borderRadius: 16,
  //   padding: 24,
  //   shadowColor: COLORS.black,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 8,
  //   elevation: 4,
  //   borderWidth: 2,
  //   borderColor: COLORS.border,
  // },
  // header: {
  //   alignItems: "center",
  //   marginBottom: 32,
  // },
  // title: {
  //   fontSize: 32,
  //   fontWeight: "700",
  //   fontFamily: "JetBrainsMono-Medium",
  //   color: COLORS.primary,
  //   marginBottom: 8,
  // },
  // subtitle: {
  //   fontSize: 16,
  //   color: COLORS.textSecondary,
  //   textAlign: "center",
  // },
  // formContainer: { marginBottom: 16 },
  // inputGroup: { marginBottom: 20 },
  // label: {
  //   fontSize: 14,
  //   marginBottom: 8,
  //   color: COLORS.textPrimary,
  //   fontWeight: "500",
  // },
  // inputContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: COLORS.inputBackground,
  //   borderRadius: 12,
  //   borderWidth: 1,
  //   borderColor: COLORS.border,
  //   paddingHorizontal: 12,
  // },
  // inputIcon: { marginRight: 10 },
  // input: {
  //   flex: 1,
  //   height: 48,
  //   color: COLORS.textDark,
  // },
  // eyeIcon: { padding: 8 },
  // button: {
  //   backgroundColor: COLORS.primary,
  //   borderRadius: 12,
  //   height: 50,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 16,
  //   shadowColor: COLORS.black,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 2,
  // },
  // buttonText: {
  //   color: COLORS.white,
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
  // footer: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   marginTop: 24,
  // },
  // footerText: {
  //   color: COLORS.textSecondary,
  //   marginRight: 5,
  // },
  // link: {
  //   color: COLORS.primary,
  //   fontWeight: "600",
  // },

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.background
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    borderLeftColor: COLORS.primary,
    borderWidth: 0,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 4,
    borderColor: COLORS.primary,
    borderLeftWidth: 6, 
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: "JetBrainsMono-Medium",
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center"
  },
  formContainer: {
    marginBottom: 16
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: 12,
    borderColor: COLORS.border,
    borderRadius: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 12,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.textPrimary,
    marginRight: 5,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
  }
});

export default styles;