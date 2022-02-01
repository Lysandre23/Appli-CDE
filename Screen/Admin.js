import React from "react"
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Modal,
	TextInput,
	Picker,
	Platform,
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
import ListModal from "../Components/ListModal"

const Admin = (props) => {
	const navigation = useNavigation()

	const [modalClubVisible, setModalClubVisible] = useState(false)
	const [nameNewClub, setNameNewClub] = useState("")
	const [descriptionNewClub, setDescriptionNewClub] = useState("")
	const [imageNewClub, setImageNewClub] = useState(null)
	const [selectedOfficeNewClub, setSelectedOfficeNewClub] = useState(0)

	const [modalOfficeVisible, setModalOfficeVisible] = useState(false)
	const [nameNewOffice, setNameNewOffice] = useState("")
	const [descriptionNewOffice, setDescriptionNewOffice] = useState("")
	const [imageNewOffice, setImageNewOffice] = useState(null)

	const [modalAddAdminVisible, setModalAddAdminVisible] = useState(false)
	const [selectedNewAdmin, setSelectedNewAdmin] = useState(0)

	const [modalDeleteAdminVisible, setModalDeleteAdminVisible] =
		useState(false)

	const [offices, setOffices] = useState([])
	const [admins, setAdmins] = useState([])
	const [users, setUsers] = useState([])

	useEffect(() => {
		getOffices()
		getAdmins()
		getUsers()
	}, [])

	const getOffices = () => {
		Api.get("/offices").then(function (response) {
			setOffices(response.data.data)
		})
	}

	const getAdmins = () => {
		Api.get("/admins", {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setAdmins(response.data.data)
		})
	}

	const getUsers = () => {
		Api.get("/users/list", {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setUsers(response.data.data)
		})
	}

	const handleCloseClubModal = () => {
		setModalClubVisible(false)
		setNameNewClub("")
		setDescriptionNewClub("")
		setImageNewClub(null)
		setSelectedOfficeNewClub(0)
	}
	const handleCloseOfficeModal = () => {
		setModalOfficeVisible(false)
		setNameNewOffice("")
		setDescriptionNewOffice("")
		setImageNewOffice(null)
	}

	const handleCloseAddAdminModal = () => {
		setModalAddAdminVisible(false)
		setSelectedNewAdmin(0)
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
	const pickImageOffice = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.cancelled) {
			setImageNewOffice(result)
		}
	}

	const storeClub = () => {
		if (imageNewClub) {
			let form = new FormData()

			form.append(
				"picture",
				JSON.stringify({
					uri:
						Platform.OS === "ios"
							? imageNewClub.uri.replace("file://", "")
							: imageNewClub.uri,
					name: imageNewClub.fileName,
					type: imageNewClub.type,
				})
			)
			form.append("name", nameNewClub)
			form.append("description", descriptionNewClub)
			form.append("office_id", selectedOfficeNewClub)
			Api.post("/clubs", form, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${props.token}`,
				},
			}).then(function (response) {
				setModalClubVisible(false)
				setImageNewClub(null)
				setNameNewClub("")
				setDescriptionNewClub("")
			})
		}
	}

	const storeOffice = () => {
		if (imageNewOffice) {
			let form = new FormData()

			form.append(
				"picture",
				JSON.stringify({
					uri:
						Platform.OS === "ios"
							? imageNewOffice.uri.replace("file://", "")
							: imageNewOffice.uri,
					name: imageNewOffice.fileName,
					type: imageNewOffice.type,
				})
			)
			form.append("name", nameNewOffice)
			form.append("description", descriptionNewOffice)
			Api.post("/offices", form, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${props.token}`,
				},
			}).then(function (response) {
				getOffices()
				setModalOfficeVisible(false)
				setImageNewOffice(null)
				setNameNewOffice("")
				setDescriptionNewOffice("")
			})
		}
	}

	const storeAdmin = () => {
		Api.post(
			"/admins",
			{
				user_id: selectedNewAdmin,
			},
			{
				headers: {
					Authorization: `Bearer ${props.token}`,
				},
			}
		).then(function (response) {
			setModalAddAdminVisible(false)
			setSelectedNewAdmin(0)
		})
	}

	const serializeAdmins = (admins) => {
		let array = []
		admins.forEach((item) => {
			array.push({
				value: item.id,
				label: item.first_name + " " + item.last_name,
			})
		})
		return array
	}

	return (
		<View style={styles.main}>
			<Header title="ADMIN" color="#da291c" user={props.user} />
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
							selectedValue={selectedOfficeNewClub}
							style={modalStyle.picker}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedOfficeNewClub(itemValue)
							}
						>
							<Picker.Item
								key={0}
								label="Choisir un bureau"
								value={0}
								enabled={false}
							/>
							{offices.map((item) => (
								<Picker.Item
									key={item.id}
									label={item.name}
									value={item.id}
								/>
							))}
						</Picker>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={storeClub}
						>
							<Text style={modalStyle.textBT}>Valider</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={() => {
								handleCloseClubModal()
							}}
						>
							<Text style={modalStyle.textBT}>Annuler</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalOfficeVisible}
				onRequestClose={() => {
					setModalOfficeVisible(!modalOfficeVisible)
				}}
			>
				<View style={modalStyle.modal}>
					<View style={modalStyle.addPanel}>
						<TextInput
							style={modalStyle.input}
							placeholder="Nom"
							value={nameNewOffice}
							onChangeText={setNameNewOffice}
						/>
						<TextInput
							style={modalStyle.input}
							placeholder="Description"
							value={descriptionNewOffice}
							onChangeText={setDescriptionNewOffice}
						/>
						<TouchableOpacity
							style={modalStyle.imagePicker}
							onPress={pickImageOffice}
						>
							<Text style={{ textAlign: "center" }}>
								Choisir une image
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={storeOffice}
						>
							<Text style={modalStyle.textBT}>Valider</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={() => {
								handleCloseOfficeModal()
							}}
						>
							<Text style={modalStyle.textBT}>Annuler</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalAddAdminVisible}
				onRequestClose={() => {
					setModalAddAdminVisible(!modalAddAdminVisible)
				}}
			>
				<View style={modalStyle.modal}>
					<View style={modalStyle.addPanel}>
						<Picker
							selectedValue={selectedNewAdmin}
							style={modalStyle.picker}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedNewAdmin(itemValue)
							}
						>
							<Picker.Item
								key={0}
								label="Choisir un utilisateur"
								value={0}
								enabled={false}
							/>
							{users
								.filter(
									(item) =>
										!admins.find(
											(admin) => admin.id === item.id
										)
								)
								.map((item) => (
									<Picker.Item
										key={item.id}
										label={
											item.first_name +
											" " +
											item.last_name
										}
										value={item.id}
									/>
								))}
						</Picker>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={storeAdmin}
						>
							<Text style={modalStyle.textBT}>Valider</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={() => {
								handleCloseAddAdminModal()
							}}
						>
							<Text style={modalStyle.textBT}>Annuler</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<ListModal
				visible={modalDeleteAdminVisible}
				list={serializeAdmins(admins)}
				selectable={true}
				onClose={() =>
					setModalDeleteAdminVisible(!modalDeleteAdminVisible)
				}
			/>

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
						setModalOfficeVisible(true)
					}}
				>
					<AdminButton text="Créer un bureau" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.category}
					onPress={() => {
						setModalClubVisible(true)
					}}
				>
					<AdminButton text="Créer un club" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.category}
					onPress={() => {
						setModalAddAdminVisible(true)
					}}
				>
					<AdminButton text="Ajouter un admin" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.category}
					onPress={() => {
						setModalDeleteAdminVisible(true)
					}}
				>
					<AdminButton text="Retirer un admin" />
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
	modal: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.2)",
	},
})

export default Admin
