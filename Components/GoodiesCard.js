import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';

const GoodiesCard = () => {
    const [loaded, setLoaded] = useState(false);
    return(
        <TouchableOpacity style={styles.main}>
            {loaded ? null : <ActivityIndicator style={styles.loader}/>}
            <Image 
                style={styles.img}
                source={require("../assets/tshirt.jpg")}
                onLoad={() => {setLoaded(true)}}
            />
            <View style={styles.lineSeparator}></View>
            <View style={styles.info}>
                <Text>T-SHIRT</Text>
                <Text>20€</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        width: "42%",
        height: 180,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2
    },
    lineSeparator: {
        marginTop: 5,
        marginBottom: 5,
        width: "80%",
        left: "10%",
        height: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#da291c"
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        left: "10%",
        fontWeight: '900',
        fontFamily: 'bold'
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode:"contain"
    },
    loader: {
        marginTop: "25%"
    }
});

export default GoodiesCard;