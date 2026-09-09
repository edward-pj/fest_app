import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { scale, vScale, fScale } from '../../src/utils/scale';
import { Fonts } from '../../src/constants/fonts';
import { ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import NoticeCard from '../../src/components/NoticeCard'; 

import { useFocusEffect } from 'expo-router';


const API_URL = 'https://opensheet.elk.sh/1MfZYc_NGIG8MrOpIS3gkzlCUtECoI2Lm5EbT5AfAifc/Sheet1';

export default function AnnouncementsScreen(){
    const [announcements, setAnnouncements] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useFocusEffect(
        useCallback(() => {
            fetchAnnouncements();
        }, [])
    );

    async function fetchAnnouncements(){
        try {
            // setIsLoading(true);
            // setError(null);

            const response  = await fetch(API_URL);
            const data = await response.json();

            setAnnouncements(data);
            console.log("Announcements loaded successfully", data);
        }

        catch(error){
            console.error("Failed to fetch announcements", error);
            // setError(error);
            // setIsLoading(false);
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

    return(
         <ImageBackground
                    source={require('../../assets/background.png')}
                    style={styles.bg}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>Announcements</Text>

                        {/* Render your ScrollView and EventCard list here */}

                        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                            <View style={{ marginTop: scale(20) }}>
                        {announcements.map((event) => (
                            <NoticeCard
                                key={event["ID"]}
                                event={event}
                                isExpanded={expandedId === event["ID"]}

                                // we make arrow functions to pass as arguments coz we want to make it wait until we fetch a value... do not want it to launch
                                // the moment the app loads

                                onToggleExpand={() => toggleExpand(event["ID"])}

                            />
                        ))}

                    </View>
                </ScrollView>
        </View>

                </ImageBackground>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: vScale(60),         // Pushes header below the status bar
        paddingHorizontal: scale(20),
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: fScale(18),
        color: '#FFFFFF',
        fontFamily: Fonts.futuraBdCn,
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
});