import * as ImagePicker from "expo-image-picker"
<<<<<<< HEAD
import { Platform } from "react-native"
import * as FileSystem from "expo-file-system"
import { baseUrlAPI } from "../Api"
import { showMessage, hideMessage } from "react-native-flash-message"

const getFileInfo = async (fileURI) => {
	const fileInfo = await FileSystem.getInfoAsync(fileURI)
	return fileInfo
}

const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
	const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
	return isOk
}

export const pickImageUtils = async (editing = false, maxSize = 10) => {
=======
import {Platform} from "react-native"
import * as FileSystem from "expo-file-system"
import {baseUrlAPI} from "../Api"
import {showMessage} from "react-native-flash-message"

const getFileInfo = async (fileURI) => {
	return await FileSystem.getInfoAsync(fileURI)
}

const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
	return fileSize / 1024 / 1024 < smallerThanSizeMB
}

export const pickImageUtils = async (editing = true, maxSize = 10) => {
>>>>>>> parent of 1faefc6 (all deletes)
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: editing,
		aspect: [4, 4],
		quality: 1,
	})

	if (result.cancelled) {
<<<<<<< HEAD
		alert("Impossible de sélectionner ce fichier.")
		return {
			status: false,
=======
		alert("Sélection annulée.")
		return {
			status: false,
			reason: "cancelled",
>>>>>>> parent of 1faefc6 (all deletes)
		}
	}
	const fileInfo = await getFileInfo(result.uri)

<<<<<<< HEAD
	if (!typeof fileInfo.size === "number" || fileInfo.size <= 0) {
		alert("Impossible de sélectionner ce fichier.")
		return {
			status: false,
=======
	if (!(typeof fileInfo.size === "number" || fileInfo.size <= 0)) {
		alert("Impossible de sélectionner ce fichier.")
		return {
			status: false,
			reason: "incorrect format"
>>>>>>> parent of 1faefc6 (all deletes)
		}
	}

	if (!isLessThanTheMB(fileInfo.size, maxSize)) {
		alert("Cette image est trop volumineuse (supérieur à 10Mb).")
		return {
			status: false,
<<<<<<< HEAD
=======
			reason: "too large file"
>>>>>>> parent of 1faefc6 (all deletes)
		}
	}

	if (Platform.OS === "web") {
		return {
			status: true,
			image: result,
			imageBase64: result.uri,
		}
	} else {
		const base64 = await FileSystem.readAsStringAsync(result.uri, {
			encoding: "base64",
		})
<<<<<<< HEAD
=======

>>>>>>> parent of 1faefc6 (all deletes)
		return {
			status: true,
			image: result.uri,
			imageBase64: base64,
		}
	}
<<<<<<< HEAD
=======

>>>>>>> parent of 1faefc6 (all deletes)
}

export const getPictureInput = (image, imageBase64) => {
	let filename =
		Platform.OS === "web" ? image.fileName : image.split("/").pop()
	const extArr = /\.(\w+)$/.exec(filename)
	const type = Platform.OS === "web" ? image.type : getMimeType(extArr[1])

	return JSON.stringify({
		uri: imageBase64,
		name: filename,
		type: type,
	})
}

const getMimeType = (ext) => {
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

export const filesPost = async (url, token, form, callback) => {
	url = !url.startsWith("/") ? "/" + url : url
	fetch(baseUrlAPI + url, {
		method: "POST",
		body: form,
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	})
		.then(async (response) => {
			// get json response here
			if (response.status === 200) {
				let data = await response.json()

				if (typeof callback === "function") {
					callback()
				}
				showMessage({
					message: data.message,
					type: "success",
				})
			} else {
				// Rest of status codes (400,500,303), can be handled here appropriately
				showMessage({
					message: "Une erreur s'est produite. Veuillez réessayer.",
					type: "danger",
				})
			}
		})
		.catch((err) => {
			console.log(err)
			showMessage({
				message: "Une erreur s'est produite. Veuillez réessayer.",
				type: "danger",
			})
		})
}
<<<<<<< HEAD
=======

export const myToDateString = (date) => {
	let dateArray = date.toString().split(" ");
	return dateArray[2] + " " + dateArray[1] + " " + dateArray[3];
}
>>>>>>> parent of 1faefc6 (all deletes)
