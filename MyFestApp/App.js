import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import events from '/Users/prathamjain/Downloads/DVM_tasks/Fest_App/MyFestApp/schedule.js';
import {useState} from 'react';

function EventCard({event}){
  const [saved, setSaved] = useState(false);

  return(
    <View>
      <Text>{event.name}</Text>
      <Text>{event.category}</Text>
      <Button 
        title={saved ? "Saved" : "Save"} 
        onPress={() => setSaved(!saved)} 
      />
    </View>
  );
}
//make this only saved atp

export default function App() {
  const [search, setSearch] = useState(''); 
  const [activeCategory, setActiveCategory] = useState('All');

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

  return (
    <ScrollView>
      <TextInput 
        placeholder="Search events..."
        value={search}
        onChangeText={setSearch}
      />

      <Button title="All"   onPress={() => setActiveCategory('All')}   />
      <Button title="Music" onPress={() => setActiveCategory('Music')} />
      <Button title="Tech"  onPress={() => setActiveCategory('Tech')}  />
      <Button title="Dance" onPress={() => setActiveCategory('Dance')} />

      {categoryFiltered.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

