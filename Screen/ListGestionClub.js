import React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import ListGestionClubButton from "../Components/ListGestionClubButton"

const data = [
	{
		name: "Club de foot",
		slug: "club-de-foot",
		email: "email@gmail.com",
		presentationText: "lorem ipsum",
		messages: [{ user: "anonyme", text: "pas ouf" }],
	},
]

const ListGestionClub = (props) => {
	return (
		<View style={styles.main}>
			<Header color="#da291c" title="GESTION DE CLUB" user={props.user} />
			<FlatList
				data={data}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => <ListGestionClubButton data={item} />}
			/>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
})

export default ListGestionClub
