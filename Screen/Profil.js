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
import AdminButton from "../Components/AdminButton";
import modalStyle from "./Modal.style";
import { useState } from "react";
import Api from "../Api";
import Circle from "../Components/Circle";

const Profil = (props) => {
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

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
      <Header color="#da291c" title="PROFIL" user={props.user} />
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
            <TouchableOpacity style={modalStyle.confirmButton} onPress={changePassword}>
              <Text style={modalStyle.confirmText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyle.cancelButton}
              onPress={resetModalNewPassword}
            >
              <Text style={modalStyle.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalPasswordVisible(true);
        }}
      >
        <AdminButton text="Changer de mot de passe" onPress={() => {}} />
      </TouchableOpacity>
      <Navbar color="#da291c" user={props.user} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    overflow: "hidden",
  },
});

export default Profil;
