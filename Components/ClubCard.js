import React from "react";
import { Text,  StyleSheet, View, Image, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/core";

const ClubCard = (props) => {
    const navigation = useNavigation();

    
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Club", {nom: props.nom});
            }}
        >
            <Image style={styles.img} source={{uri: require("../assets/event.jpg")}}/>
            <Text>{props.nom}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {

    },
    img: {
        width: 40,
        height: 40
    }
});

export default ClubCard;