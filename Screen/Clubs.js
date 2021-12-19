import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import {List} from 'react-native-paper';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import ClubCard from '../Components/ClubCard';

import data from "../assets/clubs.json";

const Clubs = (props, navigation) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="CLUBS" />
            <FlatList
                data={data}
                renderItem={({item}) => 
                    <View>
                        <List.Accordion style={styles.office} title={item.name}>
                            <FlatList
                                data={item.list}
                                renderItem={({item}) => 
                                    <View style={styles.rowcol}>
                                        <ClubCard name={item.name}/>
                                    </View>
                                }
                                keyExtractor={item => item.key}
                                numColumns={3}
                            />
                        </List.Accordion>
                    </View>
                }
                keyExtractor={item => item.key}
            />
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    rowcol: {
        width: "33%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    office: {
        width: "90%",
        marginLeft: "5%",
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 15,
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