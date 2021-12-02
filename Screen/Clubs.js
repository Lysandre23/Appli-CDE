import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';

const Clubs = (props, navigation) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="CLUBS" />
            <ScrollView style={styles.ClubsList}>
                
            </ScrollView>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    ClubsList: {
        
    }
});

export default Clubs;