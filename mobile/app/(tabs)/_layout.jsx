import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        headerShadowVisible: false,
        inactiveTintColor: COLORS.inactive,
        
        tabBarStyle: {
            backgroundColor: COLORS.cardBackground,
            borderRadius: 30,
            marginBottom: 35,
            marginHorizontal: 20,
            paddingHorizontal: 10,
            height: 60,
            position: "absolute",
            borderWidth: 1,
            overflow: "hidden",
            borderColor: COLORS.primary,
            
        }
        }}>
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