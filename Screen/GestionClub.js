import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Modal,
	TextInput,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import RedLine from "../Components/RedLine"
import { useState, useEffect } from "react"
import EventsCard from "../Components/EventsCard"
import { useRoute } from "@react-navigation/core"
import Api from "../Api"
import AdminButton from "../Components/AdminButton"
import ListModal from "../Components/ListModal"

const GestionClub = (props) => {
	const route = useRoute()
	const [modalPresVisible, setModalPresVisible] = useState(false)
	const [modalPostVisible, setModalPostVisible] = useState(false)
	const [presText, setPresText] = useState("")
	const [titleNewPost, setTitleNewPost] = useState(null)
	const [descriptionNewPost, setDescriptionNewPost] = useState(null)
	const [club, setClub] = useState({
		id: null,
		name: "",
		description: "",
	})

	const [modalAddMemberVisible, setModalAddMemberVisible] = useState(false)
	const [modalRemoveMemberVisible, setModalRemoveMemberVisible] =
		useState(false)
	const [modalAddResponsibleVisible, setModalAddResponsibleVisible] =
		useState(false)
	const [modalRemoveResponsibleVisible, setModalRemoveResponsibleVisible] =
		useState(false)

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

	const handleAddResponsible = () => {}
	const handleRemoveResponsible = () => {}
	const handleAddMember = () => {}
	const handleRemoveMember = () => {}

	return (
		<View style={styles.main}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalPresVisible}
				onRequestClose={() => {
					setModalPresVisible(!modalPresVisible)
				}}
			>
				<View style={styles.modal}>
					<View style={styles.panel}>
						<TextInput
							placeholder="Texte de présentation de club/bureau"
							value={presText}
							onChangeText={setPresText}
							style={styles.input}
							multiline={true}
							numberOfLines={10}
							maxLength={200}
						/>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								setModalPresVisible(false)
							}}
						>
							<Text style={styles.btModalText}>Enregistrer</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalPostVisible}
				onRequestClose={() => {
					setModalPresVisible(!modalPostVisible)
				}}
			>
				<View style={styles.modal}>
					<View style={styles.panel}>
						<TextInput
							placeholder="Titre"
							value={titleNewPost}
							onTextChange={setTitleNewPost}
							style={styles.input}
						/>
						<TextInput
							placeholder="Description"
							value={descriptionNewPost}
							onTextChange={setDescriptionNewPost}
							style={styles.input}
							multiline={true}
							numberOfLines={3}
							maxLength={200}
						/>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								setModalPostVisible(false)
							}}
						>
							<Text style={styles.btModalText}>Valider</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<ListModal
				title="Ajouter un membre"
				visible={modalAddMemberVisible}
				list={serializeUsers(users)}
				selectable={true}
				onClose={() => setModalAddMemberVisible(!modalAddMemberVisible)}
				onConfirm={handleAddResponsible}
			/>
			<ListModal
				title="Retirer un membre"
				visible={modalRemoveMemberVisible}
				list={serializeUsers(members)}
				selectable={true}
				onClose={() =>
					setModalRemoveMemberVisible(!modalRemoveMemberVisible)
				}
				onConfirm={handleRemoveResponsible}
			/>
			<ListModal
				title="Ajouter un responsible"
				visible={modalAddResponsibleVisible}
				list={serializeUsers(members)}
				selectable={true}
				onClose={() =>
					setModalAddResponsibleVisible(!modalAddResponsibleVisible)
				}
				onConfirm={handleAddMember}
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
				onConfirm={handleRemoveMember}
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
					source={club.picture}
					style={{
						width: 100,
						height: 100,
						borderRadius: 15,
					}}
				/>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					{club.name}
				</Text>
			</View>
			<RedLine />
			<AdminButton text="Modifier le club" />
			<AdminButton text="Ecrire un nouveau post" />
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
