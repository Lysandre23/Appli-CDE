import React from "react";
import { Text,  StyleSheet, View, Image, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/core";

const ClubCard = (props) => {
    const navigation = useNavigation();

    
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Club", {nom: props.name});
            }}
            style={styles.main}
        >
            <Image source={require('../assets/event.jpg')} style={styles.img}/>
            <Text style={styles.text}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20
    },
    img: {
        width: 40,
        height: 40
    },
    text: {
        fontSize: 11,
        color: "#555"
    }
});

export default ClubCard;