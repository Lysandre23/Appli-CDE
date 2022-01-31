import React from "react"
import { View, Image, StyleSheet, TouchableOpacity, Text, Linking } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { useState } from "react"
import Api from "../Api"

const PartenaireCard = (props) => {
	const [admin, setAdmin] = useState(true)

	const deletePartner = () => {
		Api.delete("/partners/" + props.id, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			props.onDelete()
		})
	}

	return (
		<View>
			<TouchableOpacity style={styles.main} onPress={() => {
				Linking.openURL(props.url);
			}}>
				<Image style={styles.img} source={props.image} />
			</TouchableOpacity>
			<Text
				style={{
					textAlign: "center",
					marginTop: 2,
					color: "grey",
					fontWeight: "bold",
				}}
			>
				{props.name}
			</Text>
			{props.user.is_admin ? (
				<TouchableOpacity
					style={styles.adminButton}
					onPress={deletePartner}
				>
					<Icon name="trash" size={20} color="#000" />
				</TouchableOpacity>
			) : (
				<View></View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: "white",
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	img: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "cover",
		borderRadius: 100,
	},
	adminButton: {
		position: "absolute",
		top: 2,
		right: 2,
		zIndex: 2,
	},
})

export default PartenaireCard
