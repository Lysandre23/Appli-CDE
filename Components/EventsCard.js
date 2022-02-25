import * as React from "react"
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
} from "react-native"
import { useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import EventModal from "./EventModal"

const EventsCard = (props) => {
	const [modalDescriptionVisible, setModalDescriptionVisible] =
		useState(false)

	const handleDelete = () => {
		props.onDelete(props.id)
	}

	return (
		<TouchableOpacity
			style={styles.main}
			onPress={() => {
				setModalDescriptionVisible(true)
			}}
		>
			<EventModal visible={modalDescriptionVisible} setVisible={setModalDescriptionVisible} title={props.title} date={props.date} image={props.image} text={props.description}/>
			{props.editable && props.user.is_admin ? (
				<TouchableOpacity
					style={styles.adminButton}
					onPress={handleDelete}
				>
					<Icon name="trash" size={20} color="#000" />
				</TouchableOpacity>
			) : (
				<View></View>
			)}
			<View style={styles.imgContainer}>
				<Image style={styles.img} source={{ uri: props.image }} />
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.infoTitle}>{props.title}</Text>
				<Text style={styles.infoDate}>{props.date}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	main: {
		flexDirection: "row",
		backgroundColor: "white",
		width: "86%",
		height: 120,
		marginLeft: "7%",
		marginTop: 25,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.15,
		shadowRadius: 5,
	},
	imgContainer: {
		flex: 1,
		height: "100%",
	},
	img: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "cover",
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
	},
	infoContainer: {
		flex: 2,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		zIndex: 1,
	},
	infoTitle: {
		fontSize: 25,
		fontWeight: "700",
		paddingLeft: 10,
	},
	infoDate: {
		position: "absolute",
		right: "5%",
		bottom: "5%",
	},
	adminButton: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 2,
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
})

export default EventsCard

/* Ancien modal
<Modal
				animationType="fade"
				transparent={true}
				visible={modalDescriptionVisible}
				onRequestClose={() => {
					setModalDescriptionVisible(!modalDescriptionVisible)
				}}
			>
				<View style={styles.modal}>
					<TouchableOpacity
						style={styles.panel}
						onPress={() => {
							setModalDescriptionVisible(false)
						}}
					>
						<Text>{props.description}</Text>
					</TouchableOpacity>
				</View>
			</Modal>
*/