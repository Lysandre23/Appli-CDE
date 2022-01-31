import * as React from "react"
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Modal,
	Picker,
	TouchableOpacity,
	TextInput,
} from "react-native"
import { List } from "react-native-paper"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import ClubCard from "../Components/ClubCard"
import { useState, useEffect } from "react"
import * as ImagePicker from "expo-image-picker"
import Api from "../Api"

const Clubs = (props, navigation) => {
	const [offices, setOffices] = useState([])

	useEffect(() => {
		getOffices()
	}, [])

	const getOffices = () => {
		Api.get("/offices").then(function (response) {
			setOffices(response.data.data)
		})
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="CLUBS" user={props.user} />
			<FlatList
				data={offices}
				renderItem={({ item }) => (
					<View key={item.id}>
						<List.Accordion style={styles.office} title={item.name}>
							<FlatList
								data={item.clubs}
								renderItem={({ item }) => (
									<View style={styles.rowcol} key={item.id}>
										<ClubCard
											id={item.id}
											name={item.name}
											description={item.description}
											image={item.picture}
											navigation={navigation}
										/>
									</View>
								)}
								keyExtractor={(item) => item.key}
								numColumns={3}
							/>
						</List.Accordion>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
	office: {
		width: "90%",
		marginLeft: "5%",
		borderRadius: 10,
		backgroundColor: "white",
		marginTop: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 15,
	},
	rowcol: {
		width: "33%",
	},
})

export default Clubs
