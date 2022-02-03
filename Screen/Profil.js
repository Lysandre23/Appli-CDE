import React from "react"
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Modal,
	TextInput,
	Text,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import AdminButton from "../Components/AdminButton"
import modalStyle from "./Modal.style"
import { useState } from "react"

const Profil = (props) => {
	const [modalPasswordVisible, setModalPasswordVisible] = useState(false)
	const [newPassword, setNewPassword] = useState("")
	const [confirmedPassword, setConfirmedPassword] = useState("")

	const resetModalNewPassword = () => {
		setNewPassword("")
		setConfirmedPassword("")
		setModalPasswordVisible(false)
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="PROFIL" user={props.user} />
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalPasswordVisible}
				onRequestClose={() => {
					setModalPasswordVisible(!modalPasswordVisible)
				}}
			>
				<View style={modalStyle.modal}>
					<View style={modalStyle.addPanel}>
						<TextInput
							style={modalStyle.input}
							placeholder="Nouveau mot de passe"
							value={newPassword}
							onChangeText={setNewPassword}
						/>
						<TextInput
							style={modalStyle.input}
							placeholder="Confirmation du nouveau mot de passe"
							value={confirmedPassword}
							onChangeText={setConfirmedPassword}
						/>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={() => {}}
						>
							<Text style={modalStyle.textBT}>Valider</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={() => {
								resetModalNewPassword()
							}}
						>
							<Text style={modalStyle.textBT}>Annuler</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<TouchableOpacity
				onPress={() => {
					setModalPasswordVisible(true)
				}}
			>
				<AdminButton text="Changer de mot de passe" />
			</TouchableOpacity>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
})

export default Profil
