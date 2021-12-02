import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

const GestionClub = (props) => {
    return (
        <View style={styles.main}>
            <Header title="GESTION DE CLUB" color="#da291c"/>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }
});

export default GestionClub; 