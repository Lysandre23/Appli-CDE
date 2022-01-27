import * as React from "react"
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Api from "../Api"
import { useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = ({ onTokenUpdate }) => {
	const navigation = useNavigation()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [password_confirm, setPasswordConfirm] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [verificationCode, setVerificationCode] = useState("")
	const [action, setAction] = useState("S'enregistrer")
	const [title, setTitle] = useState("Connexion") // "Connexion", "Enregistrement", "Vérification", "Réinitialisation mot de passe"

	const handleSubmit = () => {
		if (title === "Connexion") {
			login()
		} else if (title === "Enregistrement") {
			register()
		} else if (title === "Vérification") {
			sendVerificationCode()
		} else if (title === "Réinitialisation mot de passe") {
			resetPasswordMail()
		}
	}

	const resendConfirmationMail = () => {
		let form = new FormData()
		form.append("email", email)
		Api.post("/user/resend-confirmation-email/", form)
	}

	const resetPasswordMail = () => {
		let form = new FormData()
		form.append("email", email)
		Api.post("/user/reset-password/send-email/", form)
	}

	const login = () => {
		let form = new FormData()
		form.append("email", email)
		form.append("password", password)

		Api.post("/user/login/", form).then(function (response) {
			onTokenUpdate(response.data.token)
			AsyncStorage.setItem("cde-token", response.data.token)
			setPassword("")
			setEmail("")
			navigation.navigate("Events")
		})
	}

	const sendVerificationCode = () => {
		let form = new FormData()
		form.append("email", email)
		form.append("secret_word", verificationCode)

		Api.post("/user/confirm-email/", form).then(function (response) {
			setVerificationCode("")
			setTitle("Connexion")
		})
	}

	const register = () => {
		let form = new FormData()
		form.append("email", email)
		form.append("password", password)
		form.append("password_confirm", password_confirm)
		form.append("first_name", firstName)
		form.append("last_name", lastName)

		Api.post("/user/signup/", form).then(function (response) {
			setPassword("")
			setFirstName("")
			setLastName("")
			setPasswordConfirm("")
			setTitle("Vérification")
		})
	}

	return (
		<View style={styles.main}>
			<View style={styles.logoCDE}>
				<Image
					style={styles.img}
					source={require("../assets/CDELogo.png")}
				/>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					{title}
				</Text>
			</View>
			<View style={styles.form}>
				<View>
					<TextInput
						style={[styles.inputTop, styles.input]}
						onChangeText={setEmail}
						value={email}
						placeholder="E-mail"
					/>
					{title == "Enregistrement" ? (
						<TextInput
							style={styles.input}
							onChangeText={setFirstName}
							value={firstName}
							placeholder="Prénom"
						/>
					) : null}
					{title == "Enregistrement" ? (
						<TextInput
							style={styles.input}
							onChangeText={setLastName}
							value={lastName}
							placeholder="Nom"
						/>
					) : null}
					{title == "Enregistrement" || title === "Connexion" ? (
						<TextInput
							style={[styles.inputBottom, styles.input]}
							onChangeText={setPassword}
							value={password}
							placeholder="Mot de passe"
						/>
					) : null}
					{title == "Enregistrement" ? (
						<TextInput
							style={styles.input}
							onChangeText={setPasswordConfirm}
							value={password_confirm}
							placeholder="Mot de passe (confirmation)"
						/>
					) : null}
					{title == "Vérification" ? (
						<TextInput
							style={styles.input}
							onChangeText={setVerificationCode}
							value={verificationCode}
							placeholder="Code de vérification"
						/>
					) : null}
					{title == "Connexion" ? (
						<TouchableOpacity
							style={styles.forgetPassword}
							onPress={() =>
								setTitle("Réinitialisation mot de passe")
							}
						>
							<Text
								style={{
									color: "rgb(180,180,180)",
								}}
							>
								Mot de passe oublié
							</Text>
						</TouchableOpacity>
					) : (
						<View></View>
					)}
					{title == "Vérification" ? (
						<TouchableOpacity
							style={styles.forgetPassword}
							onPress={resendConfirmationMail}
						>
							<Text
								style={{
									color: "rgb(180,180,180)",
								}}
							>
								Renvoyer code de vérification
							</Text>
						</TouchableOpacity>
					) : (
						<View></View>
					)}
					<TouchableOpacity
						style={styles.confirmButton}
						onPress={handleSubmit}
					>
						<Icon
							color="white"
							name="arrow-right"
							size={30}
							style={{
								backgroundColor: "#da291c",
								padding: 15,
								borderRadius: 100,
							}}
						/>
					</TouchableOpacity>
				</View>
			</View>
			{title === "Connexion" || title === "Enregistrement" ? (
				<TouchableOpacity
					style={styles.registerButton}
					onPress={() => {
						if (title == "Connexion") {
							setTitle("Enregistrement")
							setAction("Se connecter")
						} else {
							setTitle("Connexion")
							setAction("S'enregistrer")
						}
					}}
				>
					<Text style={styles.registerTextButton}>{action}</Text>
				</TouchableOpacity>
			) : null}
			<Image
				style={{
					width: "100%",
					height: "35%",
					position: "absolute",
					top: -25,
				}}
				source={require("../assets/svg1.png")}
			/>
			<Image
				style={{
					width: "100%",
					height: "35%",
					position: "absolute",
					bottom: -25,
				}}
				source={require("../assets/svg2.png")}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "rgb(250,250,250)",
	},
	bt: {
		position: "absolute",
		top: "20%",
		left: "50%",
	},
	logoCDE: {
		position: "absolute",
		width: "100%",
		top: "15%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	img: {
		width: 100,
		height: 100,
	},
	form: {
		position: "absolute",
		width: "85%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	},
	confirmButton: {
		position: "absolute",
		top: "50%",
		left: "100%",
		transform: [{ translateX: -30 }, { translateY: -30 }],
		borderRadius: 100,
		overflow: "hidden",
	},
	inputTop: {
		borderTopRightRadius: 100,
	},
	inputBottom: {
		borderBottomRightRadius: 100,
	},
	input: {
		fontSize: 20,
		borderColor: "rgb(220,220,220)",
		padding: 10,
		borderWidth: 1,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 15,
	},
	registerButton: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 15,
		padding: 10,
		borderTopRightRadius: 100,
		borderBottomRightRadius: 100,
		width: "50%",
		top: "70%",
		zIndex: 5,
	},
	registerTextButton: {
		color: "#da291c",
		fontSize: 25,
		textAlign: "center",
	},
	forgetPassword: {
		marginTop: "30%",
		marginLeft: 5,
		position: "absolute",
	},
})

export default Login
