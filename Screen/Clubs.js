import * as React from "react"
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native"
import { List } from "react-native-paper"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import ClubCard from "../Components/ClubCard"
import { useState, useEffect } from "react"
import * as ImagePicker from "expo-image-picker"
import Api from "../Api"
import { useNavigation } from "@react-navigation/core"

const Clubs = (props) => {
	const [offices, setOffices] = useState([])
	const navigation = useNavigation();

	useEffect(() => {
		getOffices()
	}, [])

	const getOffices = () => {
		Api.get("/offices")
			.then(function (response) {
				setOffices(response.data.data)
			})
			.catch(function (error) {
				throw error
			})
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="CLUBS" user={props.user} />

			<FlatList
				data={offices}
				style={{ flex: 1 }}
				renderItem={({ item }) => (
					<View key={item.id} style={{marginTop: 15}}>
						<TouchableOpacity style={styles.officeTitle} onPress={() => {
							// Navigate to office screen
							navigation.navigate("Office", {id: item.id});
						}}>
							<Text style={{fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
						</TouchableOpacity>
						<List.Accordion style={styles.officeClubs} title="Clubs">
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
	officeTitle: {
		width: "90%",
		marginLeft: "5%",
		backgroundColor: "white",
		padding: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 15,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	officeClubs: {
		width: "90%",
		marginLeft: "5%",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		backgroundColor: "white",
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