import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

function switchScreen(g, nav) {
    nav.navigate(g);
}

export function SideBarButton(props) {
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={styles.main} onPress={() => {
                switchScreen(props.goto, navigation);
                if(props.disconnect) {
                    
                }
            }}>
            <Text style={styles.txt}>{props.txt}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    main: {
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 8,
        paddingLeft: "10%",
        paddingTop: 7,
        paddingBottom: 7,
    },
    txt: {
        fontSize: 19
    }
});