import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../Components/Header';
import EventsCard from '../Components/EventsCard';
import Navbar from '../Components/Navbar';

import data from '../assets/events.json';

const Events = (props, navigation) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="EVENTS" />
            <FlatList 
                data={data}
                renderItem={({item}) => <EventsCard 
                    name={item.name}
                    date={item.date}
                    src={require('../assets/event.jpg')}
                    keyExtractor={item => item.key}
                />}
            />
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    EventsList: {
        
    }
});

export default Events;