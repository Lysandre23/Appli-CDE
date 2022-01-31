import * as React from "react"
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TextInput,
	FlatList,
	Modal,
	TouchableOpacity,
} from "react-native"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"
import * as ImagePicker from "expo-image-picker"
import Api from "../Api"
import modalStyle from "./Modal.style"
import OfficeGoodies from "../Components/OfficeGoodies"

const Goodies = (props) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [admin, setAdmin] = useState(true)
	const [nameNewGoodie, setNameNewGoodie] = useState(null)
	const [priceNewGoodie, setPriceNewGoodie] = useState(null)
	const [imageNewGoodie, setImageNewGoodie] = useState(null)
	const [goodies, setGoodies] = useState([]);
	const [offices, setOffices] = useState([]);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		})

		if (!result.cancelled) {
			setImageNewGoodie(result.uri)
		}
	}

	useEffect(() => {
		getGoodies()
	}, [])

	const resetInputNewGoodie = () => {
		setImageNewGoodie(null)
		setNameNewGoodie(null)
		setPriceNewGoodie(null)
		setModalVisible(false)
	}

	const getGoodies = () => {
		Api.get("/goodies").then(function (response) {
			setGoodies(response.data.data)
		})
	}

	return (
		<View style={styles.main}>
			<Header color="#da291c" title="GOODIES" user={props.user} />
			{admin ? (
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => {
						setModalVisible(true)
					}}
				>
					<Text style={{ color: "white", fontSize: 18 }}>
						Ajouter un goodie
					</Text>
				</TouchableOpacity>
			) : (
				<View></View>
			)}
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible)
				}}
			>
				<View style={modalStyle.modal}>
					<View style={modalStyle.addPanel}>
						<TextInput
							style={modalStyle.input}
							placeholder="Nom"
							value={nameNewGoodie}
							onChangeText={setNameNewGoodie}
						/>
						<TextInput
							style={modalStyle.input}
							placeholder="Prix"
							value={priceNewGoodie}
							onChangeText={setPriceNewGoodie}
						/>
						<TouchableOpacity
							style={modalStyle.imagePicker}
							onPress={pickImage}
						>
							<Text style={{ textAlign: "center" }}>
								Choisir une image
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={() => {
								data.push({
									name: nameNewGoodie,
									price: priceNewGoodie,
									image: imageNewGoodie,
								})
								resetInputNewGoodie()
							}}
						>
							<Text style={modalStyle.textBT}>Valider</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={modalStyle.bt}
							onPress={() => {
								resetInputNewGoodie()
							}}
						>
							<Text style={modalStyle.textBT}>Annuler</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			
			<FlatList
				data={offices}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<OfficeGoodies name={item.officeName} goodiesList={item.goodiesList}/>
				)}
			>

			</FlatList>
			
			<Navbar color="#da291c" user={props.user} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
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
})

export default Goodies
