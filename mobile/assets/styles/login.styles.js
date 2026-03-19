// styles/login.styles.js
import { StyleSheet, Dimensions, Button } from "react-native";
import COLORS from "../../constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow : 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  illustrationImage: {
    width: width * 0.75,
    height: width * 0.75,
  },
  TopIllustration: {
    alignItems: "center",
    width: "100%",
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginTop: -24
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
  inputIcon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  eyeIcon: {
    padding: 8,
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
    fontWeight: "600"
  }
});

export default styles;