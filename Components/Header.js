import React, { useReducer } from "react"
import { useNavigation } from "@react-navigation/core"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const Header = (props) => {
	const navigation = useNavigation()
	return (
		<View style={[styles.main, { backgroundColor: props.color }]}>
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
		position: "absolute",
		width: "100%",
		bottom: 15,
		zIndex: 1,
	},
	menuIcon: {
		left: 15,
		bottom: 15,
		position: "absolute",
		zIndex: 2,
	},
})

export default Header
