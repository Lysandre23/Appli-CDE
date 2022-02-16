import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import ListGestionClubButton from "../Components/ListGestionClubButton"
import Api from "../Api"
import EndFlatList from "../Components/EndFlatList"

const ListGestionClub = (props) => {
	const [items, setItems] = useState([])
	const [isFetchingItems, setIsFetchingItems] = useState(false)

	useEffect(() => {
		getItems()
	}, [])

	const getItems = () => {
		setIsFetchingItems(true)
		Api.get("members", {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		}).then((response) => {
			setIsFetchingItems(false)
			setItems(response.data.data)
		})
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="GESTION DE CLUB" user={props.user} />
			<FlatList
				data={items}
				onRefresh={() => getPosts()}
				refreshing={isFetchingItems}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <ListGestionClubButton data={item} />}
				ListFooterComponent={() => <EndFlatList />}
			/>
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
})

export default ListGestionClub
