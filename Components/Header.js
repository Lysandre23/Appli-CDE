<<<<<<< HEAD
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserAndToken} from "../utils";
import {useEffect, useState} from "react";
import {SideBar} from "./SideBar";

const Header = (props) => {

    const HeaderStack = createNativeStackNavigator()

    return (
        <View style={[styles.header, {backgroundColor: props.color}]}>
            <View style={[styles.container]}>
                {(true || props.user.email) && (
                    <TouchableOpacity style={styles.menuIcon} onPress={props.toggleSideBar}>
                        <Icon name="reorder" size={35} color="white"/>
                    </TouchableOpacity>)}
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        zIndex: 50,
    },

    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        justifyContent: "flex-end",
        paddingBottom: 10,
    },
    title: {
        width: "50%",
        marginRight: "25%",
        textAlign: "center",
        color: "white",
        fontWeight: "700",
        fontSize: 25,
        zIndex: 1,
    },
    menuIcon: {
        width: "25%",
        paddingLeft: "2%",
        zIndex: 2,
    },
})

export default Header
=======
import React, { useReducer } from "react"
import { useNavigation } from "@react-navigation/core"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import Circle from "./Circle"

const Header = (props) => {
	const navigation = useNavigation()
	return (
		<View style={[styles.header, { backgroundColor: props.color }]}>
			<View style={styles.container}>
				{props.user.email ? (
					<TouchableOpacity
						style={styles.menuIcon}
						onPress={() => {
							navigation.toggleDrawer()
						}}
					>
						<Icon name="bars" color="white" size={25} />
					</TouchableOpacity>
				) : null}
				<Text style={styles.title}>{props.title}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 90,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		zIndex: 50,
	},

	container: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		position: "relative",
		paddingBottom: 10,
	},
	title: {
		color: "white",
		fontWeight: "700",
		fontSize: 25,
		zIndex: 1,
	},
	menuIcon: {
		position: "absolute",
		left: 10,
		bottom: 3,
		zIndex: 2,
		padding: 10,
	},
})

export default Header
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
