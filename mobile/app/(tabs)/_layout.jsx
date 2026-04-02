import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { BlurView } from 'expo-blur';
import { StyleSheet, Platform, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useEffect } from 'react';

export default function TabLayout() {
  // Animated value for the active indicator
  const translateX = useRef(new Animated.Value(0)).current;

  return (
    
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.5)' : COLORS.black,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginBottom: 4,
          
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          height: 60,
          borderRadius: 35,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFillObject}>
            {/* Main glass background */}
            <BlurView 
              intensity={Platform.OS === 'ios' ? 70 : 50} 
              tint={Platform.OS === 'ios' ? 'light' : 'default'}
              style={StyleSheet.absoluteFillObject}
            />
            
            {/* Gradient overlay for depth */}
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.3)',
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.2)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            
            {/* Inner shadow effect */}
            <View style={styles.innerShadow} />
            
            {/* Top border glow */}
            <View style={styles.topGlow} />
            
            {/* Subtle white border */}
            <View style={styles.borderTop} />
          </View>
        ),
      }}
    >
      <Tabs.Screen 
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={focused ? size + 2 : size} 
                color={color} 
              />
              {focused && <View style={styles.activeDot} />}
            </Animated.View>
          ),
        }}  
      />
      <Tabs.Screen 
        name='create'
        options={{
          title: "Create",
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons 
                name={focused ? "add-circle" : "add-circle-outline"} 
                size={focused ? size + 3 : size + 1} 
                color={focused ? COLORS.primary : color} 
              />
              {focused && <View style={[styles.activeDot, { backgroundColor: COLORS.primary }]} />}
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen 
        name='profile'
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={focused ? size + 2 : size} 
                color={color} 
              />
              {focused && <View style={styles.activeDot} />}
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  innerShadow: {
    position: 'absolute',
    top: -2,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapperActive: {
    transform: [{ scale: 1.05 }],
  },
  activeDot: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'center',
  },
});