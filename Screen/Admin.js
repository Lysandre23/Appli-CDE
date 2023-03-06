import React from "react"
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Modal,
	TextInput,
	ActivityIndicator
} from "react-native"
<<<<<<< HEAD
import { Picker } from "react-native-dropdown-picker"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import AdminButton from "../Components/AdminButton"
=======
import { Picker } from "@react-native-picker/picker"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
//import AdminButton from "../Components/AdminButton"
>>>>>>> parent of 1faefc6 (all deletes)
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import modalStyle from "./Modal.style.js"
import { useEffect } from "react"
import Api from "../Api"
<<<<<<< HEAD
import ListModal from "../Components/ListModal"
import { showMessage, hideMessage } from "react-native-flash-message"
import { pickImageUtils, getPictureInput, filesPost } from "../helpers/helpers"
import GlobalButton from "../Components/GlobalButton"
=======
//import ListModal from "../Components/ListModal"
import { showMessage, hideMessage } from "react-native-flash-message"
import { pickImageUtils, getPictureInput, filesPost } from "../helpers/helpers"
import GlobalButton from "../Components/GlobalButton"
//import ListModalMessage from "../Components/ListModalMessage";
//import ListModalItem from "../Components/ListModalItem";
//import BigButton from "../Components/BigButton";
import Icon from "react-native-vector-icons/FontAwesome";
>>>>>>> parent of 1faefc6 (all deletes)

const Admin = (props) => {
	const navigation = useNavigation()

	const [modalClubVisible, setModalClubVisible] = useState(false)
	const [nameNewClub, setNameNewClub] = useState("")
	const [descriptionNewClub, setDescriptionNewClub] = useState("")
	const [imageNewClub, setImageNewClub] = useState(null)
	const [image64NewClub, setImage64NewClub] = useState(null)
	const [selectedOfficeNewClub, setSelectedOfficeNewClub] = useState(0)

	const [modalOfficeVisible, setModalOfficeVisible] = useState(false)
	const [nameNewOffice, setNameNewOffice] = useState("")
	const [descriptionNewOffice, setDescriptionNewOffice] = useState("")
	const [imageNewOffice, setImageNewOffice] = useState(null)
	const [image64NewOffice, setImage64NewOffice] = useState(null)

	const [modalAddAdminVisible, setModalAddAdminVisible] = useState(false)
<<<<<<< HEAD

	const [modalDeleteAdminVisible, setModalDeleteAdminVisible] =
		useState(false)

	const [modalListClubVisible, setModalListClubVisible] = useState(false)
=======
	const [modalDeleteAdminVisible, setModalDeleteAdminVisible] = useState(false)
	const [modalListClubVisible, setModalListClubVisible] = useState(false)
	const [modalConfirmVisible, setModalConfirmVisible] = useState(false)
>>>>>>> parent of 1faefc6 (all deletes)

	const [offices, setOffices] = useState([])
	const [admins, setAdmins] = useState([])
	const [users, setUsers] = useState([])

	const [isError, setIsError] = useState(false)
	const [isClubCreationLoading, setIsClubCreationLoading] = useState(false)
	const [isOfficeCreationLoading, setIsOfficeCreationLoading] = useState(false)

	useEffect(() => {
		getOffices()
		getAdmins()
		getUsers()
	}, [])

	const getOffices = () => {
<<<<<<< HEAD
		Api.get("/offices").then(function (response) {
			setOffices(response.data.data)
		})
=======
		Api.get("/offices")
		.then(function (response) {
			setOffices(response.data.data)
		}).catch((e) => console.error("getOffices", e))
>>>>>>> parent of 1faefc6 (all deletes)
	}

	const getAdmins = () => {
		Api.get("/admins", {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setAdmins(response.data.data)
<<<<<<< HEAD
		})
=======
			console.log(response.data.data)
		}).catch((e) => console.error("getAdmins", e))

>>>>>>> parent of 1faefc6 (all deletes)
	}

	const getUsers = () => {
		Api.get("/users/list", {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setUsers(response.data.data)
<<<<<<< HEAD
		})
=======
		}).catch((e) => console.error("getUsers", e))

