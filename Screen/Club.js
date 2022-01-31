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
import Api from "../Api"

const Club = (props) => {
	const navigation = useNavigation()
	const route = useRoute()
	const [membresVisible, setMembresVisible] = useState(false)
	const [club, setClub] = useState({
		id: null,
		name: "",
		description: "",
	})

	useEffect(() => {
		if (route.params.id !== club.id) {
			getClub()
		}
	})

	const getClub = () => {
		Api.get("/clubs/" + route.params.id).then(function (response) {
			setClub(response.data.data)
		})
	}

	return (
		<View style={styles.main}>
			<Header
				color="#da291c"
				title={club.name.toUpperCase()}
				user={props.user}
			/>
			<View style={styles.head}>
				<Image
					style={styles.img}
					source={require("../assets/event.jpg")}
				/>
				<View style={styles.headButton}>
					{props.user.email ? (
						<TouchableOpacity style={styles.bt} onPress={() => {}}>
							<Text style={styles.btText}>Suivre</Text>
						</TouchableOpacity>
					) : null}
					<TouchableOpacity
						style={styles.bt}
						onPress={() => {
							setMembresVisible(true)
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
				<EventsCard
					title="Event"
					date="27/10/2021"
					src={require("../assets/event.jpg")}
					description=""
				/>
			</ScrollView>
			<Modal
				animationType="fade"
				transparent={true}
				visible={membresVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible)
				}}
			>
				<View style={styles.modal}></View>
			</Modal>
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
		borderRadius: 100,
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
})

export default Club
