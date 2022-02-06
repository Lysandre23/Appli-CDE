import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  //Picker,
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
import Api from "../Api";
import ListModal from "../Components/ListModal";
import axios from "axios";

const Admin = (props) => {
  const navigation = useNavigation();

  const [modalClubVisible, setModalClubVisible] = useState(false);
  const [nameNewClub, setNameNewClub] = useState("");
  const [descriptionNewClub, setDescriptionNewClub] = useState("");
  const [imageNewClub, setImageNewClub] = useState(null);
  const [selectedOfficeNewClub, setSelectedOfficeNewClub] = useState(0);

  const [modalOfficeVisible, setModalOfficeVisible] = useState(false);
  const [nameNewOffice, setNameNewOffice] = useState("");
  const [descriptionNewOffice, setDescriptionNewOffice] = useState("");
  const [imageNewOffice, setImageNewOffice] = useState(null);

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

  const handleCloseAddAdminModal = () => {
    setModalAddAdminVisible(false);
    setSelectedNewAdmin(0);
  };

  const pickImageClub = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.cancelled) {
      setImageNewClub(result);
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
      setImageNewOffice(result);
    }
  };

  const storeClub = () => {
    if (imageNewClub) {
      let form = new FormData();

      form.append(
        "picture",
        JSON.stringify({
          uri:
            Platform.OS === "ios"
              ? imageNewClub.uri.replace("file://", "")
              : imageNewClub.uri,
          name: imageNewClub.fileName,
          type: imageNewClub.type,
        })
      );
      form.append("name", nameNewClub);
      form.append("description", descriptionNewClub);
      form.append("office_id", selectedOfficeNewClub);
      Api.post("/clubs", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${props.token}`,
        },
      }).then(function (response) {
        setModalClubVisible(false);
        setImageNewClub(null);
        setNameNewClub("");
        setDescriptionNewClub("");
        getOffices();
      });
    }
  };

  const storeOffice = () => {
    if (imageNewOffice) {
      let form = new FormData();

      form.append("name", nameNewOffice);
      form.append("description", descriptionNewOffice);
      form.append(
        "picture",
        JSON.stringify({
          uri:
            Platform.OS === "ios"
              ? imageNewOffice.uri.replace("file://", "")
              : imageNewOffice.uri,
          name: imageNewOffice.fileName,
          type: imageNewOffice.type,
        })
      );
      Api.post("/offices", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      })
        .then(function (response) {
          getOffices();
          setModalOfficeVisible(false);
          setImageNewOffice(null);
          setNameNewOffice("");
          setDescriptionNewOffice("");
        })
        .catch(function (error) {
          console.log(error.response);
          console.log(error);
          throw error;
        });
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
        setSelectedNewAdmin(0);
        getAdmins();
      })
      .catch(function (error) {
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
    }).then(function (response) {
      getAdmins();
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
              <Text style={{ textAlign: "center" }}>Choisir une image</Text>
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
            <TouchableOpacity style={modalStyle.bt} onPress={storeClub}>
              <Text style={modalStyle.textBT}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyle.bt}
              onPress={() => {
                handleCloseClubModal();
              }}
            >
              <Text style={modalStyle.textBT}>Annuler</Text>
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
              <Text style={{ textAlign: "center" }}>Choisir une image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyle.bt} onPress={storeOffice}>
              <Text style={modalStyle.textBT}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyle.bt}
              onPress={() => {
                handleCloseOfficeModal();
              }}
            >
              <Text style={modalStyle.textBT}>Annuler</Text>
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
