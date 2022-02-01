import React from "react"
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native"
import { useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome"

const GoodiesCard = (props) => {
	const [loaded, setLoaded] = useState(false)

	const handleEdit = () => {
		props.onEdit(props.id)
	}

	const handleDelete = () => {
		props.onDelete(props.id)
	}

	return (
		<TouchableOpacity style={styles.main}>
			{loaded ? null : <ActivityIndicator style={styles.loader} />}
			<Image
				style={styles.img}
				source={{ uri: props.src }}
				onLoad={() => {
					setLoaded(true)
				}}
			/>
			<View style={styles.lineSeparator}></View>
			<View style={styles.info}>
				<Text>{props.name}</Text>
				<Text>{props.price} €</Text>
			</View>
			{props.user.is_admin ? (
				<TouchableOpacity
					style={[styles.adminButton, styles.adminButtonRight]}
					onPress={handleDelete}
				>
					<Icon name="trash" size={20} color="#000" />
				</TouchableOpacity>
			) : (
				<View></View>
			)}
			{props.user.is_admin ? (
				<TouchableOpacity
					style={[styles.adminButton, styles.adminButtonLeft]}
					onPress={handleEdit}
				>
					<Icon name="edit" size={20} color="#000" />
				</TouchableOpacity>
			) : (
				<View></View>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: "white",
		width: "80%",
		height: 180,
		borderRadius: 10,
		paddingTop: 5,
		paddingBottom: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.05,
		shadowRadius: 15,
		elevation: 2,
	},
	lineSeparator: {
		marginTop: 5,
		marginBottom: 5,
		width: "80%",
		left: "10%",
		height: 1,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#da291c",
	},
	info: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
		left: "10%",
		fontWeight: "900",
		fontFamily: "bold",
	},
	img: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain",
	},
	loader: {
		marginTop: "25%",
	},
	adminButton: {
		position: "absolute",
		top: 10,
		zIndex: 2,
	},
	adminButtonLeft: {
		left: 10,
	},
	adminButtonRight: {
		right: 10,
	},
})

export default GoodiesCard
