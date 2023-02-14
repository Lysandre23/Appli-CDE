import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import RoleSquare from "./RoleSquare";

const roleColor = {
    "Utilisateur standard": "#2ECC71",
    "Administrateur de club": "#E74C3C",
    "Administrateur de bureau": "#3498DB",
    "Administrateur global CDE": "#F39C12"
};

const indexRole = {
    0: "Utilisateur standard",
    1: "Administrateur de club",
    2: "Administrateur de bureau",
    3: "Administrateur global CDE"
}



const UserCardAdmin = (props) => {
    const [indexColor, setIndexColor] = useState(0);
    return(
        <View style={styles.main}>
            <Text style={styles.txt}>{props.name}</Text>
            <TouchableOpacity onPress={() => {
                setIndexColor((indexColor+1)%4);
            }}>
                <RoleSquare color={roleColor[indexRole[indexColor]]}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: "white",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        borderRadius: 8,
        marginBottom: 10
    },
    txt: {
        fontSize: 18
    }
});

export default UserCardAdmin;