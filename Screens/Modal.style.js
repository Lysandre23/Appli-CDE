import { StyleSheet } from "react-native";

const modalStyle = StyleSheet.create({
    modal: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000c",
	},
	addPanel: {
		backgroundColor: "white",
		width: "70%",
		padding: 5,
		borderRadius: 10,
		display: "flex",
		flexDirection: "column",
	},
	input: {
		borderColor: "rgb(220,220,220)",
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		marginTop: 5,
		marginLeft: 35,
		marginRight: 35
	},
	confirmButton: {
		backgroundColor: "#2ecc71",
		borderRadius: 5,
		marginTop: 15,
		padding: 6,
		marginLeft: 20,
		marginRight: 20
	},
	cancelButton: {
		backgroundColor: "white",
		borderColor: "#da291c",
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
		padding: 6,
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 10
	},
	confirmText: {
		color: "white",
		textAlign: 'center'
	},
	cancelText: {
		color: "#da291c",
		textAlign: 'center',
	},
	imagePicker: {
		backgroundColor: "#74b9ff",
		padding: 5,
		borderRadius: 4,
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 40,
		marginRight: 40
	},
	textImagePicker: {
		color: "white",
		textAlign: 'center'
	},
	title: {
		marginBottom: 15,
		marginTop: 15,
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	picker: {
		marginLeft: 40,
		marginRight: 40,
	},
	errorText: {
		color: '#da291c',
		fontSize: 13,
		textAlign: 'center',
		marginTop: 5,
		marginBottom: 5
	}
});

export default modalStyle;