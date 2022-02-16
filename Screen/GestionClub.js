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

const GestionClub = (props) => {
	const route = useRoute()

	const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
	const [nameUpdateClub, setNameUpdateClub] = useState("")
	const [descriptionUpdateClub, setDescriptionUpdateClub] = useState("")
	const [imageUpdateClub, setImageUpdateClub] = useState(null)
	const [roomUpdateClub, setRoomUpdateClub] = useState("")

	const [modalPostVisible, setModalPostVisible] = useState(false)
	const [titlePost, setTitlePost] = useState("")
	const [descriptionPost, setDescriptionPost] = useState("")
	const [imagePost, setImagePost] = useState(null)
	const [datePost, setDatePost] = useState("")
	const [enableNotificationPost, setEnableNotificationPost] = useState(false)

	const [modalAddMemberVisible, setModalAddMemberVisible] = useState(false)
	const [modalRemoveMemberVisible, setModalRemoveMemberVisible] =
		useState(false)
	const [modalAddResponsibleVisible, setModalAddResponsibleVisible] =
		useState(false)
	const [modalRemoveResponsibleVisible, setModalRemoveResponsibleVisible] =
		useState(false)

	const [club, setClub] = useState({
		id: null,
		name: "",
		description: "",
	})

	const [users, setUsers] = useState([])
	const [members, setMembers] = useState([])
	const [responsibles, setResponsibles] = useState([])

	useEffect(() => {
		getUsers()
		if (parseInt(route.params.id) !== club.id) {
			getClub()
			getMembers()
			getResponsibles()
		}
	}, [club])

	const getClub = () => {
		Api.get("/clubs/" + route.params.id).then(function (response) {
			setClub(response.data.data)
			setNameUpdateClub(response.data.data.name)
			setDescriptionUpdateClub(response.data.data.description)
			setRoomUpdateClub(response.data.data.room)
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
		Api.get("/clubs/members/" + route.params.id, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setMembers(response.data.data)
		})
	}

	const getResponsibles = () => {
		Api.get("/clubs/responsibles/" + route.params.id, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setResponsibles(response.data.data)
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
			"/clubs/responsibles/",
			{
				user_id: userId,
				club_id: club.id,
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
			})
			.catch((error) => {
				throw error
			})
	}

	const handleToggleMember = (userId) => {
		Api.post(
			"/clubs/members/",
			{
				user_id: userId,
				club_id: club.id,
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
			})
			.catch((error) => {
				throw error
			})
	}

	const pickImageClub = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.cancelled) {
			setImageUpdateClub(result)
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

	const handleCloseClubModal = () => {
		setModalUpdateVisible(false)
	}

	const handleClosePostModal = () => {
		setModalPostVisible(false)
		setTitlePost("")
		setDescriptionPost("")
		setImagePost(null)
	}

	const updateClub = () => {
		let form = new FormData()
		if (imageUpdateClub) {
			form.append(
				"picture",
				JSON.stringify({
					uri:
						Platform.OS === "ios"
							? imageUpdateClub.uri.replace("file://", "")
							: imageUpdateClub.uri,
					name: imageUpdateClub.fileName,
					type: imageUpdateClub.type,
				})
			)
		}
		form.append("name", nameUpdateClub)
		form.append("description", descriptionUpdateClub)
		form.append("room", roomUpdateClub)

		Api.post("/clubs/" + club.id + "?_method=PUT", form, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setModalUpdateVisible(false)
			setImageUpdateClub(null)
			getClub()
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
			form.append("club_id", club.id)
			Api.post("/clubs/posts", form, {
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
				})
				.catch((error) => {
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
							value={nameUpdateClub}
							onChangeText={setNameUpdateClub}
						/>
						<TextInput
							style={modalStyle.input}
							placeholder="Description"
							value={descriptionUpdateClub}
							onChangeText={setDescriptionUpdateClub}
						/>
						<TextInput
							style={modalStyle.input}
							placeholder="Salle"
							value={roomUpdateClub}
							onChangeText={setRoomUpdateClub}
						/>
						<TouchableOpacity
							style={modalStyle.imagePicker}
							onPress={pickImageClub}
						>
							<Text style={{ textAlign: "center" }}>
								Modifier l'image
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={updateClub}
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
					source={{ uri: club.picture }}
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
						{club.name}
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
				text="Modifier le club"
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

export default GestionClub
