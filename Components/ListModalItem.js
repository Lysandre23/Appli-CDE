import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

class ListModalItem extends Component {
	handleClose = () => {
		this.props.onClose()
	}

	handlePress = () => {
		this.props.onPress(this.props.value)
	}

	render() {
		const { label, selectedValue, value } = this.props
		return (
			<TouchableOpacity onPress={this.handlePress}>
				<View
					style={[
						styles.listModalItem,
						selectedValue === value && styles.selected,
					]}
				>
					<Text
						style={[
							styles.text,
							(selectedValue === value ? styles.selectedText : styles.notSelectedText),
						]}
					>
						{label}
					</Text>
				</View>
			</TouchableOpacity>
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
	selected: {
		backgroundColor: "#007bff",
	},
	text: {
		fontSize: 25,
	},
	selectedText: {
		color: "white",
	},
	notSelectedText: {
		color: "black"
	}
})

export default ListModalItem
