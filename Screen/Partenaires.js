import * as React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import PartenaireCard from "../Components/PartenaireCard";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import Api from "../Api";

const Partenaires = (props, navigation) => {
  const [admin, setAdmin] = useState(true);
  const [partners, setPartners] = useState([]);
  const [storeModalVisible, setStoreModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [nameNewPart, setNameNewPart] = useState("");
  const [imageNewPart, setImageNewPart] = useState(null);
  const [urlNewPart, setUrlNewPart] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [pendingEdit, setPendingEdit] = useState(null);

  const handleCloseStoreModal = () => {
    setStoreModalVisible(false);
    setNameNewPart("");
    setUrlNewPart("");
    setImageNewPart(null);
    setPendingEdit(null);
  };

  useEffect(() => {
    getPartners();
  }, []);

  const getPartners = () => {
    Api.get("/partners").then(function (response) {
      setPartners(response.data.data);
    });
  };

  const handleDelete = (id) => {
    setPendingDelete(id);
    setDeleteModalVisible(true);
  };

  const handleEdit = (id) => {
    for (let i = 0; i < partners.length; i++) {
      if (partners[i].id === id) {
        setPendingEdit(partners[i]);
        setNameNewPart(partners[i].name);
        setUrlNewPart(partners[i].link);
        setStoreModalVisible(true);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageNewPart(result);
    }
  };

  const confirmDelete = () => {
    Api.delete("/partners/" + pendingDelete, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${props.token}`,
      },
    }).then(function (response) {
      setPendingDelete(null);
      setDeleteModalVisible(false);
      getPartners();
    });
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setPendingDelete(null);
  };

  const handleSubmitStore = () => {
    if (pendingEdit === null) {
      storePartner();
    } else {
      updatePartner();
    }
  };

  const storePartner = () => {
    if (imageNewPart) {
      let form = new FormData();

      form.append(
        "picture",
        JSON.stringify({
          uri:
            Platform.OS === "ios"
              ? imageNewPart.uri.replace("file://", "")
              : imageNewPart.uri,
          name: imageNewPart.fileName,
          type: imageNewPart.type,
        })
      );
      form.append("name", nameNewPart);
      form.append("link", urlNewPart);
      Api.post("/partners", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${props.token}`,
        },
      })
        .then(function (response) {
          console.log(response);
          getPartners();
          setStoreModalVisible(false);
          setImageNewPart(null);
          setNameNewPart("");
          setUrlNewPart("");
        })
        .catch((error) => {
          console.log(error.response);
          console.log(error);
          throw error;
        });
    }
  };

  const updatePartner = () => {
    let form = new FormData();

    if (imageNewPart !== null) {
      form.append(
        "picture",
        JSON.stringify({
          uri:
            Platform.OS === "ios"
              ? imageNewPart.uri.replace("file://", "")
              : imageNewPart.uri,
          name: imageNewPart.fileName,
          type: imageNewPart.type,
        })
      );
    }
    form.append("name", nameNewPart);
    form.append("link", urlNewPart);

    // pas de formdata avec un PUT donc on spoof avec un POST
    Api.post("/partners/" + pendingEdit.id + "?_method=PUT", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${props.token}`,
      },
    }).then(function (response) {
      getPartners();
      setStoreModalVisible(false);
      setImageNewPart(null);
      setNameNewPart("");
      setUrlNewPart("");
      setPendingEdit(null);
    });
  };

  return (
    <View style={styles.main}>
      <Header color="#da291c" title="PARTENAIRES" user={props.user} />
      {props.user.is_admin ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={storeModalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.addPanel}>
              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nameNewPart}
                onChangeText={setNameNewPart}
              />
              <TextInput
                style={styles.input}
                placeholder="Lien vers le site"
                value={urlNewPart}
                onChangeText={setUrlNewPart}
              />

              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={{ textAlign: "center" }}>
                  {pendingEdit ? "Modifier l'image" : "Choisir une image"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bt} onPress={handleSubmitStore}>
                <Text style={styles.textBT}>Valider</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bt}
                onPress={handleCloseStoreModal}
              >
                <Text style={styles.textBT}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
      {props.user.is_admin ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => {
            setModalVisible(!deleteModalVisible);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.addPanel}>
              <TouchableOpacity style={styles.bt} onPress={confirmDelete}>
                <Text style={styles.textBT}>Valider</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bt} onPress={cancelDelete}>
                <Text style={styles.textBT}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
      {props.user.is_admin ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setStoreModalVisible(true);
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Ajouter un Partenaire
          </Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      <FlatList
        data={partners}
        numColumns={3}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 20,
              width: "33%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <PartenaireCard
              name={item.name}
              url={item.link}
              image={item.picture}
              id={item.id}
              token={props.token}
              user={props.user}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </View>
        )}
      />
      <Navbar color="#da291c" user={props.user} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
});

export default Partenaires;
