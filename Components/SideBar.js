import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SideBarButton } from "./SideBarButton";
import { useNavigation } from "@react-navigation/native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserAndToken} from "../utils";

export function SideBar(props) {
  const navigation = useNavigation();

  const handleDisconnect = () => {

  };

  const handlePressAdmin = () => {
    navigation.navigate("Admin");
  };

  const handlePressGestionClub = () => {
    if (props.user.club_member.length + props.user.office_member.length > 1) {
      navigation.navigate("ListGestionClub");
    } else {
      if (props.user.club_member.length > 0) {
        navigation.navigate("GestionClub", {
          id: props.user.club_member[0],
        });
      } else {
        navigation.navigate("GestionOffice", {
          id: props.user.office_member[0],
        });
      }
    }
  };

  const handlePressProfile = () => {
    navigation.navigate("Profil");
  };

  return (
    <View style={styles.main}>
      <FlashMessage position="top" />
      <Image style={styles.logo} source={require("../assets/CDELogo.png")} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {props.user.first_name} {props.user.last_name}
        </Text>
      </View>
      <View style={styles.actions}>
        <SideBarButton onPress={handlePressProfile} txt="Profil" />
        {true || props.user.is_admin ? (
          <SideBarButton onPress={handlePressAdmin} txt="Page administrateur" />
        ) : null}
        {(true || props.user.club_member.length > 0 || props.user.office_member.length > 0) && (
          <SideBarButton
            onPress={handlePressGestionClub}
            txt="Gestion de club"
          />
        )}
        <SideBarButton
          goto="Login"
          txt="Se déconnecter"
          onPress={handleDisconnect}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'absolute',
    top: 90,
    height: "100%",
    zIndex: 3,
    backgroundColor: "#F8F8F8",
    width: "65%",
    alignItems: 'center'
  },
  name: {
    fontSize: 23,
  },
  logo: {
    width: 150,
    height: 150,
    position: "relative",
    marginBottom: '10%'
  },
  info: {
    position: "absolute",
    top: 150,
    left: "10%",
  },
  actions: {
    width: "80%",
  },
});
