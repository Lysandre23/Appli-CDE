import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Modal,
	TextInput,
	Platform,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import RedLine from "../Components/RedLine"
import { useState, useEffect } from "react"
import { useRoute } from "@react-navigation/core"
import Api from "../Api"
import AdminButton from "../Components/AdminButton"
import ListModal from "../Components/ListModal"
import modalStyle from "./Modal.style.js"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import * as ImagePicker from "expo-image-picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { showMessage, hideMessage } from "react-native-flash-message"

const GestionOffice = (props) => {
	const route = useRoute()

	const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
	const [nameUpdateOffice, setNameUpdateOffice] = useState("")
	const [descriptionUpdateOffice, setDescriptionUpdateOffice] = useState("")
	const [imageUpdateOffice, setImageUpdateOffice] = useState(null)
	const [roomUpdateOffice, setRoomUpdateOffice] = useState("")

	const [modalPostVisible, setModalPostVisible] = useState(false)
	const [titlePost, setTitlePost] = useState("")
	const [descriptionPost, setDescriptionPost] = useState("")
	const [imagePost, setImagePost] = useState(null)
	const [datePost, setDatePost] = useState("")
	const [enableNotificationPost, setEnableNotificationPost] = useState(false)

	const [modalMessagesVisible, setModalMessagesVisible] = useState(false)
	const [modalAddMemberVisible, setModalAddMemberVisible] = useState(false)
	const [modalRemoveMemberVisible, setModalRemoveMemberVisible] =
		useState(false)
	const [modalAddResponsibleVisible, setModalAddResponsibleVisible] =
		useState(false)
	const [modalRemoveResponsibleVisible, setModalRemoveResponsibleVisible] =
		useState(false)

	const [office, setOffice] = useState({
		id: null,
		name: "",
		description: "",
	})

	const [messages, setMessages] = useState([])

	const [users, setUsers] = useState([])
	const [members, setMembers] = useState([])
	const [responsibles, setResponsibles] = useState([])

	useEffect(() => {
		getUsers()
		if (parseInt(route.params.id) !== office.id) {
			getOffice()
			getMembers()
			getResponsibles()
			getMessages()
		}
	}, [office])

	const getOffice = () => {
		Api.get("/offices/" + route.params.id).then(function (response) {
			setOffice(response.data.data)
			setNameUpdateOffice(response.data.data.name)
			setDescriptionUpdateOffice(response.data.data.description)
			setRoomUpdateOffice(response.data.data.room)
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

	const getMembers = () => {
		Api.get("/offices/members/" + route.params.id, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setMembers(response.data.data)
		})
	}

	const getResponsibles = () => {
		Api.get("/offices/responsibles/" + route.params.id, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setResponsibles(response.data.data)
		})
	}

	const getMessages = () => {
		Api.get("/offices/messages/" + route.params.id, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then((response) => {
			setMessages(response.data.data)
		})
	}

	const serializeUsers = (users) => {
		let array = []
		users.forEach((item) => {
			array.push({
				value: item.id,
				label: item.first_name + " " + item.last_name,
			})
		})
		return array
	}

	const handleToggleResponsible = (userId) => {
		Api.post(
			"/offices/responsibles",
			{
				user_id: userId,
				office_id: office.id,
			},
			{
				headers: {
					Authorization: `Bearer ${props.token}`,
				},
			}
		)
			.then(function (response) {
				getMembers()
				getResponsibles()
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

	const handleToggleMember = (userId) => {
		Api.post(
			"/offices/members",
			{
				user_id: userId,
				office_id: office.id,
			},
			{
				headers: {
					Authorization: `Bearer ${props.token}`,
				},
			}
		)
			.then(function (response) {
				getMembers()
				getResponsibles()
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

	const pickImageOffice = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.cancelled) {
			setImageUpdateOffice(result)
		}
	}

	const pickImagePost = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.cancelled) {
			setImagePost(result)
		}
	}

	const handleCloseOfficeModal = () => {
		setModalUpdateVisible(false)
	}

	const handleClosePostModal = () => {
		setModalPostVisible(false)
		setTitlePost("")
		setDescriptionPost("")
		setImagePost(null)
	}

	const updateOffice = () => {
		let form = new FormData()
		if (imageUpdateOffice) {
			form.append(
				"picture",
				JSON.stringify({
					uri:
						Platform.OS === "ios"
							? imageUpdateOffice.uri.replace("file://", "")
							: imageUpdateOffice.uri,
					name: imageUpdateOffice.fileName,
					type: imageUpdateOffice.type,
				})
			)
		}
		form.append("name", nameUpdateOffice)
		form.append("description", descriptionUpdateOffice)
		form.append("room", roomUpdateOffice)

		Api.post("/offices/" + office.id + "?_method=PUT", form, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${props.token}`,
			},
		})
			.then(function (response) {
				setModalUpdateVisible(false)
				setImageUpdateOffice(null)
				getOffice()
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

	const storePost = () => {
		if (imagePost) {
			let form = new FormData()

			form.append("title", titlePost)
			form.append("description", descriptionPost)
			form.append(
				"picture",
				JSON.stringify({
					uri:
						Platform.OS === "ios"
							? imagePost.uri.replace("file://", "")
							: imagePost.uri,
					name: imagePost.fileName,
					type: imagePost.type,
				})
			)
			form.append("enable_notifications", enableNotificationPost)
			form.append("office_id", office.id)
			Api.post("/offices/posts", form, {
				headers: {
					"Content-Type": "multipart/form-data",
					Accept: "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			})
				.then((response) => {
					setModalPostVisible(false)
					setTitlePost("")
					setDatePost("")
					setDescriptionPost("")
					setImagePost(null)
					setEnableNotificationPost(false)
					showMessage({
						message: response.data.message,
						type: "success",
					})
				})
				.catch(function (error) {
					showMessage({
						message:
							"Une erreur s'est produite. Veuillez réessayer.",
						type: "danger",
					})
					throw error
				})
		}
	}

	return (
		<View style={styles.main}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalUpdateVisible}
				onRequestClose={() => {
					setModalUpdateVisible(!modalUpdateVisible)
				}}
			>
				<View style={modalStyle.modal}>
					<View style={modalStyle.addPanel}>
						<TextInput
							style={modalStyle.input}
							placeholder="Nom"
							value={nameUpdateOffice}
							onChangeText={setNameUpdateOffice}
						/>
						<TextInput
							style={modalStyle.input}
							placeholder="Description"
							value={descriptionUpdateOffice}
							onChangeText={setDescriptionUpdateOffice}
						/>
						<TextInput
							style={modalStyle.input}
							placeholder="Salle"
							value={roomUpdateOffice}
							onChangeText={setRoomUpdateOffice}
						/>
						<TouchableOpacity
							style={modalStyle.imagePicker}
							onPress={pickImageOffice}
						>
							<Text style={{ textAlign: "center" }}>
								Modifier l'image
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={updateOffice}
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
				visible={modalPostVisible}
				onRequestClose={() => {
					setModalPostVisible(!modalPostVisible)
				}}
			>
				<View style={styles.modal}>
					<View style={styles.panel}>
						<TextInput
							style={modalStyle.input}
							placeholder="Title"
							value={titlePost}
							onChangeText={setTitlePost}
						/>
						<TextInput
							style={styles.input}
							placeholder="Description"
							value={descriptionPost}
							onChangeText={setDescriptionPost}
							multiline={true}
							numberOfLines={3}
							maxLength={200}
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={datePost}
							mode={"date"}
							is24Hour={true}
							display="default"
							onChange={setDatePost}
						/>
						<TouchableOpacity
							style={modalStyle.imagePicker}
							onPress={pickImagePost}
						>
							<Text style={{ textAlign: "center" }}>
								Choisir une image
							</Text>
						</TouchableOpacity>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								marginTop: 15,
							}}
						>
							<BouncyCheckbox
								size={25}
								fillColor="#da291c"
								unfillColor="#FFFFFF"
								text="Activer les notifications"
								iconStyle={{ borderColor: "#da291c" }}
								textStyle={{
									textDecorationLine: "none",
								}}
								onPress={(isChecked) => {
									setEnableNotificationPost(isChecked)
								}}
							/>
						</View>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								storePost()
							}}
						>
							<Text style={styles.btModalText}>Valider</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								handleClosePostModal(false)
							}}
						>
							<Text style={styles.btModalText}>Annuler</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<ListModal
				title="Messages"
				visible={modalMessagesVisible}
				type="messages"
				list={messages}
				selectable={false}
				onClose={() => setModalMessagesVisible(!modalMessagesVisible)}
			/>
			<ListModal
				title="Ajouter un membre"
				visible={modalAddMemberVisible}
				list={serializeUsers(
					users.filter(
						(item) =>
							!members.find((member) => member.id === item.id)
					)
				)}
				selectable={true}
				onClose={() => setModalAddMemberVisible(!modalAddMemberVisible)}
				onConfirm={handleToggleMember}
			/>
			<ListModal
				title="Retirer un membre"
				visible={modalRemoveMemberVisible}
				list={serializeUsers(members)}
				selectable={true}
				onClose={() =>
					setModalRemoveMemberVisible(!modalRemoveMemberVisible)
				}
				onConfirm={handleToggleMember}
			/>
			<ListModal
				title="Ajouter un responsible"
				visible={modalAddResponsibleVisible}
				list={serializeUsers(
					members.filter(
						(item) =>
							!responsibles.find(
								(responsible) => responsible.id === item.id
							)
					)
				)}
				selectable={true}
				onClose={() =>
					setModalAddResponsibleVisible(!modalAddResponsibleVisible)
				}
				onConfirm={handleToggleResponsible}
			/>
			<ListModal
				title="Retirer un responsable"
				visible={modalRemoveResponsibleVisible}
				list={serializeUsers(responsibles)}
				selectable={true}
				onClose={() =>
					setModalRemoveResponsibleVisible(
						!modalRemoveResponsibleVisible
					)
				}
				onConfirm={handleToggleResponsible}
			/>

			<Header title="GESTION DE CLUB" color="#da291c" user={props.user} />
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
					alignItems: "center",
					marginTop: 25,
				}}
			>
				<Image
					source={{ uri: office.picture }}
					style={{
						width: 100,
						height: 100,
						borderRadius: 15,
					}}
				/>
				<View>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							marginBottom: 5,
						}}
					>
						{office.name}
					</Text>
					<Text style={{ fontSize: 17 }}>
						{responsibles.length +
							" responsable" +
							(responsibles.length > 1 ? "s" : "")}
					</Text>
					<Text style={{ fontSize: 17 }}>
						{members.length +
							" membre" +
							(members.length > 1 ? "s" : "")}
					</Text>
				</View>
			</View>
			<RedLine />
			<AdminButton
				text="Messages"
				onPress={() => setModalMessagesVisible(true)}
			/>
			<AdminButton
				text="Modifier le bureau"
				onPress={() => setModalUpdateVisible(true)}
			/>
			<AdminButton
				text="Ecrire un nouveau post"
				onPress={() => setModalPostVisible(true)}
			/>
			<AdminButton
				text="Ajouter un responsable"
				onPress={() => setModalAddResponsibleVisible(true)}
			/>
			<AdminButton
				text="Retirer un responsable"
				onPress={() => setModalRemoveResponsibleVisible(true)}
			/>
			<AdminButton
				text="Ajouter un membre"
				onPress={() => setModalAddMemberVisible(true)}
			/>
			<AdminButton
				text="Retirer un membre"
				onPress={() => setModalRemoveMemberVisible(true)}
			/>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "rgb(250,250,250)",
	},
	bt: {
		marginTop: 15,
		borderColor: "#da291c",
		borderWidth: 2,
		padding: 10,
		borderRadius: 10,
		width: "80%",
		marginLeft: "10%",
		backgroundColor: "white",
	},
	btText: {
		fontSize: 20,
		textAlign: "center",
	},
	modalButton: {
		marginTop: 10,
		backgroundColor: "#da291c",
		padding: 9,
		borderRadius: 100,
	},
	modal: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.15)",
	},
	panel: {
		backgroundColor: "white",
		width: "70%",
		padding: 50,
		borderRadius: 20,
		display: "flex",
		flexDirection: "column",
	},
	btModalText: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
	},
	input: {
		width: "100%",
		borderColor: "rgb(200,200,200)",
		borderWidth: 1,
		borderRadius: 7,
		padding: 5,
		marginBottom: 5,
	},
})

export default GestionOffice
