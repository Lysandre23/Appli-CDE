import * as React from "react"
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	FlatList,
	Modal,
	TouchableOpacity,
	Platform,
} from "react-native"
import { Picker } from "react-native-dropdown-picker"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"
import Api, { baseUrlAPI } from "../Api"
import modalStyle from "./Modal.style"
import OfficeGoodies from "../Components/OfficeGoodies"
import EndFlatList from "../Components/EndFlatList"
import Circle from "../Components/Circle"
import { showMessage, hideMessage } from "react-native-flash-message"
import { pickImageUtils, getPictureInput, filesPost } from "../helpers/helpers"

const Goodies = (props) => {
	const [storeModalVisible, setStoreModalVisible] = useState(false)
	const [nameNewGoodie, setNameNewGoodie] = useState("")
	const [priceNewGoodie, setPriceNewGoodie] = useState("")
	const [imageNewGoodie, setImageNewGoodie] = useState(null)
	const [image64NewGoodie, setImage64NewGoodie] = useState(null)
	const [selectedOffice, setSelectedOffice] = useState(0)

	const [deleteModalVisible, setDeleteModalVisible] = useState(false)

	const [pendingDelete, setPendingDelete] = useState(null)
	const [pendingEdit, setPendingEdit] = useState(null)

	const [officesGoodies, setOfficesGoodies] = useState([])
	const [isFetchingGoodies, setIsFetchingGoodies] = useState(false)
	const [offices, setOffices] = useState([])
	const [isError, setIsError] = useState(false)

	const pickImage = async () => {
		const result = await pickImageUtils(true)
		if (result.status) {
			setImageNewGoodie(result.image)
			setImage64NewGoodie(result.imageBase64)
		}
	}

	useEffect(() => {
		getGoodies()
		getOffices()
	}, [])

	const handleCloseStoreModal = () => {
		setStoreModalVisible(false)
		setImageNewGoodie(null)
		setNameNewGoodie("")
		setPriceNewGoodie("")
		setSelectedOffice(0)
		setPendingEdit(null)
	}

	const getOffices = () => {
		Api.get("/offices").then(function (response) {
			setOffices(response.data.data)
		})
	}

	const getGoodies = () => {
		setIsFetchingGoodies(true)
		Api.get("/goodies").then((response) => {
			setOfficesGoodies(response.data.data)
			setIsFetchingGoodies(false)
		})
	}

	const handleSubmitStore = () => {
		if (pendingEdit === null) {
			storeGoodies()
		} else {
			updateGoodies()
		}
	}

	const handleDelete = (id) => {
		setPendingDelete(id)
		setDeleteModalVisible(true)
	}

	const confirmDelete = () => {
		Api.delete("/goodies/" + pendingDelete, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${props.token}`,
			},
		})
			.then(function (response) {
				setPendingDelete(null)
				setDeleteModalVisible(false)
				getGoodies()
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

	const cancelDelete = () => {
		setDeleteModalVisible(false)
		setPendingDelete(null)
	}

	const handleEdit = (id) => {
		for (let i = 0; i < officesGoodies.length; i++) {
			for (let j = 0; j < officesGoodies[i].goodies.length; j++) {
				if (officesGoodies[i].goodies[j].id === id) {
					setPendingEdit(officesGoodies[i].goodies[j])
					setNameNewGoodie(officesGoodies[i].goodies[j].name)
					setPriceNewGoodie(
						officesGoodies[i].goodies[j].price.toString()
					)
					setStoreModalVisible(true)
				}
			}
		}
	}

	const storeGoodies = async () => {
		if (imageNewGoodie) {
			let form = new FormData()

			form.append(
				"picture",
				getPictureInput(imageNewGoodie, image64NewGoodie)
			)
			form.append("name", nameNewGoodie)
			form.append("price", priceNewGoodie)
			form.append("office_id", selectedOffice)

			filesPost("/goodies", props.token, form, () => {
				getGoodies()
				setStoreModalVisible(false)
				setImageNewGoodie(null)
				setImage64NewGoodie(null)
				setNameNewGoodie("")
				setPriceNewGoodie("")
				setSelectedOffice(0)
			})
		}
	}

	const updateGoodies = async () => {
		let form = new FormData()

		if (imageNewGoodie) {
			form.append(
				"picture",
				getPictureInput(imageNewGoodie, image64NewGoodie)
			)
		}
		form.append("name", nameNewGoodie)
		form.append("price", priceNewGoodie)

		// pas de formdata avec un PUT donc on spoof avec un POST
		filesPost(
			"/goodies/" + pendingEdit.id + "?_method=PUT",
			props.token,
			form,
			() => {
				getPartners()
				setStoreModalVisible(false)
				setImageNewPart(null)
				setImage64NewPart(null)
				setNameNewPart("")
				setUrlNewPart("")
			}
		)
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="GOODIES" user={props.user} />
			<Circle />
			{props.user.is_admin || props.user.office_responsible.length > 0 ? (
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => {
						setStoreModalVisible(true)
					}}
				>
					<Text style={{ color: "white", fontSize: 18 }}>
						Ajouter un goodie
					</Text>
				</TouchableOpacity>
			) : (
				<View></View>
			)}
			{props.user.is_admin || props.user.office_responsible.length > 0 ? (
				<Modal
					animationType="fade"
					transparent={true}
					visible={storeModalVisible}
					onRequestClose={() => {
						setStoreModalVisible(!storeModalVisible)
					}}
				>
					<View style={modalStyle.modal}>
						<View style={modalStyle.addPanel}>
							<Text style={modalStyle.title}>
								{(pendingEdit ? "Mise à jour" : "Création") +
									" d'un goodie"}
							</Text>
							<TextInput
								style={modalStyle.input}
								placeholder="Nom"
								value={nameNewGoodie}
								onChangeText={setNameNewGoodie}
							/>
							<TextInput
								style={modalStyle.input}
								placeholder="Prix"
								value={priceNewGoodie}
								onChangeText={setPriceNewGoodie}
							/>
							<TouchableOpacity
								style={modalStyle.imagePicker}
								onPress={pickImage}
							>
								<Text style={modalStyle.textImagePicker}>
									{imageNewGoodie == null ?
									(pendingEdit
										? "Modifier l'image"
										: "Choisir une image")
									:
										"Image sélectionée"
									}
								</Text>
							</TouchableOpacity>
							{!pendingEdit ? (
								<Picker
									selectedValue={selectedOffice}
									style={modalStyle.picker}
									onValueChange={(itemValue, itemIndex) =>
										setSelectedOffice(itemValue)
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
							) : null}
							{isError ? <Text style={modalStyle.errorText}>Erreur détectée</Text> : null}
							<TouchableOpacity
								style={modalStyle.confirmButton}
								onPress={handleSubmitStore}
							>
								<Text style={modalStyle.confirmText}>
									Valider
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={modalStyle.cancelButton}
								onPress={() => {
									handleCloseStoreModal()
								}}
							>
								<Text style={modalStyle.cancelText}>
									Annuler
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			) : null}
			{props.user.is_admin ? (
				<Modal
					animationType="fade"
					transparent={true}
					visible={deleteModalVisible}
					onRequestClose={() => {
						setDeleteModalVisible(!deleteModalVisible)
					}}
				>
					<View style={modalStyle.modal}>
						<View style={modalStyle.addPanel}>
							<Text style={modalStyle.title}>
								Supprimer ce goodie
							</Text>
							<TouchableOpacity
								style={modalStyle.confirmButton}
								onPress={confirmDelete}
							>
								<Text style={modalStyle.confirmText}>
									Valider
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={modalStyle.cancelButton}
								onPress={cancelDelete}
							>
								<Text style={modalStyle.cancelText}>
									Annuler
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			) : null}
			<FlatList
				data={officesGoodies}
				onRefresh={() => getGoodies()}
				refreshing={isFetchingGoodies}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) =>
					item.goodies.length > 0 ? (
						<OfficeGoodies
							name={item.name}
							goodiesList={item.goodies}
							user={props.user}
							key={item.id}
							onDelete={handleDelete}
							onEdit={handleEdit}
						/>
					) : null
				}
				ListFooterComponent={() => <EndFlatList />}
			></FlatList>

			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		overflow: "hidden",
	},
	addButton: {
		zIndex: 2,
		backgroundColor: "#da291c",
		padding: 10,
		borderRadius: 100,
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
})

export default Goodies
