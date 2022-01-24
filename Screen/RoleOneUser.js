import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";

const RoleOneUser = ({route}) => {
    const {name, surname, roles} = route.params;
    return (
        <View style={styles.main}>
            <Header color="#da291c" title="ROLE"/>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default RoleOneUser;