import React, { Component } from "react"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Platform,
	Image,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

class Test extends Component {
	constructor(props) {
		super(props)

		this.state = {
			image: null,
			imageBase64: null,
			imagePreview: null,
			name: "nom du partenaire",
			url: "url",
		}
	}

	addImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		})

		if (!result.cancelled) {
			if (Platform.OS === "web") {
				this.setState({
					imageBase64: result.uri,
					image: result,
					imagePreview: result.uri,
				})
			} else {
				const base64 = await FileSystem.readAsStringAsync(result.uri, {
					encoding: "base64",
				})
				this.setState({
					imageBase64: base64,
					image: result.uri,
					imagePreview: result.uri,
				})
			}
		}
	}

	getMimeType = (ext) => {
		// mime type mapping for few of the sample file types
		switch (ext) {
			case "pdf":
				return "application/pdf"
			case "jpg":
				return "image/jpeg"
			case "jpeg":
				return "image/jpeg"
			case "png":
				return "image/png"
		}
	}

	upload = async () => {
		const { image, name, url, imageBase64 } = this.state
		const { token } = this.props
		if (image) {
			let form = new FormData()

			let filename =
				Platform.OS === "web" ? image.fileName : image.split("/").pop()
			const extArr = /\.(\w+)$/.exec(filename)
			const type =
				Platform.OS === "web" ? image.type : this.getMimeType(extArr[1])

			const pictureInput = JSON.stringify({
				uri: imageBase64,
				name: filename,
				type: type,
			})

			form.append("picture", pictureInput)
			form.append("name", name)
			form.append("link", url)

			const response = await fetch(
				"https://cercle.polytech-services-nancy.fr/api/partners",
				{
					method: "POST",
					body: form,
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const responseAgain = await response.text()
			console.log(responseAgain)
		}
	}

	render() {
		const { imagePreview } = this.state
		return (
			<View style={styles.container}>
				<View>
					<TouchableOpacity
						style={styles.btn}
						onPress={this.addImage}
					>
						<Text>Ajouter image</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={this.upload}>
						<Text>Valider</Text>
					</TouchableOpacity>
				</View>
				<View>
					{imagePreview ? (
						<Image
							source={{ uri: imagePreview }}
							style={{ width: 200, height: 200 }}
						/>
					) : null}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
	},
	btn: {
		borderColor: "#000",
		borderWidth: 3,
		borderStyle: "solid",
		padding: 10,
	},
})

export default Test
