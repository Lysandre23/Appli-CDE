import React, { useReducer } from "react"
import { useNavigation } from "@react-navigation/core"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import Circle from "./Circle"

const Header = (props) => {
	const navigation = useNavigation()
	return (
		<View style={[styles.header, { backgroundColor: props.color }]}>
			<View style={styles.container1}>
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
			</View>
			<View style={styles.container2}>
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
		paddingBottom: 16,
		zIndex: 50
	},

	container1: {
		position: 'absolute',
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		position: "relative",
		paddingLeft: 10,
		zIndex: 3
	},
	container2: {
		position: 'absolute',
		width: "100%",
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	title: {
		color: "white",
		fontWeight: "900",
		fontSize: 25,
		zIndex: 1,
	},
	menuIcon: {
		zIndex: 2,
	},
})

export default Header
