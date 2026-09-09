import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#161616',
                    borderTopColor: '#2B2B2B',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#EC4646',
                tabBarInactiveTintColor: '#888888',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Events',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'calendar' : 'calendar-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="announcements"
                options={{
                    title: 'Live',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'megaphone' : 'megaphone-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="bookmarks"
                options={{
                    title: 'Saved',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'bookmark' : 'bookmark-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}