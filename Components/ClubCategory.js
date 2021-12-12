import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {List} from 'react-native-paper';
import RowClubCard from "./RowClubCard";

const ClubCategory = (props) => {
    return (
        <View>
            <List.Accordion
                title={props.category}
                style={styles.main}
            >
                <FlatList 
                    data={props.clubs}
                    renderItem={({item}) => <RowClubCard data={item}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </List.Accordion>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 10,
    }
});

export default ClubCategory;