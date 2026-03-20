import { View, Text, KeyboardAvoidingView, Platform, TextInput} from 'react-native'
import styles from '../../assets/styles/signup.styles'
import { useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import COLORS from '../../constants/colors';

const signup = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {};
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
              </View>
              <View style = {styles.inputContainer}>
                <Ionicons style={styles.inputIcons}
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
          </View>
        </View>
    </KeyboardAvoidingView>
  )
}

export default signup