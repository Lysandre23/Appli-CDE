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
import { useState } from "react"
import EventsCard from "../Components/EventsCard"
// Aller chercher les droits de l'user pour voir quel club il gère

const GestionClub = ({ route }) => {
	const { name, slug, email, presentationText, messages } = route.params
	const [modalPresVisible, setModalPresVisible] = useState(false)
	const [modalPostVisible, setModalPostVisible] = useState(false)
	const [presText, setPresText] = useState(presentationText)
	const [titleNewPost, setTitleNewPost] = useState(null)
	const [descriptionNewPost, setDescriptionNewPost] = useState(null)
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
			<Header title="GESTION DE CLUB" color="#da291c" />
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
					source={require("../assets/event.jpg")}
					style={{
						width: 100,
						height: 100,
						borderRadius: 15,
					}}
				/>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
			</View>
			<TouchableOpacity
				style={styles.bt}
				onPress={() => {
					setModalPresVisible(true)
				}}
			>
				<Text style={styles.btText}>Modifier la présentation</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.bt}
				onPress={() => {
					setModalPostVisible(true)
				}}
			>
				<Text style={styles.btText}>Ecrire un nouveau post</Text>
			</TouchableOpacity>
			<RedLine />
			<Navbar color="#da291c" />
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
