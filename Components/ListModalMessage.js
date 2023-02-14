import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

class ListModalMessage extends Component {
	render() {
		const { author, message } = this.props
		return (
			<View style={[styles.listModalItem]}>
				{author ? (
					<Text style={[styles.text]}>
						{author.first_name + "" + author.last_name}
					</Text>
				) : null}
				<Text style={[styles.text]}>{message}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	listModalItem: {
		width: "100%",
		backgroundColor: "white",
		display: "flex",
		alignItems: "center",
		padding: 10,
		borderRadius: 10,
		marginBottom: 15,
	},
	text: {
		fontSize: 25,
	},
})

export default ListModalMessage
