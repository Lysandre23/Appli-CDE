import * as React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"
import EventsCard from "../Components/EventsCard"
import Api from "../Api"
import EndFlatList from "../Components/EndFlatList"
import Circle from "../Components/Circle"

const Abonnement = (props) => {
	const [posts, setPosts] = useState([])
	const [isFetchingPosts, setIsFetchingPosts] = useState(false)

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = () => {
		setIsFetchingPosts(true)
		Api.get("/subscribings/posts", {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then(function (response) {
			setPosts(response.data.data)
			setIsFetchingPosts(false)
		})
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="MES ABONNEMENTS" user={props.user} />
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
		overflow: 'hidden'
	},
	AbonnementList: {},
})

export default Abonnement
