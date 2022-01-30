import * as React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"

const PSN = (props, navigation) => {
	return (
		<View style={styles.main}>
			<Header color="#006fc0" title="PSN" user={props.user} />
			<ScrollView style={styles.PSNList}></ScrollView>
			<Navbar color="#006FC0" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	PSNList: {},
})

export default PSN
