import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/core"

const ListGestionClubButton = (props) => {
	const navigation = useNavigation()

	const handlePress = () => {
		navigation.navigate(
			props.data.type === "club" ? "GestionClub" : "GestionOffice",
			{
				id: props.data.id,
			}
		)
	}

	return (
		<TouchableOpacity style={styles.main} onPress={handlePress}>
			<Text style={{ fontSize: 20 }}>{props.data.name}</Text>
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

export default ListGestionClubButton