>>>>>>> parent of 1faefc6 (all deletes)
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

	const pickImageClub = async () => {
		const result = await pickImageUtils(true)
		if (result.status) {
			setImageNewClub(result.image)
			setImage64NewClub(result.imageBase64)
		}
	}

	const pickImageOffice = async () => {
		const result = await pickImageUtils(true)
		if (result.status) {
			setImageNewOffice(result.image)
			setImage64NewOffice(result.imageBase64)
		}
	}

	const storeClub = async () => {
		if (imageNewClub) {
			let form = new FormData()

			form.append(
				"picture",
				getPictureInput(imageNewClub, image64NewClub)
			)
			form.append("name", nameNewClub)
			form.append("description", descriptionNewClub)
			form.append("office_id", selectedOfficeNewClub)

<<<<<<< HEAD
			filesPost("/clubs", props.token, form, () => {
=======
			await filesPost("/clubs", props.token, form, () => {
>>>>>>> parent of 1faefc6 (all deletes)
				setModalClubVisible(false)
				setImageNewClub(null)
				setImage64NewClub(null)
				setNameNewClub("")
				setDescriptionNewClub("")
				getOffices()
			})
		}
	}

	const storeOffice = async () => {
		if (imageNewOffice) {
			let form = new FormData()

			form.append(
				"picture",
				getPictureInput(imageNewOffice, image64NewOffice)
			)
			form.append("name", nameNewOffice)
			form.append("description", descriptionNewOffice)

<<<<<<< HEAD
			filesPost("/offices", props.token, form, () => {
=======
			await filesPost("/offices", props.token, form, () => {
>>>>>>> parent of 1faefc6 (all deletes)
				getOffices()
				setModalOfficeVisible(false)
				setImageNewOffice(null)
				setImage64NewOffice(null)
				setNameNewOffice("")
				setDescriptionNewOffice("")
			})
		}
	}

	const storeAdmin = (id) => {
		Api.post(
			"/admins",
			{
				user_id: id,
			},
			{
				headers: {
					Authorization: `Bearer ${props.token}`,
				},
			}
		)
			.then(function (response) {
				setModalAddAdminVisible(false)
				getAdmins()
				showMessage({
					message: response.data.message,
					type: "success",
				})
			})
			.catch(function (error) {
				showMessage({
					message: "Une erreur s'est produite. Veuillez réessayer.",
					type: "danger",
				})
				throw error
			})
	}

<<<<<<< HEAD
	const serializeAdmins = (admins) => {
=======
	const serializeUsers = () => {
		let array = []
		users.forEach((item) => {
			array.push({
				value: item.id,
				label: item.first_name + " " + item.last_name,
			})
		})
		return array
	}

	const serializeAdmins = () => {
>>>>>>> parent of 1faefc6 (all deletes)
		let array = []
		admins.forEach((item) => {
			array.push({
				value: item.id,
				label: item.first_name + " " + item.last_name,
			})
		})
		return array
	}

<<<<<<< HEAD
	const serializeOffices = (offices) => {
=======
	const serializeOffices = () => {
>>>>>>> parent of 1faefc6 (all deletes)
		let array = []
		offices.forEach((item) => {
			array.push({
				value: "o-" + item.id,
				label: item.name,
<<<<<<< HEAD
=======
				id: item.id,
>>>>>>> parent of 1faefc6 (all deletes)
			})
		})
		offices.forEach((item) => {
			item.clubs.forEach((club) => {
				array.push({
					value: "c-" + club.id,
					label: club.name,
<<<<<<< HEAD
=======
					id: club.id,
>>>>>>> parent of 1faefc6 (all deletes)
				})
			})
		})
		return array
	}

	const deleteAdmin = (id) => {
		Api.delete("/admins/" + id, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		})
			.then(function (response) {
				getAdmins()
				showMessage({
					message: response.data.message,
					type: "success",
				})
			})
			.catch(function (error) {
				showMessage({
					message: "Une erreur s'est produite. Veuillez réessayer.",
					type: "danger",
				})
				throw error
			})
	}

	const goToClub = (id) => {
		const splitted = id.split("-")
		if (splitted[0] === "c") {
			navigation.navigate("GestionClub", {
				id: splitted[1],
			})
		} else if (splitted[0] === "o") {
			navigation.navigate("GestionOffice", {
				id: splitted[1],
			})
		}
	}

	return (
		<View style={styles.main}>
			<Header title="ADMIN" color="#da291c" user={props.user} />
<<<<<<< HEAD
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
						<Text style={modalStyle.title}>Création d'un club</Text>
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
							<Text style={modalStyle.textImagePicker}>
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
						{isError ? <Text style={modalStyle.errorText}>Erreur détectée</Text> : null}
						<View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
							<GlobalButton onPress={storeClub} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
						</View>
						<View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
							<GlobalButton onPress={handleCloseClubModal} padding={6} borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
						</View>
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
						<Text style={modalStyle.title}>
							Création d'un bureau
						</Text>
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
							<Text style={modalStyle.textImagePicker}>
								Choisir une image
							</Text>
						</TouchableOpacity>
						{isError ? <Text style={modalStyle.errorText}>Erreur détectée</Text> : null}
						<View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
							<GlobalButton onPress={storeOffice} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
						</View>
						<View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
							<GlobalButton onPress={handleCloseOfficeModal} padding={6} borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
						</View>
					</View>
				</View>
			</Modal>
			<ListModal
				title="Ajouter un admin"
				visible={modalAddAdminVisible}
				list={serializeAdmins(
					users.filter(
						(item) => !admins.find((admin) => admin.id === item.id)
					)
				)}
				selectable={true}
				onClose={() => setModalAddAdminVisible(!modalAddAdminVisible)}
				onConfirm={storeAdmin}
			/>

			<ListModal
				title="Retirer un admin"
				visible={modalDeleteAdminVisible}
				list={serializeAdmins(admins)}
				selectable={true}
				onClose={() =>
					setModalDeleteAdminVisible(!modalDeleteAdminVisible)
				}
				onConfirm={deleteAdmin}
			/>

			<ListModal
				title="Aller à la gestion"
				visible={modalListClubVisible}
				list={serializeOffices(offices)}
				selectable={true}
				onClose={() => setModalListClubVisible(!modalListClubVisible)}
				onConfirm={goToClub}
			/>

			<ScrollView>
				<AdminButton
					onPress={() => {
						setModalOfficeVisible(true)
					}}
					text="Créer un bureau"
				/>
				<AdminButton
					onPress={() => {
						setModalClubVisible(true)
					}}
					text="Créer un club"
				/>
				<AdminButton
					onPress={() => {
						setModalAddAdminVisible(true)
					}}
					text="Ajouter un admin"
				/>
				<AdminButton
					onPress={() => {
						setModalDeleteAdminVisible(true)
					}}
					text="Retirer un admin"
				/>
				<AdminButton
					onPress={() => {
						setModalListClubVisible(true)
					}}
					text="Allez à la gestion"
				/>
=======
			<ScrollView>
				<View>
					{/* Gestion */}

					<TouchableOpacity style={styles.adminButton} onPress={() => setModalListClubVisible(true)}>
						<Text style={{fontSize: 25}}>Aller à la gestion</Text>
					</TouchableOpacity>
					<Modal animationType="fade" visible={modalListClubVisible} transparent={true}
						onRequestClose={() => setModalListClubVisible(false)}>
						<View style={styles.modal}>
							<View style={{display: 'flex', flexDirection: 'row'}}>
								<Text style={styles.modalHeader}>Gestion</Text>
								<TouchableOpacity
									style={styles.closeBtn}
									onPress={() => setModalListClubVisible(false)}
								>
									<Icon name="close" size={50} color="#fff" />
								</TouchableOpacity>
							</View>
							<ScrollView>
								{serializeOffices(offices).map((item) =>
									<View style={{width: '90%'}} key={item.id}>
										<TouchableOpacity
											style={{width: '100%', marginLeft: '5%'}}
											onPress={() => {setModalListClubVisible(false); goToClub(item.value)}}>
											<View style={styles.listModalItem}>
												<Text style={{fontSize: 25}}>
													{item.label}
												</Text>
											</View>
										</TouchableOpacity>
									</View>
								)}
							</ScrollView>
						</View>
					</Modal>

					{/* Creation bureau */}

					<TouchableOpacity style={styles.adminButton} onPress={() => setModalOfficeVisible(true)}>
						<Text style={{fontSize: 25}}>Créer un bureau</Text>
					</TouchableOpacity>
					<Modal animationType="fade" transparent={true} visible={modalOfficeVisible}
						onRequestClose={() => setModalOfficeVisible(false)}>
						<View style={[styles.modal, {justifyContent: 'center',
							alignItems: 'center'}]}>
							<View style={modalStyle.addPanel}>
								<Text style={modalStyle.title}>Création d'un bureau</Text>
								<TextInput style={modalStyle.input} placeholder="Nom" value={nameNewOffice}
									onChangeText={setNameNewOffice}
								/>
								<TextInput style={modalStyle.input} placeholder="Description"
									value={descriptionNewOffice} onChangeText={setDescriptionNewOffice}
								/>
								<TouchableOpacity style={modalStyle.imagePicker} onPress={pickImageOffice}
								>
									<Text style={modalStyle.textImagePicker}>
										Choisir une image
									</Text>
								</TouchableOpacity>
								{isError ? <Text style={modalStyle.errorText}>Erreur détectée</Text> : null}
								<View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
									<GlobalButton onPress={storeOffice} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
								</View>
								<View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
									<GlobalButton onPress={handleCloseOfficeModal} padding={6}
										borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
								</View>
							</View>
						</View>
					</Modal>

					{/* Creation club */}

					<TouchableOpacity style={styles.adminButton} onPress={() => setModalClubVisible(true)}>
						<Text style={{fontSize: 25}}>Créer un club</Text>
					</TouchableOpacity>
					<Modal animationType="fade" transparent={true} visible={modalClubVisible}
						onRequestClose={() => setModalClubVisible(false)}>
						<View style={[styles.modal, {justifyContent: 'center', alignItems: 'center'}]}>
							<View style={modalStyle.addPanel}>
								<Text style={modalStyle.title}>Création d'un club</Text>
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
									<Text style={modalStyle.textImagePicker}>
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
								{isError ? <Text style={modalStyle.errorText}>Erreur détectée</Text> : null}
								<View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
									<GlobalButton onPress={storeClub} padding={6} borderRadius={5} text="Valider"
												  color="#2ecc71"/>
								</View>
								<View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
									<GlobalButton onPress={handleCloseClubModal} padding={6} borderRadius={5}
												  textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
								</View>
							</View>
						</View>
					</Modal>

					{/* Ajout admin */}

					<TouchableOpacity style={styles.adminButton} onPress={() => {
						setModalAddAdminVisible(true)
						getUsers()
						console.log(serializeUsers())
					}}>
						<Text style={{fontSize: 25}}>Ajouter un admin</Text>
					</TouchableOpacity>
					<Modal animationType="fade" visible={modalAddAdminVisible} transparent={true}
						onRequestClose={() => setModalAddAdminVisible(false)}>
						<View style={styles.modal}>
							<View style={{display: 'flex', flexDirection: 'row'}}>
								<Text style={styles.modalHeader}>Ajout d'un admin</Text>
								<TouchableOpacity style={styles.closeBtn} onPress={() => setModalAddAdminVisible(false)}>
									<Icon name="close" size={50} color="#fff" />
								</TouchableOpacity>
							</View>
							<ScrollView>
								{serializeUsers().map((item) =>
									<TouchableOpacity key={item.id}
										style={{width: '90%', marginLeft: '5%'}}
										onPress={() => {storeAdmin(item.id)}}>
										<View style={styles.listModalItem}>
											<Text style={{fontSize: 25}}>
												{item.name}
											</Text>
										</View>
									</TouchableOpacity>
								)}
							</ScrollView>
						</View>
					</Modal>

					{/* Suppression admin */}

					<TouchableOpacity style={styles.adminButton} onPress={() => setModalDeleteAdminVisible(true)}>
						<Text style={{fontSize: 25}}>Supprimer un admin</Text>
					</TouchableOpacity>
					<Modal animationType="fade" transparent={true} visible={modalDeleteAdminVisible}
						   onRequestClose={() => setModalDeleteAdminVisible(false)}>
						<View style={styles.modal}>
							<View style={{display: 'flex', flexDirection: 'row'}}>
								<Text style={styles.modalHeader}>Suppression d'un admin</Text>
								<TouchableOpacity
									style={styles.closeBtn}
									onPress={() => setModalDeleteAdminVisible(false)}
								>
									<Icon name="close" size={50} color="#fff" />
								</TouchableOpacity>
							</View>
							<ScrollView style={styles.list}>
								{serializeAdmins(users.filter((item) => !admins.some((admin) => admin.id === item.id)))
									.map((item) =>
								<View style={{width: '90%'}} key={item.id}>
									<TouchableOpacity style={{width: '100%', marginLeft: '5%'}} onPress={
										() => setModalConfirmVisible(true) && deleteAdmin(item.id)}>
										<Text>{item.name}</Text>
									</TouchableOpacity>
									<Modal animationType="fade" visible={modalConfirmVisible} transparent={true}
										onRequestClose={() => {return false}}>
										<TouchableOpacity onPress={() => {return true}}>
											<Text>Supprimer</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => {return false}}>
											<Text>Annuler</Text>
										</TouchableOpacity>
									</Modal>
								</View>)}
							</ScrollView>
						</View>
					</Modal>
				</View>
>>>>>>> parent of 1faefc6 (all deletes)
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
<<<<<<< HEAD
		backgroundColor: "rgba(0,0,0,0.2)",
	},
=======
		backgroundColor: "rgba(0,0,0,0.8)",
	},
	modalHeader: {
		position: 'relative',
		left: '25%',
		fontSize: 25,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		marginBottom: 40,
		marginTop: 32,
	},
	listModalItem: {
		width: "100%",
		backgroundColor: "white",
		display: "flex",
		alignItems: "center",
		padding: 10,
		borderRadius: 10,
		marginBottom: 15,
	},
	closeBtn: {
		position: "absolute",
		right: 10,
		top: 25,
		color: "white",
	},
	adminButton: {
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
	}
>>>>>>> parent of 1faefc6 (all deletes)
})

export default Admin
