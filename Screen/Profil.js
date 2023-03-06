import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
} from "react-native";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
<<<<<<< HEAD
import AdminButton from "../Components/AdminButton";
=======
//import AdminButton from "../Components/AdminButton";
>>>>>>> parent of 1faefc6 (all deletes)
import modalStyle from "./Modal.style";
import { useState } from "react";
import Api from "../Api";
import Circle from "../Components/Circle";
import GlobalButton from "../Components/GlobalButton";

const Profil = (props) => {
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isError, setIsError] = useState(false)

  const resetModalNewPassword = () => {
    setNewPassword("");
    setOldPassword("");
    setConfirmedPassword("");
    setModalPasswordVisible(false);
  };

  const changePassword = () => {
    Api.post(
      "change-password",
      {
        password: oldPassword,
        new_password: newPassword,
        new_password_confirm: confirmedPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    ).then((response) => {
      resetModalNewPassword();
    });
  };

  return (
    <View style={styles.main}>
      <Header color="#da291c" title={props.user.first_name} user={props.user} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPasswordVisible}
        onRequestClose={() => {
          setModalPasswordVisible(!modalPasswordVisible);
        }}
      >
        <View style={modalStyle.modal}>
          <View style={modalStyle.addPanel}>
            <Text style={modalStyle.title}>Changer le mot de passe</Text>
            <TextInput
              style={modalStyle.input}
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={modalStyle.input}
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={modalStyle.input}
              placeholder="Confirmation du nouveau mot de passe"
              value={confirmedPassword}
              onChangeText={setConfirmedPassword}
            />
            {isError ? <Text style={modalStyle.errorText}>Erreur détectée</Text> : null}
            <View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
							<GlobalButton onPress={changePassword} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
						</View>
            <View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
							<GlobalButton onPress={resetModalNewPassword} padding={6} borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
						</View>
          </View>
        </View>
      </Modal>
<<<<<<< HEAD
      <TouchableOpacity
=======
      <TouchableOpacity style={styles.adminButton}
>>>>>>> parent of 1faefc6 (all deletes)
        onPress={() => {
          setModalPasswordVisible(true);
        }}
      >
<<<<<<< HEAD
        <AdminButton text="Changer de mot de passe" onPress={() => {}} />
=======
        <Text style={{fontSize: 25}}>Changer de mot de passe</Text>
>>>>>>> parent of 1faefc6 (all deletes)
      </TouchableOpacity>
      <Navbar color="#da291c" user={props.user} />
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  main: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    overflow: "hidden",
  },
=======
    main: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        overflow: "hidden",
    },
    adminButton: {
        height: 55,
        width: "90%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "5%",
        marginTop: 15,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
>>>>>>> parent of 1faefc6 (all deletes)
});

export default Profil;
