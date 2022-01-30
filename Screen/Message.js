import * as React from "react"
import { useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	Picker,
	TextInput,
	TouchableOpacity,
	Keyboard,
	ScrollView,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import BouncyCheckbox from "react-native-bouncy-checkbox"

import data from "../assets/clubs.json"

const dt = []
for (var i = 0; i < data.length; i++) {
	for (var j = 0; j < data[i].list.length; j++) {
		dt.push({ label: data[i].list[j].name, value: data[i].list[j].slug })
	}
}

const Message = (props) => {
	const [toggleCheckBox, setToggleCheckBox] = useState(false)
	const [selectedClub, setSelectedClub] = useState(null)
	const [message, setMessage] = useState(null)
	const [isSelected, setSelection] = useState(false)
	return (
		<View style={styles.main}>
			<Header color="#da291c" title="MESSAGE" user={props.user} />
			<Picker
				selectedValue={selectedClub}
				style={styles.picker}
				onValueChange={(itemValue, itemIndex) =>
					setSelectedClub(itemValue)
				}
			>
				{dt.map((item) => (
					<Picker.Item label={item.label} value={item.value} />
				))}
			</Picker>
			<TextInput
				style={styles.input}
				value={message}
				onValueChange={setMessage}
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
				/>
			</View>
			<TouchableOpacity
				style={styles.sendButton}
				onPress={() => {
					// Send request
					Keyboard.dismiss()
				}}
			>
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
