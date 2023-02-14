import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

class BigButton extends Component {
	handlePress = () => {
		this.props.onPress()
	}

	render() {
		const { text, type } = this.props
		return (
			<TouchableOpacity onPress={this.handlePress}>
				<View
					style={[
						styles.btn,
						type === "secondary" && styles.btnSecondary,
						type === "primary" && styles.btnPrimary,
					]}
				>
					<Text
						style={[
							styles.btnText,
							type === "secondary" && styles.btnTextSecondary,
							type === "primary" && styles.btnTextPrimary,
						]}
					>
						{text}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	btn: {
		width: "100%",
		backgroundColor: "#da291c",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 10,
		marginBottom: 15,
		padding: 10,
	},
	btnText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 25,
		textAlign: "center",
		width: "100%",
	},
	btnSecondary: {
		borderColor: "#da291c",
		borderWidth: 5,
		borderStyle: "solid",
		backgroundColor: "#fff",
	},
	btnTextSecondary: {
		color: "#da291c",
	},
	btnPrimary: {
		backgroundColor: "#27ae60",
	},
	btnTextPrimary: {
		color: "white",
	},
})

export default BigButton
