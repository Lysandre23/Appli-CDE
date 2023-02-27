import React from "react"
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import { useState } from "react"
import RedLine from "../Components/RedLine"
import { useNavigation } from "@react-navigation/core"

const Role = (props) => {
	const [name, setName] = useState(null)
	const navigation = useNavigation()
	return (
		<View style={styles.main}>
			<Header title="ROLE" color="#da291c" user={props.user} />
			<TextInput
				style={styles.input}
				placeholder="Saisir l'adresse e-mail"
				onChangeText={setName}
				value={name}
			/>
			<TouchableOpacity
				style={styles.btSearch}
				onPress={() => {
					navigation.navigate("RoleOneUser", {
						name: "",
						surname: "",
						roles: [],
					})
				}}
			>
				<Text style={styles.textBTSearch}>Rechercher</Text>
			</TouchableOpacity>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		display: "flex",
		backgroundColor: "#F8F8F8",
	},
	input: {
		width: "80%",
		marginLeft: "10%",
		textAlign: "center",
		padding: 10,
		fontSize: 20,
		borderColor: "rgb(200,200,200)",
		borderWidth: 1,
		borderRadius: 10,
		marginTop: 15,
	},
	btSearch: {
		width: "50%",
		marginLeft: "25%",
		backgroundColor: "#da291c",
		padding: 10,
		borderRadius: 100,
		marginTop: 10,
	},
	textBTSearch: {
		textAlign: "center",
		fontSize: 20,
		color: "white",
	},
	scrollview: {
		marginTop: 15,
	},
})

export default Role
