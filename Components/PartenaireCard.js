import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const PartenaireCard = (props) => {
    return(
        <TouchableOpacity style={styles.main}>
            <Image style={styles.img} source={require('../assets/event.jpg')}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode:"cover",
        borderRadius: 100
    },
});

export default PartenaireCard;