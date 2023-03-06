import * as React from "react"
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView, BackHandler
} from "react-native"
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView"
import { useNavigation } from "@react-navigation/native"
import Api from "../Api"
import { useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage"
import FlashMessage, { showMessage } from "react-native-flash-message"
//import useIsKeyboardShown from "react-native-paper/lib/typescript/utils/useIsKeyboardShown";
import keyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

const Login = (props) => {
	const navigation = useNavigation()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [password_confirm, setPasswordConfirm] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [verificationCode, setVerificationCode] = useState("")
	const [action, setAction] = useState("S'enregistrer")
	const [title, setTitle] = useState("Connexion") // "Connexion", "Enregistrement", "Vérification", "Réinitialisation mot de passe"
	const [wrongMessage, setWrongMessage] = useState(false)
	const [isKeyboardShown, setIsKeyboardShown] = useState(false)

	const [formError, setFormError] = useState("")
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [password_confirmError, setPassword_confirmError] = useState(false)
	const [firstNameError, setFirstNameError] = useState(false)
	const [lastNameError, setLastNameError] = useState(false)

	let passwordInput
	let firstnameInput
	let lastnameInput
	let passwordConfirmInput

	BackHandler.addEventListener("hardwareBackPress", ()=>{
		switch(title) {
			case "Connexion":
				navigation.navigate("Events")
				break
			case "Enregistrement":
				setTitle("Connexion")
				break
			case "Réinitialisation mot de passe":
				setTitle("Connexion")
				break
			default:
				navigation.navigate("Events")
				break
		}
		return true
	})

	const handleBack = () => {
		if (title === "Réinitialisation mot de passe") {
			setTitle("Connexion")
		} else {
			navigation.navigate("Events")
		}
	}

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
		Api.post("/password/email", form).then(function (response) {
			setTitle("Connexion")
		})
	}

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	}

	const login = () => {
		setEmailError(false)
		setPasswordError(false)
		if (email !== "" && password !== "") {
			if (!validateEmail(email)) {
				setEmailError(true)
				setFormError("L'adresse email doit être valide")
				return
			}
			Api.post("/login", {
				email: email,
				password: password,
			})
				.then(function (response) {
					props.onTokenUpdate(response.data.data.token)
					AsyncStorage.setItem("cde-token", response.data.data.token).catch(() => console.error("failed storing token"))
					setPassword("")
					setEmail("")
					showMessage({
						message: "Connexion réussie",
						type: "success",
					})
					navigation.navigate("Events")
				})
				.catch((error) => {
					showMessage({
						message: "Erreur login",
						type: "error"
					})
					console.log(error)
					setPassword("")
					setFormError(error.response.data.data.error)
					throw error
				})
		} else {
			if (email === "") {
				setEmailError(true)
				showMessage({
					message: "E-mail incorrect",
					type: "error",
				});
			}
			if (password === "") {
				setPasswordError(true)
				showMessage({
					message: "E-mail incorrect",
					type: "error",
				});
			}
		}
	}

	const sendVerificationCode = () => {
		let form = new FormData()
		form.append("email", email)
		form.append("secret_word", verificationCode)

		Api.post("/user/confirm-email", form).then(function (response) {
			setVerificationCode("")
			setTitle("Connexion")
		})
	}

	const register = () => {
		let form = new FormData()
		form.append("email", email)
		form.append("password", password)
		form.append("confirm_password", password_confirm)
		form.append("first_name", firstName)
		form.append("last_name", lastName)

		Api.post("/register", {
			email: email,
			password: password,
			confirm_password: password_confirm,
			first_name: firstName,
			last_name: lastName,
		})
			.then(function (response) {
				setPassword("")
				setFirstName("")
				setLastName("")
				setPasswordConfirm("")
				setTitle("Connexion")
				showMessage({
					message: "Inscription réussie",
					type: "success",
				});
			})
			.catch((error) => {
				showMessage({
					message: "Erreur",
					type: "error",
				});
				throw error
			})
	}

	return (
		<View style={styles.main}>
			<FlashMessage position="top" />
			<TouchableOpacity
				style={{
					zIndex: 30,
					position: "absolute",
					left: 20,
					top: 50,
				}}
				onPress={handleBack}
			>
				<Icon color="white" name="arrow-left" size={30} />
			</TouchableOpacity>

			<ScrollView style={styles.inputContainer}>
				<View style={styles.logoCDE}>
					<Image
						style={styles.img}
						source={require("../assets/CDELogo.png")}
					/>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>
						{title}
					</Text>
				</View>
				<Text>{formError}</Text>
				<TextInput style={[styles.inputTop, styles.input, emailError && styles.inputError,
					{borderTopRightRadius: title === "Réinitialisation mot de passe" ? 25 : 50,
						borderBottomRightRadius: title === "Réinitialisation mot de passe" ? 25 : 0,
						borderBottomLeftRadius: title === "Réinitialisation mot de passe" ? 10 : 0}
				]}
						   onChangeText={setEmail}
						   value={email}
						   placeholder="E-mail univ-lorraine"
						   autoComplete="email"
						   autoCapitalize="none"
						   keyboardType="email-address"
						   onSubmitEditing={() => title === "Enregistrement" ? firstnameInput.focus() : passwordInput.focus()}
				/>
				{title === "Enregistrement" ? (
					<View>
						<TextInput
							ref={(input) => firstnameInput = input}
							style={[
								styles.input,
								firstNameError && styles.inputError,
							]}
							onChangeText={setFirstName}
							value={firstName}
							placeholder="Prénom"
							autoComplete="name-given"
							onSubmitEditing={() => lastnameInput.focus()}
						/>
						<TextInput
							ref={(input) => lastnameInput = input}
							style={[
								styles.input,
								lastNameError && styles.inputError,
							]}
							onChangeText={setLastName}
							value={lastName}
							placeholder="Nom"
							autoComplete="name-family"
							onSubmitEditing={() => passwordInput.focus()}
						/>
					</View>
				) : null}
				{title === "Enregistrement" || title === "Connexion" ? (
					<TextInput
						ref={(input) => passwordInput = input}
						style={[
							styles.input,
							title === "Connexion"
								? styles.inputBottom
								: null,
							passwordError && styles.inputError,
						]}
						onChangeText={setPassword}
						value={password}
						placeholder="Mot de passe"
						secureTextEntry={true}
						autoComplete="password"
						onSubmitEditing={() => title === "Enregistrement" ? passwordConfirmInput.focus() : handleSubmit()}
					/>
				) : null}
				{title === "Enregistrement" ? (
					<TextInput
						ref={(input) => passwordConfirmInput = input}
						style={[
							styles.input,
							styles.inputBottom,
							password_confirmError && styles.inputError,
						]}
						onChangeText={setPasswordConfirm}
						value={password_confirm}
						placeholder="Mot de passe (confirmation)"
						secureTextEntry={true}
					/>
				) : null}
				{title === "Vérification" ? (
					<TextInput
						style={styles.input}
						onChangeText={setVerificationCode}
						value={verificationCode}
						placeholder="Code de vérification"
					/>
				) : null}
				<View style={{marginTop: 0, position: "relative", marginLeft: 5, }}>
					{title === "Connexion" && (
						<TouchableOpacity onPress={(e) => {
							e.preventDefault()
							setTitle("Réinitialisation mot de passe")
						}} style={{ marginTop: 10,}}>
							<Text style={{color: "#aaa"}}>
								Mot de passe oublié ?
							</Text>
						</TouchableOpacity>
					)}
				</View>
				{title === "Vérification" ? (
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
				) : null}
			</ScrollView>
			<View style={{top: "75%", display: 'flex', flexDirection: "column",}}>
				<TouchableOpacity style={[styles.confirmButton, {marginBottom: 10}]} onPress={handleSubmit}>
					<Text style={[styles.registerTextButton, {color: "white"}]}>Confirmer</Text>
				</TouchableOpacity>
				{/*<Icon color="white" name="arrow-right" size={25} />*/}
				{title === "Connexion" || title === "Enregistrement" ? (
					<TouchableOpacity
						style={styles.registerButton}
						onPress={() => {
							if (title === "Connexion") {
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
			</View>
			<Image
				style={{
					width: "100%",
					position: "absolute",
					top: -50,
				}}
				source={require("../assets/svg1.png")}
			/>
			<Image
				style={{
					width: "100%",
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
		backgroundColor: "#fafafa",
	},
	inputContainer: {
		position: "absolute",
		top: 70,
		width: "90%",
		height: "58%",
		marginRight: 25,
		left: "5%",
		display: "flex",
		flexDirection: "column",
	},
	confirmButton: {
		backgroundColor: "#da291c",
		position: "relative",
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
		borderWidth: 2,
		borderLeftWidth: 0,
		borderColor: "white",
		width: "45%",
		zIndex: 5,
	},

	bt: {
		position: "absolute",
		top: "20%",
		left: "50%",
	},
	logoCDE: {
		position: "relative",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	img: {
		width: 100,
		height: 100,
	},
	form: {
	},

	inputTop: {
		borderTopRightRadius: 50,
		borderTopLeftRadius: 10,

	},
	inputBottom: {
		borderBottomRightRadius: 100,
		borderBottomLeftRadius: 20
	},
	input: {
		fontSize: 18,
		borderColor: "#aaa",
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 10,
		paddingRight: 30,
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
	inputError: {
		borderColor: "red",
	},
	registerButton: {
		backgroundColor: "black",
		position: "relative",
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
		borderWidth: 2,
		borderLeftWidth: 0,
		borderColor: "white",
		width: "50%",
		zIndex: 5,
	},
	registerTextButton: {
		color: "white",
		fontSize: 20,
		textAlign: "center",
	},
})

export default Login
