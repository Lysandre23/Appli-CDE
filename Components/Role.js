import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoleSquare from "./RoleSquare";

const Role = (props) => {
    return(
        <View style={styles.main}>
            <RoleSquare color={props.color}/>
            <Text style={{marginLeft: 5}}>{props.role}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: "row",
    },
});

export default Role;