import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/Header';
import EventsCard from '../Components/EventsCard';
import Navbar from '../Components/Navbar';

const Events = (props, navigation) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="EVENTS" />
            <ScrollView style={styles.EventsList}>
                <EventsCard
                title="Event"
                date="27/10/2021"
                src={require("../assets/event.jpg")}
                description=""
                />
                <EventsCard
                title="Event"
                date="27/10/2021"
                src={require("../assets/event.jpg")}
                description=""
                />
                <EventsCard
                title="Event"
                date="27/10/2021"
                src={require("../assets/event.jpg")}
                description=""
                />
            </ScrollView>
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