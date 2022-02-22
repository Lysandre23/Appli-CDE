import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import AdminButton from "../Components/AdminButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import modalStyle from "./Modal.style.js";
import { useEffect } from "react";
import Api, { baseUrlAPI } from "../Api";
import ListModal from "../Components/ListModal";
import * as FileSystem from "expo-file-system";
import { showMessage, hideMessage } from "react-native-flash-message";

const Admin = (props) => {
  const navigation = useNavigation();

  const [modalClubVisible, setModalClubVisible] = useState(false);
  const [nameNewClub, setNameNewClub] = useState("");
  const [descriptionNewClub, setDescriptionNewClub] = useState("");
  const [imageNewClub, setImageNewClub] = useState(null);
  const [image64NewClub, setImage64NewClub] = useState(null);
  const [selectedOfficeNewClub, setSelectedOfficeNewClub] = useState(0);

  const [modalOfficeVisible, setModalOfficeVisible] = useState(false);
  const [nameNewOffice, setNameNewOffice] = useState("");
  const [descriptionNewOffice, setDescriptionNewOffice] = useState("");
  const [imageNewOffice, setImageNewOffice] = useState(null);
  const [image64NewOffice, setImage64NewOffice] = useState(null);

  const [modalAddAdminVisible, setModalAddAdminVisible] = useState(false);

  const [modalDeleteAdminVisible, setModalDeleteAdminVisible] = useState(false);

  const [modalListClubVisible, setModalListClubVisible] = useState(false);

  const [offices, setOffices] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getOffices();
    getAdmins();
    getUsers();
  }, []);

  const getOffices = () => {
    Api.get("/offices").then(function (response) {
      setOffices(response.data.data);
    });
  };

  const getAdmins = () => {
    Api.get("/admins", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }).then(function (response) {
      setAdmins(response.data.data);
    });
  };

  const getUsers = () => {
    Api.get("/users/list", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }).then(function (response) {
      setUsers(response.data.data);
    });
  };

  const handleCloseClubModal = () => {
    setModalClubVisible(false);
    setNameNewClub("");
    setDescriptionNewClub("");
    setImageNewClub(null);
    setSelectedOfficeNewClub(0);
  };
  const handleCloseOfficeModal = () => {
    setModalOfficeVisible(false);
    setNameNewOffice("");
    setDescriptionNewOffice("");
    setImageNewOffice(null);
  };

  const pickImageClub = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (Platform.OS === "web") {
        setImageNewClub(result);
        setImage64NewClub(result.uri);
      } else {
        const base64 = await FileSystem.readAsStringAsync(result.uri, {
          encoding: "base64",
        });
        setImageNewClub(result.uri);
        setImage64NewClub(base64);
      }
    }
  };

  const pickImageOffice = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (Platform.OS === "web") {
        setImageNewOffice(result);
        setImage64NewOffice(result.uri);
      } else {
        const base64 = await FileSystem.readAsStringAsync(result.uri, {
          encoding: "base64",
        });
        setImageNewOffice(result.uri);
        setImage64NewOffice(base64);
      }
    }
  };

  const storeClub = async () => {
    if (imageNewClub) {
      let form = new FormData();

      let filename =
        Platform.OS === "web"
          ? imageNewClub.fileName
          : imageNewClub.split("/").pop();
      const extArr = /\.(\w+)$/.exec(filename);
      const type =
        Platform.OS === "web" ? imageNewClub.type : getMimeType(extArr[1]);

      const pictureInput = JSON.stringify({
        uri: image64NewClub,
        name: filename,
        type: type,
      });

      form.append("picture", pictureInput);
      form.append("name", nameNewClub);
      form.append("description", descriptionNewClub);
      form.append("office_id", selectedOfficeNewClub);

      const response = await fetch(baseUrlAPI + "/clubs", {
        method: "POST",
        body: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${props.token}`,
        },
      });

      const responseJson = await response.json();
      if (responseJson.success) {
        setModalClubVisible(false);
        setImageNewClub(null);
        setImage64NewClub(null);
        setNameNewClub("");
        setDescriptionNewClub("");
        getOffices();
        showMessage({
          message: responseJson.message,
          type: "success",
        });
      } else {
        showMessage({
          message: "Une erreur s'est produite. Veuillez réessayer.",
          type: "danger",
        });
      }
    }
  };

  const storeOffice = async () => {
    if (imageNewOffice) {
      let form = new FormData();

      let filename =
        Platform.OS === "web"
          ? imageNewOffice.fileName
          : imageNewOffice.split("/").pop();
      const extArr = /\.(\w+)$/.exec(filename);
      const type =
        Platform.OS === "web" ? imageNewOffice.type : getMimeType(extArr[1]);

      const pictureInput = JSON.stringify({
        uri: image64NewPart,
        name: filename,
        type: type,
      });

      form.append("picture", pictureInput);
      form.append("name", nameNewOffice);
      form.append("description", descriptionNewOffice);

      const response = await fetch(baseUrlAPI + "/offices", {
        method: "POST",
        body: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${props.token}`,
        },
      });

      const responseJson = await response.json();
      if (responseJson.success) {
        getOffices();
        setModalOfficeVisible(false);
        setImageNewOffice(null);
        setImage64NewOffice(null);
        setNameNewOffice("");
        setDescriptionNewOffice("");
        showMessage({
          message: responseJson.message,
          type: "success",
        });
      } else {
        showMessage({
          message: "Une erreur s'est produite. Veuillez réessayer.",
          type: "danger",
        });
      }
    }
  };

  const storeAdmin = (id) => {
    Api.post(
      "/admins",
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then(function (response) {
        setModalAddAdminVisible(false);
        getAdmins();
        showMessage({
          message: response.data.message,
          type: "success",
        });
      })
      .catch(function (error) {
        showMessage({
          message: "Une erreur s'est produite. Veuillez réessayer.",
          type: "danger",
        });
        throw error;
      });
  };

  const serializeAdmins = (admins) => {
    let array = [];
    admins.forEach((item) => {
      array.push({
        value: item.id,
        label: item.first_name + " " + item.last_name,
      });
    });
    return array;
  };

  const serializeOffices = (offices) => {
    let array = [];
    offices.forEach((item) => {
      array.push({
        value: "o-" + item.id,
        label: item.name,
      });
    });
    offices.forEach((item) => {
      item.clubs.forEach((club) => {
        array.push({
          value: "c-" + club.id,
          label: club.name,
        });
      });
    });
    return array;
  };

  const deleteAdmin = (id) => {
    Api.delete("/admins/" + id, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then(function (response) {
        getAdmins();
        showMessage({
          message: response.data.message,
          type: "success",
        });
      })
      .catch(function (error) {
        showMessage({
          message: "Une erreur s'est produite. Veuillez réessayer.",
          type: "danger",
        });
        throw error;
      });
  };

  const goToClub = (id) => {
    const splitted = id.split("-");
    if (splitted[0] === "c") {
      navigation.navigate("GestionClub", {
        id: splitted[1],
      });
    } else if (splitted[0] === "o") {
      navigation.navigate("GestionOffice", {
        id: splitted[1],
      });
    }
  };

  return (
    <View style={styles.main}>
      <Header title="ADMIN" color="#da291c" user={props.user} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalClubVisible}
        onRequestClose={() => {
          setModalClubVisible(!modalClubVisible);
        }}
      >
        <View style={modalStyle.modal}>
          <View style={modalStyle.addPanel}>
            <Text style={modalStyle.title}>Création d'un club</Text>
            <TextInput
              style={modalStyle.input}
              placeholder="Nom"
              value={nameNewClub}
              onChangeText={setNameNewClub}
            />
            <TextInput
              style={modalStyle.input}
              placeholder="Description"
              value={descriptionNewClub}
              onChangeText={setDescriptionNewClub}
            />
            <TouchableOpacity
              style={modalStyle.imagePicker}
              onPress={pickImageClub}
            >
              <Text style={modalStyle.textImagePicker}>Choisir une image</Text>
            </TouchableOpacity>
            <Picker
              selectedValue={selectedOfficeNewClub}
              style={modalStyle.picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedOfficeNewClub(itemValue)
              }
            >
              <Picker.Item
                key={0}
                label="Choisir un bureau"
                value={0}
                enabled={false}
              />
              {offices.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
            <TouchableOpacity
              style={modalStyle.confirmButton}
              onPress={storeClub}
            >
              <Text style={modalStyle.confirmText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyle.cancelButton}
              onPress={() => {
                handleCloseClubModal();
              }}
            >
              <Text style={modalStyle.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOfficeVisible}
        onRequestClose={() => {
          setModalOfficeVisible(!modalOfficeVisible);
        }}
      >
        <View style={modalStyle.modal}>
          <View style={modalStyle.addPanel}>
            <Text style={modalStyle.title}>Création d'un bureau</Text>
            <TextInput
              style={modalStyle.input}
              placeholder="Nom"
              value={nameNewOffice}
              onChangeText={setNameNewOffice}
            />
            <TextInput
              style={modalStyle.input}
              placeholder="Description"
              value={descriptionNewOffice}
              onChangeText={setDescriptionNewOffice}
            />
            <TouchableOpacity
              style={modalStyle.imagePicker}
              onPress={pickImageOffice}
            >
              <Text style={modalStyle.textImagePicker}>Choisir une image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyle.confirmButton}
              onPress={storeOffice}
            >
              <Text style={modalStyle.confirmText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyle.cancelButton}
              onPress={() => {
                handleCloseOfficeModal();
              }}
            >
              <Text style={modalStyle.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ListModal
        title="Ajouter un admin"
        visible={modalAddAdminVisible}
        list={serializeAdmins(
          users.filter((item) => !admins.find((admin) => admin.id === item.id))
        )}
        selectable={true}
        onClose={() => setModalAddAdminVisible(!modalAddAdminVisible)}
        onConfirm={storeAdmin}
      />

      <ListModal
        title="Retirer un admin"
        visible={modalDeleteAdminVisible}
        list={serializeAdmins(admins)}
        selectable={true}
        onClose={() => setModalDeleteAdminVisible(!modalDeleteAdminVisible)}
        onConfirm={deleteAdmin}
      />

      <ListModal
        title="Aller à la gestion"
        visible={modalListClubVisible}
        list={serializeOffices(offices)}
        selectable={true}
        onClose={() => setModalListClubVisible(!modalListClubVisible)}
        onConfirm={goToClub}
      />

      <ScrollView>
        <AdminButton
          onPress={() => {
            setModalOfficeVisible(true);
          }}
          text="Créer un bureau"
        />
        <AdminButton
          onPress={() => {
            setModalClubVisible(true);
          }}
          text="Créer un club"
        />
        <AdminButton
          onPress={() => {
            setModalAddAdminVisible(true);
          }}
          text="Ajouter un admin"
        />
        <AdminButton
          onPress={() => {
            setModalDeleteAdminVisible(true);
          }}
          text="Retirer un admin"
        />
        <AdminButton
          onPress={() => {
            setModalListClubVisible(true);
          }}
          text="Allez à la gestion"
        />
      </ScrollView>
      <Navbar color="#da291c" user={props.user} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: "flex",
    backgroundColor: "#F8F8F8",
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default Admin;
