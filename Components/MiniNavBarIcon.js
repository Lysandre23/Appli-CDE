import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

const iconSize = 30;

function switchScreen(screenName, nav) {
    nav.navigate(screenName);
}

const MiniNavbarIcon = (props) => {
    const navigation = useNavigation();
    const type = props.type;
    return (
        <TouchableOpacity style={styles.main} onPress={() => {
            switchScreen(props.goto, navigation);
        }}>
            {type=="icon"?<Icon color={props.color} size={iconSize} name={props.name}/>:<Image style={styles.img} source={require("../assets/psnLogo.png")}/>}
            <Text style={styles.txt}>{props.title}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    img: {
        width: iconSize,
        height: iconSize,
    },
    txt: {
        fontSize: 11,
        color: 'rgba(0,0,0,0.5)',
        marginTop: 3
    }
});

export default MiniNavbarIcon;