import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    // <Tabs 
    // screenOptions={{ 
    //     headerShown: false,
    //     tabBarActiveTintColor: COLORS.primary,
    //     headerShadowVisible: false,
    //     inactiveTintColor: COLORS.black,

    //     tabBarStyle: {
    //         backgroundColor: COLORS.cardBackground,
    //         borderRadius: 30,
    //         marginBottom: 35,
    //         marginHorizontal: 20,
    //         paddingHorizontal: 10,
    //         height: 60,
    //         position: "absolute",
    //         borderWidth: 1,
    //         overflow: "hidden",
    //         borderColor: COLORS.primary,
            
    //     }
    //     }}>


// Inside your TabLayout.js
<Tabs
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: COLORS.primary,
    tabBarStyle: {
      position: 'absolute', // Essential for blur to work
      borderTopWidth: 0,
      elevation: 0,
      height: 60,
      marginBottom: 35,
      marginHorizontal: 20,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: COLORS.primary,
    },
    // This makes the background blurred!
    tabBarBackground: () => (
      <BlurView 
        intensity={80} // Adjust blur strength (0 to 100)
        tint="light"   // "light", "dark", or "extraLight"
        style={{ 
            ...StyleSheet.absoluteFillObject,
            borderRadius: 30, // Match your tab bar radius
            overflow: 'hidden',
            backgroundColor: 'transparent' 
        }} 
      />
    ),
  }}
>


        <Tabs.Screen 
            name='index'
            options={{
                title: "Home",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                ),
            }}  
        />
        <Tabs.Screen 
        name='create'
        options={{
            title: "Create",
            tabBarIcon: ({color, size}) => (
                <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
        }}
        />
        <Tabs.Screen 
        name='profile'
        options={{
            title: "Profile",
            tabBarIcon: ({color, size}) => (
                <Ionicons name="person-outline" size={size} color={color} />
            ),
        }}
        />
    </Tabs>
  )
}