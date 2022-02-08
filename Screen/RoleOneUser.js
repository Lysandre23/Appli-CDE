import React from "react"
import { Text, View, StyleSheet } from "react-native"
import Navbar from "../Components/Navbar"
import Header from "../Components/Header"

const RoleOneUser = ({ route }) => {
	const { name, surname, roles } = route.params
	return (
		<View style={styles.main}>
			<Header color="#da291c" title="ROLE" user={props.user} />
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
})

export default RoleOneUser