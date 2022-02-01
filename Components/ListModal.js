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

	render() {
		const { visible, list, selectable } = this.props
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
							<Icon name="close" size={30} color="#fff" />
						</TouchableOpacity>
					) : null}
					<Text style={styles.modalHeader}>Retirer un admin</Text>
					<ScrollView style={styles.list}>
						{list.map((item) => (
							<ListModalItem
								key={item.value}
								selectedValue={selectedValue}
								label={item.label}
								value={item.value}
								onPress={this.handlePress}
							/>
						))}
					</ScrollView>
					{selectable ? (
						<View style={styles.btnList}>
							<BigButton text="Confirmer" />
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
		backgroundColor: "rgba(0,0,0,0.3)",
		padding: 10,
	},
	modalHeader: {
		fontSize: 25,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		marginBottom: 15,
	},
	closeBtn: {
		position: "absolute",
		right: 10,
		top: 10,
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
