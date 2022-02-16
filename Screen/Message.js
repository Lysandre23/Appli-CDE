import * as React from "react"
import { useState, useEffect } from "react"
import {
	View,
	Text,
	StyleSheet,
	Picker,
	TextInput,
	TouchableOpacity,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import Api from "../Api"
import { useRoute } from "@react-navigation/core"
import Circle from "../Components/Circle"

const Message = (props) => {
	const route = useRoute()
	const [selectedClub, setSelectedClub] = useState(
		typeof route.params !== "undefined" && route.params.preClub !== null
			? route.params.preClub
			: 0
	)
	const [message, setMessage] = useState("")
	const [anonymous, setAnonymous] = useState(false)
	const [clubs, setClubs] = useState([{ id: 1, name: "" }])

	useEffect(() => {
		getOfficesAndClubs()
	}, [])

	const getOfficesAndClubs = () => {
		Api.get("/offices").then(function (response) {
			let officesAndClubs = []
			response.data.data.forEach(function (office) {
				officesAndClubs.push({
					id: "o-" + office.id,
					name: office.name,
					type: "office",
				})
			})
			response.data.data.forEach(function (office) {
				office.clubs.forEach(function (club) {
					officesAndClubs.push({
						id: "c-" + club.id,
						name: club.name,
						type: "club",
					})
				})
			})
			setClubs(officesAndClubs)
		})
	}

	const postMessage = () => {
		const splittedValue = selectedClub.split("-")
		let url = ""
		let payload = null
		if (splittedValue[0] === "c") {
			payload = {
				club_id: splittedValue[1],
				content: message,
				is_anonymous: anonymous,
			}
			url = "/clubs/messages"
		} else if (splittedValue[0] === "o") {
			payload = {
				office_id: splittedValue[1],
				content: message,
				is_anonymous: anonymous,
			}
			url = "/offices/messages"
		}
		Api.post(url, payload, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${props.token}`,
			},
		})
			.then(function (response) {
				setMessage("")
				setAnonymous(false)
				setSelectedClub(0)
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

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="MESSAGE" user={props.user} />
			<Circle />
			<Picker
				selectedValue={selectedClub}
				style={styles.picker}
				onValueChange={(itemValue, itemIndex) =>
					setSelectedClub(itemValue)
				}
			>
				<Picker.Item
					key={0}
					label="Bureau ou club"
					value={0}
					enabled={false}
				/>
				{clubs.map((item) => (
					<Picker.Item
						key={item.type + item.id}
						label={item.name}
						value={item.id}
					/>
				))}
			</Picker>
			<TextInput
				style={styles.input}
				value={message}
				onChangeText={setMessage}
				placeholder="Message"
				multiline={true}
				numberOfLines={10}
				maxLength={200}
			/>
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
					text="Rester anonyme"
					iconStyle={{ borderColor: "#da291c" }}
					textStyle={{
						textDecorationLine: "none",
					}}
					onPress={(isChecked) => {
						setAnonymous(isChecked)
					}}
				/>
			</View>
			<TouchableOpacity style={styles.sendButton} onPress={postMessage}>
				<Text style={{ color: "white", textAlign: "center" }}>
					Envoyer
				</Text>
			</TouchableOpacity>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		overflow: "hidden",
	},
	picker: {
		width: "80%",
		marginLeft: "10%",
		marginTop: 15,
	},
	input: {
		width: "80%",
		marginLeft: "10%",
		marginTop: 15,
		borderColor: "rgb(200,200,200)",
		borderWidth: 1,
		padding: 5,
		backgroundColor: "white",
		borderRadius: 10,
		zIndex: 3,
	},
	sendButton: {
		marginTop: 15,
		width: "50%",
		marginLeft: "25%",
		backgroundColor: "#da291c",
		padding: 10,
		borderRadius: 100,
	},
})

export default Message
