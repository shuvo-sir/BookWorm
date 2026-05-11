import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#044f75' }}>
      <Text>Book a flight with us!..</Text>
      <Link href="/(auth)/signup" style={{ marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 5 }}>
        Sign Up
      </Link>
      <Link href="/(auth)/signin" style={{ marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 5 }}>
        Sign In
      </Link>
    </View>
  )
}

export default Home