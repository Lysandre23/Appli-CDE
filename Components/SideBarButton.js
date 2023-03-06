import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

export function SideBarButton(props) {
	const navigation = useNavigation()

	const handlePress = () => {
		props.onPress()
	}

	return (
		<TouchableOpacity style={styles.main} onPress={handlePress}>
			<Text style={styles.txt}>{props.txt}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	main: {
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
		marginHorizontal: -15,
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
=======
		marginHorizontal: -15,
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
		marginBottom: 10,
		backgroundColor: "white",
		borderRadius: 8,
		paddingLeft: "10%",
		paddingTop: 7,
		paddingBottom: 7,
	},
	txt: {
		fontSize: 19,
	},
})
