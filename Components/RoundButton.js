import React, { Component } from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const dimensionsBtn = 40

class RoundButton extends Component {
	handlePress = () => {
		this.props.onPress()
	}
	render() {
		const { style, icon } = this.props
		return (
			<TouchableOpacity
				style={[styles.touchableOpacity, style]}
				onPress={this.handlePress}
			>
				<View style={styles.btnContainer}>
					<Icon color="rgba(0,0,0,0.6)" name={icon} size={30} />
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	btnContainer: {
		backgroundColor: "rgba(255,255,255,1)",
		height: dimensionsBtn,
		width: dimensionsBtn,
		borderRadius: dimensionsBtn / 2,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
})

export default RoundButton
