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

const Office = (props) => {
	const navigation = useNavigation()
	const route = useRoute()
	const [modalMemberVisible, setModalMemberVisible] = useState(false)
	const [deleteModalVisible, setDeleteModalVisible] = useState(false)

	const [pendingDelete, setPendingDelete] = useState(null)
	const [pendingEdit, setPendingEdit] = useState(null)

	const [office, setOffice] = useState({
		id: null,
		name: "",
		description: "",
	})

	const [members, setMembers] = useState([])
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if (route.params.id !== office.id) {
			getOffice()
			getMembers()
			getPosts()
		}
	})

	const getOffice = () => {
		Api.get("/offices/" + route.params.id, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setOffice(response.data.data)
		})
	}

	const getMembers = () => {
		Api.get("/offices/members/" + route.params.id).then(function (
			response
		) {
			setMembers(response.data.data)
		})
	}

	const getPosts = () => {
		Api.get("/offices/posts/" + route.params.id).then(function (response) {
			setPosts(response.data.data)
		})
	}

	const handleClickFollow = () => {
		Api.post(
			"/subscribings",
			{
				office_id: office.id,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			}
		).then(function (response) {
			getOffice()
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
		Api.delete("/offices/posts/" + pendingDelete, {
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
			<ListModal
				title="Membres du office"
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
					<View style={styles.modal}>
						<View style={styles.addPanel}>
							<TouchableOpacity
								style={styles.bt}
								onPress={confirmDelete}
							>
								<Text style={styles.textBT}>Valider</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.bt}
								onPress={cancelDelete}
							>
								<Text style={styles.textBT}>Annuler</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			) : null}

			<Header
				color="#da291c"
				title={office.name.toUpperCase()}
				user={props.user}
			/>
			<View style={styles.head}>
				<Image style={styles.img} source={{ uri: office.picture }} />
				<View style={styles.headButton}>
					{props.user.email ? (
						<TouchableOpacity
							style={styles.bt}
							onPress={handleClickFollow}
						>
							<Text style={styles.btText}>
								{office.is_followed
									? "Ne plus suivre"
									: "Suivre"}
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
									preOffice: "c-" + office.id,
								})
							}}
						>
							<Icon name="envelope-o" size={20} color="#fff" />
						</TouchableOpacity>
					) : null}
				</View>
			</View>
			<View style={styles.presText}>
				<Text>{office.description}</Text>
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
})

export default Office
