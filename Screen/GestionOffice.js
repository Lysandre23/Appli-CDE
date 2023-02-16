import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Modal,
	TextInput,
	ScrollView,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import RedLine from "../Components/RedLine"
import { useState, useEffect } from "react"
import { useRoute } from "@react-navigation/core"
import Api from "../Api"
//import AdminButton from "../Components/AdminButton"
import ListModal from "../Components/ListModal"
import modalStyle from "./Modal.style.js"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import DateTimePicker from "@react-native-community/datetimepicker"
import { showMessage, hideMessage } from "react-native-flash-message"
import { pickImageUtils, getPictureInput, filesPost } from "../helpers/helpers"
import GlobalButton from "../Components/GlobalButton"

const GestionOffice = (props) => {
	const route = useRoute()

	const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
	const [nameUpdateOffice, setNameUpdateOffice] = useState("")
	const [descriptionUpdateOffice, setDescriptionUpdateOffice] = useState("")
	const [imageUpdateOffice, setImageUpdateOffice] = useState(null)
	const [image64UpdateOffice, setImage64UpdateOffice] = useState(null)
	const [roomUpdateOffice, setRoomUpdateOffice] = useState("")

	const [modalPostVisible, setModalPostVisible] = useState(false)
	const [titlePost, setTitlePost] = useState("")
	const [descriptionPost, setDescriptionPost] = useState("")
	const [imagePost, setImagePost] = useState(null)
	const [image64Post, setImage64Post] = useState(null)
	const [datePost, setDatePost] = useState(new Date())
	const [enableNotificationPost, setEnableNotificationPost] = useState(false)

	const [modalMessagesVisible, setModalMessagesVisible] = useState(false)
	const [modalAddMemberVisible, setModalAddMemberVisible] = useState(false)
	const [modalRemoveMemberVisible, setModalRemoveMemberVisible] = useState(false)
	const [modalAddResponsibleVisible, setModalAddResponsibleVisible] = useState(false)
	const [modalRemoveResponsibleVisible, setModalRemoveResponsibleVisible] = useState(false)

	const [office, setOffice] = useState({
		id: null,
		name: "",
		description: "",
	})

	const [messages, setMessages] = useState([])

	const [users, setUsers] = useState([])
	const [members, setMembers] = useState([])
	const [responsibles, setResponsibles] = useState([])
	const [onChangeDate, setOnChangeDate] = useState(false)

	const [isError, setIsError] = useState(false)

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
			response.data.data.room ??
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
		const result = await pickImageUtils(true)
		if (result.status) {
			setImageUpdateOffice(result.image)
			setImage64UpdateOffice(result.imageBase64)
		}
	}

	const pickImagePost = async () => {
		const result = await pickImageUtils()
		if (result.status) {
			setImagePost(result.image)
			setImage64Post(result.imageBase64)
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

	const handleChangeDate = (event, value) => {
		console.log("date : " + value)
		const currentDate = value || datePost
		setDatePost(currentDate)
	}

	const updateOffice = async () => {
		let form = new FormData()
		if (imageUpdateOffice) {
			form.append(
				"picture",
				getPictureInput(imageUpdateOffice, image64UpdateOffice)
			)
		}
		form.append("name", nameUpdateOffice)
		form.append("description", descriptionUpdateOffice)
		form.append("room", roomUpdateOffice)

		filesPost(
			"/offices/" + route.params.id + "?_method=PUT",
			props.token,
			form,
			() => {
				setModalUpdateVisible(false)
				setImageUpdateOffice(null)
				setImage64UpdateOffice(null)
				getOffice()
			}
		)
	}

	const storePost = async () => {
		if (imagePost) {
			let form = new FormData()

			form.append("picture", getPictureInput(imagePost, image64Post))
			form.append("title", titlePost)
			form.append("description", descriptionPost)
			form.append("enable_notifications", enableNotificationPost)
			form.append("office_id", office.id)

			filesPost("/offices/posts", props.token, form, () => {
				setModalPostVisible(false)
				setTitlePost("")
				setDatePost("")
				setDescriptionPost("")
				setImagePost(null)
				setImage64Post(null)
				setEnableNotificationPost(false)
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
					setModalUpdateVisible(false)
				}}
			>
				<View style={modalStyle.modal}>
					<View style={modalStyle.addPanel}>
						<Text style={modalStyle.title}>Modifier le bureau</Text>
						<TextInput
							style={modalStyle.input}
							placeholder="Nom*"
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
							<Text style={modalStyle.textImagePicker}>
								{imageUpdateOffice == null
									? "Choisir une image*"
									: "Image sélectionée"}
							</Text>
						</TouchableOpacity>
						{isError ? (
							<Text style={modalStyle.errorText}>
								Erreur détectée
							</Text>
						) : null}
						<Text style={{fontSize: 8, textAlign: "center"}}>Les champs marqués d'un astérisque sont obligatoires</Text>
						<View style={{marginLeft: 20, marginRight: 20, marginTop: 5}}>
							<GlobalButton onPress={updateOffice} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
						</View>
						<View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
							<GlobalButton onPress={handleCloseOfficeModal} padding={6} borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
						</View>
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
				<View style={modalStyle.modal}>
					<View style={modalStyle.addPanel}>
						<Text style={modalStyle.title}>Nouveau post</Text>
						<TextInput
							style={modalStyle.input}
							placeholder="Titre"
							value={titlePost}
							onChangeText={setTitlePost}
						/>
						<TextInput
							style={modalStyle.input}
							placeholder="Description"
							value={descriptionPost}
							onChangeText={setDescriptionPost}
							multiline={true}
							numberOfLines={3}
							maxLength={200}
						/>
						{onChangeDate &&
							<DateTimePicker
								testID="dateTimePicker"
								value={datePost}
								mode={"date"}
								is24Hour={true}
								display="default"
								onChange={handleChangeDate}
							/>
						}
						<TouchableOpacity
							style={modalStyle.imagePicker}
							onPress={pickImagePost}
						>
							<Text style={modalStyle.textImagePicker}>
								{imagePost == null
									? "Choisir une image"
									: "Image sélectionée"}
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
						{isError ? (
							<Text style={modalStyle.errorText}>
								Erreur détectée
							</Text>
						) : null}
						<View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
							<GlobalButton onPress={storePost} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
						</View>
						<View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
							<GlobalButton onPress={handleClosePostModal} padding={6} borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
						</View>
					</View>
				</View>
			</Modal>

			<ListModal
				title="Messages"
				visible={modalMessagesVisible}
				type="messages"
				list={messages}
				selectable={false}
				onClose={() => setModalMessagesVisible(false)}
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
				onClose={() => setModalAddMemberVisible(false)}
				onConfirm={handleToggleMember}
			/>
			<ListModal
				title="Retirer un membre"
				visible={modalRemoveMemberVisible}
				list={serializeUsers(members)}
				selectable={true}
				onClose={() =>
					setModalRemoveMemberVisible(false)
				}
				onConfirm={handleToggleMember}
			/>
			<ListModal
				title="Ajouter un responsable"
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
					setModalAddResponsibleVisible(false)
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

			<Header title="GESTION DE BUREAU" color="#da291c" user={props.user} />
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
			<ScrollView style={{maxHeight: "55%"}}>
				<TouchableOpacity style={styles.adminButton} onPress={() => setModalMessagesVisible(true)}>
					<Text style={{fontSize: 25}}>Messages</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.adminButton} onPress={() => setModalUpdateVisible(true)}>
					<Text style={{fontSize: 25}}>Modifier le bureau</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.adminButton} onPress={() => setModalPostVisible(true)}>
					<Text style={{fontSize: 25}}>Ecrire un nouveau post</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.adminButton} onPress={() => setModalAddResponsibleVisible(true)}>
					<Text style={{fontSize: 25}}>Ajouter un responsable</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.adminButton} onPress={() => setModalRemoveResponsibleVisible(true)}>
					<Text style={{fontSize: 25}}>Retirer un responsable</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.adminButton} onPress={() => setModalAddMemberVisible(true)}>
					<Text style={{fontSize: 25}}>Ajouter un membre</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.adminButton} onPress={() => setModalRemoveMemberVisible(true)}>
					<Text style={{fontSize: 25}}>Retirer un membre</Text>
				</TouchableOpacity>
			</ScrollView>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "rgb(250,250,250)",
	},
	adminButton: {
		height: 55,
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
