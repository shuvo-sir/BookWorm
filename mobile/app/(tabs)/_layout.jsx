import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StyleSheet, Platform, View } from 'react-native';
import COLORS from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor:
          Platform.OS === 'ios' ? 'rgba(0,0,0,0.5)' : COLORS.black,

        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginBottom: 4,
        },

        // ✅ Glass style
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          borderRadius: 30,
          marginHorizontal: 20,
          marginBottom: 15,
          backgroundColor: 'rgba(255,255,255,0.15)', // transparency
          borderTopWidth: 0.5,
          borderColor: 'rgba(255,255,255,0.3)',
          overflow: 'hidden',
          elevation: 0,
        },

        // ✅ Blur background
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="light"
            style={StyleSheet.absoluteFillObject}
          />
        ),
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconWrapper}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={focused ? size + 2 : size}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Create */}
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconWrapper}>
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={focused ? size + 3 : size}
                color={focused ? COLORS.primary : color}
              />
            </View>
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconWrapper}>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={focused ? size + 2 : size}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});