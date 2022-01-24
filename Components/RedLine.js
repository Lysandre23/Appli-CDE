import React from "react";
import { View, StyleSheet } from "react-native";

const RedLine = (props) => {
    return(
        <View style={styles.line}>

        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        width: "90%",
        height: 2,
        borderWidth: 1,
        borderColor: "#da291c",
        borderRadius: 2,
        marginLeft: "5%",
        marginTop: 20
    },
});

export default RedLine;