import { Link } from "expo-router";
import { Text, View } from "react-native";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "red" }}>Shuvo Halder</Text>
      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/signup">Register</Link>
    </View>
  );
}
