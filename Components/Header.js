import React, { useReducer } from "react"
import { useNavigation } from "@react-navigation/core"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

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
		fontWeight: "900",
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
