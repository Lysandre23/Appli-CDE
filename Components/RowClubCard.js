import React from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import ClubCard from "./ClubCard";

const RowClubCard = (props) => {
    return (
        <View style={styles.main}>
            <Text>{props.data[0]}</Text>
            <FlatList 
                data={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <ClubCard nom={item.nom}/>}
                style={styles.list}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        marginTop: 5
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

export default RowClubCard;