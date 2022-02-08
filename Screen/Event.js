import * as React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import Header from "../Components/Header"
import EventsCard from "../Components/EventsCard"
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"
import * as ImagePicker from "expo-image-picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import Api from "../Api"

const Events = (props) => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = () => {
		Api.get("/posts").then(function (response) {
			setPosts(response.data.data)
		})
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="EVENTS" user={props.user} />
			<ScrollView style={styles.AbonnementList}>
				{posts.map((post) => (
					<EventsCard
						key={post.id}
						title={post.title}
						date={post.date}
						image={post.picture}
						editable={false}
						description={post.description}
					/>
				))}
			</ScrollView>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "rgb(250,250,250)",
	},
	addButton: {
		zIndex: 2,
		backgroundColor: "#da291c",
		padding: 10,
		borderRadius: 100,
		width: "50%",
		marginLeft: "25%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 15,
		marginBottom: 15,
	},
	modal: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.15)",
	},
	addPanel: {
		backgroundColor: "white",
		width: "70%",
		padding: 50,
		borderRadius: 20,
		display: "flex",
		flexDirection: "column",
	},
	input: {
		width: "100%",
		borderColor: "rgb(200,200,200)",
		borderWidth: 1,
		borderRadius: 7,
		padding: 5,
		marginBottom: 5,
	},
	bt: {
		marginTop: 10,
		backgroundColor: "#da291c",
		padding: 9,
		borderRadius: 100,
	},
	textBT: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
	},
	imagePicker: {
		borderColor: "rgb(150,150,150)",
		borderWidth: 1,
		padding: 5,
		borderRadius: 4,
		marginTop: 10,
		marginBottom: 10,
	},
	datePicker: {},
})

export default Events