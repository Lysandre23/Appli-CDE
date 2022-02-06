import React from "react";
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
import modalStyle from "../Screen/Modal.style"

const Office = (props) => {
    const navigation = useNavigation()
	const route = useRoute()
	const [modalMembresVisible, setModalMembresVisible] = useState(false)
    const [office, setOffice] = useState({
        id: null,
        name: "",
        description: ""
    })

    useEffect(() => {
		if (route.params.id !== office.id) {
			// getOffice()
		}
	})

    return (
        <View style={styles.main}>
            <Header
				color="#da291c"
				title={office.name.toUpperCase()}
				user={props.user}
			/>
            <View style={styles.head}>
				<Image
					style={styles.img}
					source={require("../assets/event.jpg")}
				/>
				<View style={styles.headButton}>
					{props.user.email ? (
						<TouchableOpacity
							style={styles.bt}
							onPress={() => {}}
						>
							<Text style={styles.btText}>Suivre</Text>
						</TouchableOpacity>
					) : null}
					<TouchableOpacity
						style={styles.bt}
						onPress={() => {
							setModalMembresVisible(true)
						}}
					>
						<Text style={styles.btText}>Membres</Text>
					</TouchableOpacity>
					{props.user.email ? (
						<TouchableOpacity
							style={styles.bt}
							onPress={() => {
								navigation.navigate("Message", {
									preClub: "c-" + office.id,
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
				
			</ScrollView>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalMembresVisible}
				onRequestClose={() => {
					setModalMembresVisible(!modalMembresVisible)
				}}
			>
				<View style={modalStyle.modal}>
					<View style={modalStyle.addPanel}>
						
					</View>
				</View>
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

export default Office