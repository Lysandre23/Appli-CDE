<<<<<<< HEAD
import React, {useEffect, useState} from "react";
=======
import React from "react";
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
import { View, Text, StyleSheet, Image } from "react-native";
import { SideBarButton } from "./SideBarButton";
import { useNavigation } from "@react-navigation/native";
import FlashMessage, { showMessage } from "react-native-flash-message";
<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserAndToken} from "../utils";
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9

export function SideBar(props) {
  const navigation = useNavigation();

  const handleDisconnect = () => {
<<<<<<< HEAD

=======
    props.navigation.closeDrawer();
    navigation.navigate("Events");
    showMessage({
      message: "Déconnexion réussie",
      type: "success",
    })
    props.onDisconnect(true);
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
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
<<<<<<< HEAD
        {true || props.user.is_admin ? (
          <SideBarButton onPress={handlePressAdmin} txt="Page administrateur" />
        ) : null}
        {(true || props.user.club_member.length > 0 || props.user.office_member.length > 0) && (
=======
        {props.user.is_admin ? (
          <SideBarButton onPress={handlePressAdmin} txt="Page administrateur" />
        ) : null}
        {props.user.club_member.length > 0 ||
        props.user.office_member.length > 0 ? (
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
          <SideBarButton
            onPress={handlePressGestionClub}
            txt="Gestion de club"
          />
<<<<<<< HEAD
        )}
=======
        ) : null}
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
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
<<<<<<< HEAD
    position: 'absolute',
    top: 90,
    height: "100%",
    zIndex: 3,
    backgroundColor: "#F8F8F8",
    width: "65%",
    alignItems: 'center'
=======
    backgroundColor: "#F8F8F8",
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
  },
  name: {
    fontSize: 23,
  },
  logo: {
<<<<<<< HEAD
    width: 150,
    height: 150,
    position: "relative",
    marginBottom: '10%'
=======
    width: 100,
    height: 100,
    position: "absolute",
    top: 50,
    left: "10%",
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
  },
  info: {
    position: "absolute",
    top: 150,
    left: "10%",
  },
  actions: {
<<<<<<< HEAD
    width: "80%",
=======
    position: "absolute",
    width: "80%",
    left: "10%",
    top: "40%",
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
  },
});
