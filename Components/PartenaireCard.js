import React from "react"
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { useState } from "react"

const PartenaireCard = (props) => {
	const [admin, setAdmin] = useState(true)
	return (
		<View>
			<TouchableOpacity style={styles.main}>
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
			{admin ? (
				<TouchableOpacity
					style={styles.adminButton}
					onPress={() => {
						// Envoi requête
					}}
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
