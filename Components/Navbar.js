import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome"
import MiniNavbarIcon from "./MiniNavBarIcon"
import { useState } from "react"

function switchScreen(screenName, nav, fx) {
	nav.navigate(screenName)
	fx(false)
}

const Navbar = (props) => {
	const navigation = useNavigation()
	const iconSize = 30
	const [visibleMiniIconBar, setVisibleMiniIconBar] = useState(false)
	return (
		<View style={[styles.main, { backgroundColor: props.color }]}>
			<View style={styles.mainIcon}>
				<TouchableOpacity
					onPress={() => {
						setVisibleMiniIconBar(!visibleMiniIconBar)
					}}
				>
					<Icon name="th" size={iconSize} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						switchScreen(
							"Events",
							navigation,
							setVisibleMiniIconBar
						)
					}}
				>
					<Icon name="calendar-o" size={iconSize} color="#fff" />
				</TouchableOpacity>
				{props.user.email ? (
					<TouchableOpacity
						onPress={() => {
							switchScreen(
								"Abonnements",
								navigation,
								setVisibleMiniIconBar
							)
						}}
					>
						<Icon name="bell-o" size={iconSize} color="#fff" />
					</TouchableOpacity>
				) : null}
				{props.user.email ? (
					<TouchableOpacity
						onPress={() => {
							switchScreen(
								"Message",
								navigation,
								setVisibleMiniIconBar
							)
						}}
					>
						<Icon name="envelope-o" size={iconSize} color="#fff" />
					</TouchableOpacity>
				) : null}
			</View>
			{visibleMiniIconBar ? (
				<View style={styles.mini}>
					<View
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<MiniNavbarIcon
							goto="Clubs"
							type="icon"
							name="futbol-o"
							title="Clubs"
							color="#2ECC71"
						/>
						<MiniNavbarIcon
							goto="Goodies"
							type="icon"
							name="shopping-bag"
							title="Goodies"
							color="#F39C12"
						/>
					</View>
					<View
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<MiniNavbarIcon
							goto="PSN"
							type="logo"
							title="PSN"
							color="#2ECC71"
						/>
						<MiniNavbarIcon
							goto="Partenaires"
							type="icon"
							name="handshake-o"
							title="Partenaires"
							color="#E74C3C"
						/>
					</View>
				</View>
			) : (
				<View></View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		position: "absolute",
		width: "87%",
		height: "8%",
		top: "89%",
		left: "6.5%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 15,
		borderRadius: 71,
		borderColor: "rgba(0,0,0,0.1)",
		borderWidth: 1,
		elevation: 30,
	},
	mainIcon: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		alignContent: "center",
		height: "100%",
	},
	mini: {
		display: "flex",
		position: "absolute",
		backgroundColor: "#fff",
		width: 150,
		height: 150,
		left: "3%",
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-evenly",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.15,
		shadowRadius: 5,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.05)",
		transform: [{ translateY: -160 }],
	},
	selectedScreen: {
		shadowColor: "#fff",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.15,
		shadowRadius: 5,
	},
})

export default Navbar
