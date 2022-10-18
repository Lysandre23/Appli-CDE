import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

const AdminButton = (props) => {
	const handlePress = () => {
		props.onPress()
	}
	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={styles.main}>
				<Text style={{ fontSize: 25 }}>{props.text}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	main: {
		width: "90%",
		backgroundColor: "white",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: "5%",
		marginTop: 15,
		padding: 10,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.05,
		shadowRadius: 10,
	},
})

export default AdminButton
