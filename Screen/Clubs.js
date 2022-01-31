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
	const [admin, setAdmin] = useState(true)
	const [modalVisible, setModalVisible] = useState(false)
	const [nameNewClub, setNameNewClub] = useState("")
	const [descriptionNewClub, setDescriptionNewClub] = useState("")
	const [imageNewClub, setImageNewClub] = useState(null)
	const [bureauNewClub, setBureauNewClub] = useState(null)
	const [offices, setOffices] = useState([])

	useEffect(() => {
		getOffices()
	}, [])

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		})

		if (!result.cancelled) {
			setImageNewEvent(result.uri)
		}
	}

	const resetInputNewClub = () => {
		setModalVisible(false)
		setNameNewClub(null)
		setDescriptionNewClub(null)
		setImageNewClub(null)
		setBureauNewClub(null)
	}

	const getOffices = () => {
		Api.get("/offices").then(function (response) {
			setOffices(response.data.data)
		})
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="CLUBS" user={props.user} />
			{props.user.is_admin ? (
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => {
						setModalVisible(true)
					}}
				>
					<Text style={{ color: "white", fontSize: 18 }}>
						Ajouter un club
					</Text>
				</TouchableOpacity>
			) : (
				<View></View>
			)}
			{props.user.is_admin ? (
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible)
					}}
				>
					<View style={styles.modal}>
						<View style={styles.addPanel}>
							<TextInput
								style={styles.input}
								placeholder="Nom"
								value={nameNewClub}
								onChangeText={setNameNewClub}
							/>
							<TextInput
								style={styles.input}
								placeholder="Description"
								value={descriptionNewClub}
								onChangeText={setDescriptionNewClub}
							/>
							<TouchableOpacity
								style={styles.imagePicker}
								onPress={pickImage}
							>
								<Text style={{ textAlign: "center" }}>
									Choisir une image
								</Text>
							</TouchableOpacity>
							<Picker
								selectedValue={bureauNewClub}
								style={styles.picker}
								onValueChange={(itemValue, itemIndex) =>
									setBureauNewClub(itemValue)
								}
							>
								{offices.map((item) => (
									<Picker.Item
										key={item.id}
										label={item.label}
										value={item.value}
									/>
								))}
							</Picker>
							<TouchableOpacity
								style={styles.bt}
								onPress={() => {}}
							>
								<Text style={styles.textBT}>Valider</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.bt}
								onPress={() => {
									resetInputNewClub()
								}}
							>
								<Text style={styles.textBT}>Annuler</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			) : null}
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
	addButton: {
		zIndex: 2,
		backgroundColor: "#da291c",
		padding: 10,
		borderRadius: 8,
		width: "50%",
		marginLeft: "25%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 15,
		marginBottom: 15,
	},
	modal: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.15)",
	},
	addPanel: {
		backgroundColor: "white",
		width: "70%",
		padding: 50,
		borderRadius: 20,
		display: "flex",
		flexDirection: "column",
	},
	input: {
		width: "100%",
		borderColor: "rgb(200,200,200)",
		borderWidth: 1,
		borderRadius: 7,
		padding: 5,
		marginBottom: 5,
	},
	bt: {
		marginTop: 10,
		backgroundColor: "#da291c",
		padding: 9,
		borderRadius: 100,
	},
	textBT: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
	},
	imagePicker: {
		borderColor: "rgb(150,150,150)",
		borderWidth: 1,
		padding: 5,
		borderRadius: 4,
		marginTop: 10,
		marginBottom: 10,
	},
	picker: {
		width: "80%",
		marginLeft: "10%",
		marginTop: 15,
	},
	rowcol: {
		width: "33%",
	},
})

export default Clubs
