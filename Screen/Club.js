import * as React from "react"
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	Modal,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import Icon from "react-native-vector-icons/FontAwesome"
import EventsCard from "../Components/EventsCard"
import { useNavigation, useRoute } from "@react-navigation/core"
import { useState, useEffect } from "react"
import ListModal from "../Components/ListModal"
import Api from "../Api"
import modalStyle from "../Screen/Modal.style"
import Circle from "../Components/Circle"

const Club = (props) => {
	const navigation = useNavigation()
	const route = useRoute()
	const [modalMemberVisible, setModalMemberVisible] = useState(false)
	const [deleteModalVisible, setDeleteModalVisible] = useState(false)

	const [pendingDelete, setPendingDelete] = useState(null)
	const [pendingEdit, setPendingEdit] = useState(null)

	const [club, setClub] = useState({
		id: null,
		name: "",
		description: "",
	})

	const [members, setMembers] = useState([])
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if (route.params.id !== club.id) {
			getClub()
			getMembers()
			getPosts()
		}
	})

	const getClub = () => {
		Api.get("/clubs/" + route.params.id, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setClub(response.data.data)
		})
	}

	const getMembers = () => {
		Api.get("/clubs/members/" + route.params.id).then(function (response) {
			setMembers(response.data.data)
		})
	}

	const getPosts = () => {
		Api.get("/clubs/posts/" + route.params.id).then(function (response) {
			setPosts(response.data.data)
		})
	}

	const handleClickFollow = () => {
		Api.post(
			"/subscribings",
			{
				club_id: club.id,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			}
		).then(function (response) {
			getClub()
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

	const handleDelete = (id) => {
		setPendingDelete(id)
		setDeleteModalVisible(true)
	}

	const cancelDelete = () => {
		setDeleteModalVisible(false)
		setPendingDelete(null)
	}

	const confirmDelete = () => {
		Api.delete("/clubs/posts/" + pendingDelete, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setPendingDelete(null)
			setDeleteModalVisible(false)
			getPosts()
		})
	}

	return (
		<View style={styles.main}>
			<Circle />
			<ListModal
				title="Membres du club"
				visible={modalMemberVisible}
				list={serializeUsers(members)}
				selectable={false}
				onClose={() => setModalMemberVisible(false)}
			/>

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
							<TouchableOpacity
								style={modalStyle.bt}
								onPress={confirmDelete}
							>
								<Text style={modalStyle.textBT}>Valider</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={modalStyle.bt}
								onPress={cancelDelete}
							>
								<Text style={modalStyle.textBT}>Annuler</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			) : null}

			<Header
				color="#da291c"
				title={club.name.toUpperCase()}
				user={props.user}
			/>
			<View style={styles.head}>
				<Image style={styles.img} source={{ uri: club.picture }} />
				<View style={styles.headButton}>
					{props.user.email ? (
						<TouchableOpacity
							style={styles.bt}
							onPress={handleClickFollow}
						>
							<Text style={styles.btText}>
								{club.is_followed ? "Ne plus suivre" : "Suivre"}
							</Text>
						</TouchableOpacity>
					) : null}
					<TouchableOpacity
						style={styles.bt}
						onPress={() => {
							setModalMemberVisible(true)
						}}
					>
						<Text style={styles.btText}>Membres</Text>
					</TouchableOpacity>
					{props.user.email ? (
						<TouchableOpacity
							style={styles.bt}
							onPress={() => {
								navigation.navigate("Message", {
									preClub: "c-" + club.id,
								})
							}}
						>
							<Icon name="envelope-o" size={20} color="#fff" />
						</TouchableOpacity>
					) : null}
				</View>
			</View>
			<View style={styles.presText}>
				<Text>{club.description}</Text>
			</View>
			<View style={styles.line}></View>
			<ScrollView style={styles.list}>
				{posts.map((post) => (
					<EventsCard
						key={post.id}
						id={post.id}
						user={props.user}
						description={post.description}
						title={post.title}
						date={post.start_date}
						image={post.picture}
						editable={true}
						onDelete={handleDelete}
					/>
				))}
			</ScrollView>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "rgb(250,250,250)",
		overflow: 'hidden'
	},
	head: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginTop: 20,
	},
	img: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},
	headButton: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	bt: {
		borderRadius: 7,
		padding: 10,
		fontSize: 20,
		marginRight: 5,
		backgroundColor: "#da291c",
	},
	btText: {
		color: "white",
		fontWeight: "500",
	},
	presText: {
		width: "100%",
		textAlign: "justify",
		marginTop: 15,
		width: "90%",
		marginLeft: "5%",
	},
	line: {
		width: "90%",
		height: 2,
		borderWidth: 1,
		borderColor: "#da291c",
		borderRadius: 2,
		marginLeft: "5%",
		marginTop: 20,
	},
	
})

export default Club
