import React from 'react';
import { useNavigation } from '@react-navigation/core';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.main, {backgroundColor: props.color}]}>
            <TouchableOpacity onPress={() => {
                navigation.toggleDrawer();
            }}>
                <Icon name="bars"/>
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "11%",
    },
    title: {
        color: "white",
        textAlign: "center",
        fontWeight: "900",
        fontSize: 25,
        position: 'absolute',
        width: "100%",
        bottom: "15%"
    },
    menuIcon: {
        marginBottom: 15,
        left: 10
    }
});

export default Header;