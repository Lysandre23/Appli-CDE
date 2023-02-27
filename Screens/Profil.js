import React, {useEffect} from "react";
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
//import AdminButton from "../Components/AdminButton";
import modalStyle from "./Modal.style";
import { useState } from "react";
import Api from "../Api";
import Circle from "../Components/Circle";
import GlobalButton from "../Components/GlobalButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserAndToken} from "../utils";

const Profil = (props) => {
    const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [isError, setIsError] = useState(false)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState({
        email: null,
        firstname: null,
        lastname: null,
        isAdmin: false,
        officeResponsible: [],
        clubResponsible: [],
        officeMember: [],
        clubMember: [],})
    /*
    useEffect(() => {
        let data = getUserAndToken()
        setToken(data.token)
        setUser(data.user)
    })
     */

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
            <Header color="#da291c" title={props.user.first_name} user={props.user}/>
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
                <TouchableOpacity style={styles.adminButton}
                                onPress={() => {
                                    setModalPasswordVisible(true);
                                }}>
                  <Text style={{fontSize: 25}}>Changer de mot de passe</Text>
                </TouchableOpacity>
            <Navbar color="#da291c"/>
        </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Profil;
