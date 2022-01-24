import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const ListGestionClubButton = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.main} onPress={() => {
            navigation.navigate("GestionClub", {name: props.data.name, 
                                                slug: props.data.slug,
                                                email: props.data.email,
                                                presentationText: props.data.presentationText,
                                                messages: props.data.messages
                                                });
        }}>
            <Text style={{fontSize: 20}}>{props.data.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "90%",
        backgroundColor: "white",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: "5%",
        marginTop: 15,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
});

export default ListGestionClubButton;