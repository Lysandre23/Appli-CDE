import React from "react"
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Modal,
	TextInput,
	Picker
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import AdminButton from "../Components/AdminButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import modalStyle from "./Modal.style.js"
import { useEffect } from "react"
import Api from "../Api"

const Admin = (props) => {
	const navigation = useNavigation();
	const [modalClubVisible, setModalClubVisible] = useState(false);
	const [nameNewClub, setNameNewClub] = useState("");
	const [descriptionNewClub, setDescriptionNewClub] = useState("");
	const [imageNewClub, setImageNewClub] = useState(null);
	const [bureauNewClub, setBureauNewClub] = useState(null);
	const [offices, setOffices] = useState([])
	const [modalBureauVisible, setModalBureauVisible] = useState(false);
	const [nameNewBureau, setNameNewBureau] = useState("");
	const [descriptionNewBureau, setDescriptionNewBureau] = useState("");
	const [imageNewBureau, setImageNewBureau] = useState(null);

	useEffect(() => {
		getOffices()
	}, [])

	const getOffices = () => {
		Api.get("/offices").then(function (response) {
			setOffices(response.data.data)
		})
	}

	const resetInputNewClub = () => {
		setModalClubVisible(false)
		setNameNewClub(null)
		setDescriptionNewClub(null)
		setImageNewClub(null)
		setBureauNewClub(null)
	}
	const resetInputNewBureau = () => {
		setModalBureauVisible(false)
		setNameNewBureau(null)
		setDescriptionNewBureau(null)
		setImageNewBureau(null)
	}

	const pickImageClub = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.cancelled) {
			setImageNewClub(result)
		}
	}
	const pickImageBureau = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.cancelled) {
			setImageNewBureau(result)
		}
	}

	return (
		<View style={styles.main}>
			<Header title="ADMIN" color="#da291c" user={props.user} />
			{props.user.is_admin ? (
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalClubVisible}
					onRequestClose={() => {
						setModalClubVisible(!modalClubVisible)
					}}
				>
					<View style={modalStyle.modal}>
						<View style={modalStyle.addPanel}>
							<TextInput
								style={modalStyle.input}
								placeholder="Nom"
								value={nameNewClub}
								onChangeText={setNameNewClub}
							/>
							<TextInput
								style={modalStyle.input}
								placeholder="Description"
								value={descriptionNewClub}
								onChangeText={setDescriptionNewClub}
							/>
							<TouchableOpacity
								style={modalStyle.imagePicker}
								onPress={pickImageClub}
							>
								<Text style={{ textAlign: "center" }}>
									Choisir une image
								</Text>
							</TouchableOpacity>
							<Picker
								selectedValue={bureauNewClub}
								style={modalStyle.picker}
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
								style={modalStyle.bt}
								onPress={() => {}}
							>
								<Text style={modalStyle.textBT}>Valider</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={modalStyle.bt}
								onPress={() => {
									resetInputNewClub()
								}}
							>
								<Text style={modalStyle.textBT}>Annuler</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			) : null}
			{props.user.is_admin ? (
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalBureauVisible}
					onRequestClose={() => {
						setModalBureauVisible(!modalBureauVisible)
					}}
				>
					<View style={modalStyle.modal}>
						<View style={modalStyle.addPanel}>
							<TextInput
								style={modalStyle.input}
								placeholder="Nom"
								value={nameNewBureau}
								onChangeText={setNameNewBureau}
							/>
							<TextInput
								style={modalStyle.input}
								placeholder="Description"
								value={descriptionNewBureau}
								onChangeText={setDescriptionNewBureau}
							/>
							<TouchableOpacity
								style={modalStyle.imagePicker}
								onPress={pickImageBureau}
							>
								<Text style={{ textAlign: "center" }}>
									Choisir une image
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={modalStyle.bt}
								onPress={() => {}}
							>
								<Text style={modalStyle.textBT}>Valider</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={modalStyle.bt}
								onPress={() => {
									resetInputNewBureau()
								}}
							>
								<Text style={modalStyle.textBT}>Annuler</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			) : null}
			<ScrollView>
				<TouchableOpacity
					style={styles.category}
					onPress={() => {
						navigation.navigate("Role")
					}}
				>
					<AdminButton text="Gestion des rôles" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.category}
					onPress={() => {
						setModalBureauVisible(true);
					}}
				>
					<AdminButton text="Créer un bureau" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.category}
					onPress={() => {
						setModalClubVisible(true);
					}}
				>
					<AdminButton text="Créer un club" />
				</TouchableOpacity>
			</ScrollView>
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
})

export default Admin
