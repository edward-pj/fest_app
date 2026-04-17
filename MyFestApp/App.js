import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import {useState, useEffect} from 'react';

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
  // const [search, setSearch] = useState(''); 
  // const [activeCategory, setActiveCategory] = useState('All');

  // const filtered = [];
  // for (let i = 0; i < events.length; i++) {
  //   if (events[i].name.toLowerCase().includes(search.toLowerCase())) {
  //     filtered.push(events[i]);
  //   }
  // }

  // const categoryFiltered = [];
  // for (let i = 0; i < filtered.length; i++) {
  //   if (activeCategory === 'All' || filtered[i].category === activeCategory) {
  //     categoryFiltered.push(filtered[i]);
  //   }
  //}

  const fetch_events = async ()=>{
      try {
        const url = `https://lillie-nondoubtable-hellishly.ngrok-free.dev`;
        const res = await fetch(url);

        
        const json = await res.json();
        console.log("wokring", json);
      } catch (e) {
        console.warn(e);
      } finally {
        console.log("finally working")
      }
    };
  
  useEffect(() => {
    fetch_events();
  }, []);

  return (
    <ScrollView>
      <TextInput 
        placeholder="Search events..."
      />

      <Text>hey whats up?!</Text>

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

