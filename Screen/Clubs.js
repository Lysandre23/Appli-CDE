import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import DropDownItem from "react-native-drop-down-item";
import {List} from 'react-native-paper';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import ClubCategory from '../Components/ClubCategory';
import ClubCard from '../Components/ClubCard';

const Clubs = (props, navigation) => {



    return(
        <View style={styles.main}>
            <Header color="#da291c" title="CLUBS" />
            
            <ClubCard nom="Foot" img="../assets/event.jpg"/> 
            
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    mainCategory: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 10,
    }
});

export default Clubs;

/*
<List.Section>
    <List.Accordion>
        <List.Item title="test"/>
        <List.Item title="est"/>
    </List.Accordion>
</List.Section>
*/