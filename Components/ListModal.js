import React, { Component } from "react"
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native"
import ListModalItem from "./ListModalItem"
import ListModalMessage from "./ListModalMessage"
import Icon from "react-native-vector-icons/FontAwesome"
import BigButton from "./BigButton"

class ListModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedValue: null,
		}
	}
	handleClose = () => {
		this.props.onClose()
	}

	handlePress = (value) => {
		this.setState({ selectedValue: value })
	}

	handleConfirm = () => {
		this.props.onConfirm(this.state.selectedValue)
		this.handleClose()
		this.setState({ selectedValue: null })
	}

	render() {
		const { visible, list, selectable, title, type } = this.props
		const { selectedValue } = this.state
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={visible}
				onRequestClose={this.handleClose}
			>
				<View style={styles.modal}>
					{!selectable ? (
						<TouchableOpacity
							style={styles.closeBtn}
							onPress={this.handleClose}
						>
							<Icon name="close" size={50} color="#fff" />
						</TouchableOpacity>
					) : null}
					<Text style={styles.modalHeader}>{title}</Text>
					<ScrollView style={styles.list}>
						{list.map((item) =>
							type === "messages" ? (
								<ListModalMessage
									key={item.id}
									author={item.user}
									message={item.content}
								/>
							) : (
								<ListModalItem
									key={item.value}
									selectedValue={selectedValue}
									label={item.label}
									value={item.value}
									onPress={this.handlePress}
								/>
							)
						)}
					</ScrollView>
					{selectable ? (
						<View style={styles.btnList}>
							<BigButton
								text="Confirmer"
								type="primary"
								onPress={this.handleConfirm}
							/>
							<BigButton
								type="secondary"
								text="Annuler"
								onPress={this.handleClose}
							/>
						</View>
					) : null}
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
<<<<<<< HEAD
		backgroundColor: "rgba(0,0,0,0.3)",
=======
		backgroundColor: "#000000dd",
>>>>>>> parent of 1faefc6 (all deletes)
		padding: 10,
	},
	modalHeader: {
		fontSize: 25,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		marginBottom: 15,
		marginTop: 32,
	},
	closeBtn: {
		position: "absolute",
		right: 10,
		top: 50,
		color: "white",
	},
	list: {
		flex: 1,
	},
	btnList: {
		paddingTop: 10,
	},
})

export default ListModal
