import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Picker } from 'react-native';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';

const Message = (props, navigation) => {
    const [selectedClub, setSelectedClub] = useState("Choisir un club");
    const [items, setItems] = useState([
        {label: '24h de Stan', value: '24h de Stan'},
        {label: 'AquaCités', value: 'AquaCités'},
        {label: 'Club informatique', value: 'Club informatique'},
        {label: 'Club mécanique', value: 'Club mécanique'},
        {label: 'Club poker', value: 'Club poker'},
        {label: 'Gala', value: 'Gala'},
        {label: 'Intégration', value: 'Intégration'},
        {label: 'Joutes du téméraire', value: 'Joutes du téméraire'},
        {label: 'Loizirs', value: 'Loizirs'},
        {label: 'Polysound', value: 'Polysound'},
        {label: 'Voyages', value: 'Voyages'},
        {label: 'Club astronomie', value: 'Club astronomie'},
        {label: 'Club bière', value: 'Club bière'},
        {label: 'Club DJ/MAO', value: 'Club DJ/MAO'},
        {label: 'Club Kinépoly', value: 'Club Kinépoly'},
        {label: 'Club Musique', value: 'Club Musique'},
        {label: 'Club oenologie', value: 'Club oenologie'},
        {label: 'Club photo', value: 'Club photo'},
        {label: 'Club Polyboard Games', value: 'Club Polyboard Games'},
        {label: 'Club Vidéo', value: 'Club Vidéo'},
        {label: 'DIY', value: 'DIY'},
        {label: 'Espace vert', value: 'Espace vert'},
        {label: 'Humanitaire', value: 'Humanitaire'},
        {label: 'Sensibilisation', value: 'Sensibilisation'},
        {label: 'Club badminton', value: 'Club badminton'},
        {label: 'Club basket', value: 'Club basket'},
        {label: 'Club cheerleading', value: 'Club cheerleading'},
        {label: 'Club course à pieds', value: 'Club course à pieds'},
        {label: 'Club football', value: 'Club football'},
        {label: 'Club handball', value: 'Club handball'},
        {label: 'Club montagne', value: 'Club montagne'},
        {label: 'Club musculation', value: 'Club musculation'},
        {label: 'Club rugby', value: 'Club rugby'},
        {label: 'Club sports extrêmes', value: 'Club sports extrêmes'},
        {label: 'Club sports nautiques', value: 'Club sports nautiques'},
        {label: 'Club tennis', value: 'Club tennis'},
        {label: 'Club vélo', value: 'Club vélo'},
        {label: 'Club volley', value: 'Club volley'}
    ]);
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="MESSAGE" />
            <Picker
                selectedValue={selectedClub}
            >

            </Picker>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    MessageList: {
        
    },
    drop: {
        borderColor: "rgba(0,0,0,0.2)",
        width: "80%",
        marginLeft: "10%"
    }
});

export default Message;