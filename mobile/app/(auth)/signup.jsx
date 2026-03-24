import { View, Text, KeyboardAvoidingView, Platform, TextInput,TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import styles from '../../assets/styles/signup.styles'
import { useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import COLORS from '../../constants/colors';
import { Link, router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const signup = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const {user, isLoading, token, register} = useAuthStore();
  // const handleSignUp = async() => {
  //   const result = await register(username,email,password);
  //   if(!result) Alert.alert("Error", result.error);
  // };


  const handleSignUp = async () => {
  // 1. Call the register function
  const result = await register(username, email, password);

  // 2. Check the "success" flag we just added to the store
  if (result.success) {
    // If it works, maybe navigate to home
    router.replace("/index"); 
  } else {
    // 🚀 This will now show your backend's "All fields are required" message!
    Alert.alert("Registration Failed", result.error);
  }
};
  console.log(user);
  console.log(token);     



  return (
     <KeyboardAvoidingView
          style = {{ flex: 1,}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style = {styles.container}>
          <View style = {styles.card}>
            <View style = {styles.header}>
              <Text style= {styles.title}>BookWorm🐛</Text>
              <Text style={styles.subtitle}>Share your favorite read</Text>
            </View>

            <View style = {styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
              
                <View style = {styles.inputContainer}>
                  <Ionicons style={styles.inputIcon}
                  name='person-outline'
                  size={20}
                  color={COLORS.primary}/>
                  <TextInput
                    style={styles.input}
                    placeholder='Shuvo Halder'
                    placeholderTextColor={COLORS.placeholderText}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize='none'
                  />
                </View>
              </View>

              {/* Email */}
          <View style = {styles.inputGroup}>
            <Text style = {styles.label}>Email</Text>
            <View style = {styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style = {styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style = {styles.inputGroup}>
            <Text style = {styles.label}>Password</Text>
            <View style = {styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style = {styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={COLORS.primary}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
            </View>

            {/* SignUp Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={COLORS.white}/>
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>All ready have an account</Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.link}>Sign-In</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
    </KeyboardAvoidingView>
  )
}

export default signup