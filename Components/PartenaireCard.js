import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const PartenaireCard = (props) => {
    return(
        <TouchableOpacity style={styles.main}>
            <Image />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        width: 100,
        height: 100,
        borderRadius: 50
    }
});

export default PartenaireCard;