import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, vScale, fScale } from '../../src/utils/scale';

import { useState, useEffect, useCallback } from 'react';
import { ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import events from '../../schedule.js';
import EventCard from '../../src/components/EventCard';


export default function BookmarksScreen() {
    const router = useRouter();
    const STORAGE_KEY = "@myapp:bookmarks";

    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const [savedIds, setSavedIds] = useState([]);
    const [savedEvents, setSavedEvents] = useState([]);


    const [expandedId, setExpandedId] = useState(null);

    useFocusEffect(useCallback(() => { fetchBookmarks(); }, []));


    async function fetchBookmarks() {
        console.log("working");
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                const parsedIds = JSON.parse(jsonValue);
                setSavedIds(parsedIds);

                const bookmarkedEvents = events.filter(event => parsedIds.includes(event.id));
                setSavedEvents(bookmarkedEvents);

                console.log("Bookmarked events:", bookmarkedEvents);
            }
        } catch (error) {
            console.error("Failed to fetch bookmarks", error);
        }
    }

    function toggleExpand(id) {
        LayoutAnimation.configureNext({
            duration: 1000,
            create: { type: 'easeInEaseOut', property: 'opacity' },
            update: { type: 'easeInEaseOut' },
            delete: { type: 'easeInEaseOut', property: 'opacity' },
        });

        // setting the id globally which is currently expanded.
        // setting the opposite of what there was already. 

        setExpandedId(expandedId === id ? null : id);

        // console.log(expandedId);

    }

    async function toggleUnsave(id) {
        try {
        const updatedIds = savedIds.filter((itemId) => itemId !== id);
        setSavedIds(updatedIds);

        const newSavedEventsList = events.filter(event => updatedIds.includes(event.id));

        setSavedEvents(newSavedEventsList);

        // save the FRESH list to storage.

        //used the local variable here coz if we use state then it'll wait for the state to change again to get that called. 

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));

        console.log("Storage successfully updated with:", newSavedEventsList);
        } catch (error) {
        console.error("Failed to save to storage:", error);
        }
    }

    /* =========================================================================
       TODO CHECKLIST: What to implement in this screen
       =========================================================================
  
  
       5. AUTO-REFRESH ON FOCUS:
          - Use `useFocusEffect(useCallback(() => { fetchBookmarks(); }, []))`
            so the list refreshes automatically whenever you navigate to this screen.
  
       7. UI / JSX RENDERING:
          - Header: Back button (router.back()) and screen title.
          - ScrollView: Container for event list.
          - Empty State: Show a message if `savedEvents.length === 0` (e.g. "No bookmarks yet").
          - List: Map over `savedEvents` and render `<EventCard>` for each item.
       ========================================================================= */

    return (
        <ImageBackground
            source={require('../../assets/background.png')}
            style={styles.bg}
            resizeMode="cover"
        >

            <View style={styles.main}>
                {/* Back button */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Bookmarks</Text>

                {/* Render your ScrollView and EventCard list here */}

                <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                    <View style={{ marginTop: scale(20) }}>
                        {savedEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                isExpanded={expandedId === event.id}
                                isSaved={savedIds.includes(event.id)}

                                // we make arrow functions to pass as arguments coz we want to make it wait until we fetch a value... do not want it to launch
                                // the moment the app loads

                                onToggleExpand={() => toggleExpand(event.id)}
                                onToggleSave={() => toggleUnsave(event.id)}

                            />
                        ))}

                    </View>
                </ScrollView>
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E0E0E',
    },
    backButton: {
        marginBottom: 20,
    },
    backText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#0E0E0E',
    },
    main: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: vScale(60),         // Pushes header below the status bar
        paddingHorizontal: scale(20),
    },
    scroll: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        paddingTop: vScale(10),
        paddingBottom: vScale(40),
    },
});
