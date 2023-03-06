import * as React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import Header from "../Components/Header"
import EventsCard from "../Components/EventsCard"
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"
import Api from "../Api"
import EndFlatList from "../Components/EndFlatList"
import Circle from "../Components/Circle"

const Events = (props) => {
	const [posts, setPosts] = useState([])
	const [isFetchingPosts, setIsFetchingPosts] = useState(false)

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = () => {
		setIsFetchingPosts(true)
<<<<<<< HEAD
		Api.get("/posts").then(function (response) {
			setPosts(response.data.data)
			setIsFetchingPosts(false)
		})
=======
		Api.get("/posts")
			.then((response) => {
			setPosts(response.data.data)
			setIsFetchingPosts(false)})
			.catch((e) => {
				console.log("failed loading events : ", e)
				setIsFetchingPosts(false)
			})
>>>>>>> parent of 1faefc6 (all deletes)
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="EVENTS" user={props.user} />
			<Circle />
			<Circle />
			<FlatList
				data={posts}
				onRefresh={() => getPosts()}
				refreshing={isFetchingPosts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<EventsCard
						key={item.id}
						title={item.title}
						date={item.date}
						image={item.picture}
						editable={false}
						description={item.description}
						author={item.author}
					/>
				)}
				ListFooterComponent={() => <EndFlatList />}
			></FlatList>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "rgb(250,250,250)",
		overflow: 'hidden'
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
