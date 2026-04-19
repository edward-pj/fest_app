import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, ScrollView, Button, TextInput,
  ImageBackground, LayoutAnimation, Platform, UIManager,
} from 'react-native';
import events from './schedule.js';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { scale, vScale, fScale } from './src/utils/scale';
import { Fonts, fontAssets } from './src/constants/fonts';
import { Svg, Path, Circle } from 'react-native-svg';
import EventCard from './src/components/EventCard';
import DateCard from './src/components/DateCard';
import { FEST_DATES } from './src/constants/dates';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDay, setActiveDay] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [savedIds, setSavedIds] = useState([]);

  if (!fontsLoaded) return null;

  function toggleExpand(id) {
    LayoutAnimation.configureNext({
      duration: 280,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'easeInEaseOut' },
      delete: { type: 'easeInEaseOut', property: 'opacity' },
    });
    setExpandedId(expandedId === id ? null : id);
  }

  // bookmark thingy to be implemented, have to add local storage here to cache it.
  // check weather app for the same. 
  // Tap a date card — toggle selection
  function toggleDay(dayIndex) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveDay(activeDay === dayIndex ? null : dayIndex);
  }

  function toggleSave(id) {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((x) => x !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  }

  const filtered = [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].name.toLowerCase().includes(search.toLowerCase())) {
      filtered.push(events[i]);
    }
  }

  const categoryFiltered = [];
  for (let i = 0; i < filtered.length; i++) {
    if (activeCategory === 'All' || filtered[i].category === activeCategory) {
      categoryFiltered.push(filtered[i]);
    }
  }

  const dayFiltered = [];
  for (let i = 0; i < categoryFiltered.length; i++) {
    if (activeDay === null || categoryFiltered[i].day === activeDay) {
      dayFiltered.push(categoryFiltered[i]);
    }
  }

  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={styles.bg}
      resizeMode="cover"
    >

    <View style={styles.main}>


    
      <View style={styles.dates}>
        <View style={styles.dateTab}>
          {FEST_DATES.map((d) => (
            <DateCard
              key={d.dayIndex}
              day={d.day}
              month={d.month}
              isActive={activeDay === d.dayIndex}
              onPress={() => toggleDay(d.dayIndex)}
            />
          ))}
        </View>
    </View>
    
   

<View style = {{flexDirection:'row', justifyContent: 'space-between'}}>

    <Svg xmlns="http://www.w3.org/2000/svg" style={styles.backButton}>
      <Path d="M33.3333 20L6.66667 20M6.66667 20L16.6667 30M6.66667 20L16.6667 10" stroke="#F3F3F3" stroke-width="3.125" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>

    <Text style={styles.heading}>EVENTS</Text>

    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.5663 5H0.566315V28.2727L9.20631 24.6364L18.5663 29V13C14.148 13 10.5663 9.41828 10.5663 5Z" fill="white"/>
      <Path d="M0.566315 5V4.43368H-6.55651e-07V5H0.566315ZM10.5663 5H11.1326V4.43368H10.5663V5ZM0.566315 28.2727H-6.55651e-07V29.1255L0.785999 28.7947L0.566315 28.2727ZM9.20631 24.6364L9.4456 24.1231L9.21804 24.017L8.98663 24.1144L9.20631 24.6364ZM18.5663 29L18.327 29.5133L19.1326 29.8889V29H18.5663ZM18.5663 13H19.1326V12.4337H18.5663V13ZM0.566315 5V5.56632H10.5663V5V4.43368H0.566315V5ZM0.566315 28.2727H1.13263V5H0.566315H-6.55651e-07V28.2727H0.566315ZM9.20631 24.6364L8.98663 24.1144L0.346631 27.7508L0.566315 28.2727L0.785999 28.7947L9.426 25.1583L9.20631 24.6364ZM18.5663 29L18.8056 28.4867L9.4456 24.1231L9.20631 24.6364L8.96702 25.1496L18.327 29.5133L18.5663 29ZM18.5663 13H18V29H18.5663H19.1326V13H18.5663ZM18.5663 13V12.4337C14.4608 12.4337 11.1326 9.10551 11.1326 5H10.5663H10C10 9.73105 13.8353 13.5663 18.5663 13.5663V13Z" fill="white"/>
      <Circle cx="18.5663" cy="5" r="5" fill="#EC4646" />
    </Svg>

{/* LayoutAnimation tells React Native: "Whatever the UI looks like in the next render, */}

</View>


      <View style={styles.searchBar}>
        <Svg width={scale(22)} height={scale(22)} viewBox="0 0 24 24" fill="none">
          <Circle cx="11" cy="11" r="7" stroke="#FFFFFF" strokeWidth="2" />
          <Path d="M20 20L16.5 16.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </Svg>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#FFFFFF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      
      {/* 1. The Date Tab (The "Hovering" element) */}
      

      

      <Button title="All"   onPress={() => setActiveCategory('All')}   />
      <Button title="Music" onPress={() => setActiveCategory('Music')} />
      <Button title="Tech"  onPress={() => setActiveCategory('Tech')}  />
      <Button title="Dance" onPress={() => setActiveCategory('Dance')} />

        </View>

<ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={{marginTop : scale(20)}}>
        {dayFiltered.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isExpanded={expandedId === event.id}
          isSaved={savedIds.includes(event.id)}
          onToggleExpand={() => toggleExpand(event.id)}
          onToggleSave={() => toggleSave(event.id)}
        />
      ))}

      </View>
      

    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  main:{
    backgroundColor: 'transparent',
    paddingTop: vScale(60),
    paddingHorizontal: scale(20),
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0E0E0E'
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingTop: vScale(60),
    paddingHorizontal: scale(20),
  },
  heading: {
    fontSize: fScale(48),
    color: '#f6f6f8',
    textAlign: 'center',
    letterSpacing: scale(1.2),
    marginBottom: vScale(20),
    fontFamily: Fonts.milordBook,
  },
  dates:{
    position: 'absolute',
    marginTop: scale(220),
    marginLeft: scale(-10),
  },
  dateTab: {
    position: 'absolute', // This makes it hover
    //marginLeft: scale(-30),
    // Layering
    zIndex: 10,           // Works on iOS
    elevation: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vScale(54),
    backgroundColor: '#1B1B1B',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    marginTop: vScale(12),
    marginBottom: vScale(16),
  },
  searchInput: {
    flex: 1,
    marginLeft: scale(12),
    color: '#FFFFFF',
    fontSize: fScale(22),
    padding: 0,
  },
  backButton:{
    width: scale(40),
    height: scale(40),
    strokeWidth: scale(3.125),
    stroke: '#F3F3F3',
  }
});

