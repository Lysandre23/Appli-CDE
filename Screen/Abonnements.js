import * as React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"
import EventsCard from "../Components/EventsCard"
import Api from "../Api"

const Abonnement = (props) => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = () => {
		Api.get("/subscribings/posts/", {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setPosts(response.data.data)
		})
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="MES ABONNEMENTS" user={props.user} />
			<ScrollView style={styles.AbonnementList}>
				{posts.map((post) => (
					<EventsCard
						key={post.id}
						user={props.user}
						description={post.description}
						title={post.title}
						date={post.start_date}
						image={post.picture}
						editable={false}
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
	},
	AbonnementList: {},
})

export default Abonnement
