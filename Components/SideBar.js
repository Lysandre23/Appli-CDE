<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
=======
<<<<<<< HEAD
=======
>>>>>>> parent of 1faefc6 (all deletes)
import React, {useEffect, useState} from "react";
=======
import React from "react";
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
<<<<<<< HEAD
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> parent of 1faefc6 (all deletes)
import { View, Text, StyleSheet, Image } from "react-native";
import { SideBarButton } from "./SideBarButton";
import { useNavigation } from "@react-navigation/native";
import FlashMessage, { showMessage } from "react-native-flash-message";
<<<<<<< HEAD
<<<<<<< HEAD

export function SideBar(props) {
  const navigation = useNavigation();

  const handleDisconnect = () => {
=======
<<<<<<< HEAD
=======
>>>>>>> parent of 1faefc6 (all deletes)
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserAndToken} from "../utils";
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9

export function SideBar(props) {
    const navigation = useNavigation();

<<<<<<< HEAD
  const handleDisconnect = () => {
<<<<<<< HEAD

=======
<<<<<<< HEAD
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> parent of 1faefc6 (all deletes)
    props.navigation.closeDrawer();
    navigation.navigate("Events");
    showMessage({
      message: "Déconnexion réussie",
      type: "success",
    })
    props.onDisconnect(true);
<<<<<<< HEAD
<<<<<<< HEAD
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

=======
=======
>>>>>>> parent of 1faefc6 (all deletes)
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
  };
=======
    const handleDisconnect = () => {
        props.hideSideBar()
        AsyncStorage.setItem("user", JSON.stringify({
            email: null,
            first_name: null,
            last_name: null,
            is_admin: false,
            office_responsible: [],
            club_responsible: [],
            office_member: [],
            club_member: [],
        }))
        navigation.navigate("Events")
        AsyncStorage.removeItem("cde-token")
            .then(() => {
                console.log("Déconnexion réussie")
            })
            .catch(e => console.error("Déconnexion échouée"))
    };

    const handlePressAdmin = () => {
        navigation.navigate("Admin");
    };
>>>>>>> 5663c17472b474aaac21d0935775582f49b382ac

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

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> parent of 1faefc6 (all deletes)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> parent of 1faefc6 (all deletes)
        {true || props.user.is_admin ? (
          <SideBarButton onPress={handlePressAdmin} txt="Page administrateur" />
        ) : null}
        {(true || props.user.club_member.length > 0 || props.user.office_member.length > 0) && (
=======
<<<<<<< HEAD
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> parent of 1faefc6 (all deletes)
        {props.user.is_admin ? (
          <SideBarButton onPress={handlePressAdmin} txt="Page administrateur" />
        ) : null}
        {props.user.club_member.length > 0 ||
        props.user.office_member.length > 0 ? (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
          <SideBarButton
            onPress={handlePressGestionClub}
            txt="Gestion de club"
          />
<<<<<<< HEAD
<<<<<<< HEAD
        ) : null}
=======
<<<<<<< HEAD
=======
>>>>>>> parent of 1faefc6 (all deletes)
        )}
=======
        ) : null}
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
<<<<<<< HEAD
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> parent of 1faefc6 (all deletes)
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
<<<<<<< HEAD
    backgroundColor: "#F8F8F8",
=======
<<<<<<< HEAD
=======
>>>>>>> parent of 1faefc6 (all deletes)
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
<<<<<<< HEAD
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> parent of 1faefc6 (all deletes)
  },
  name: {
    fontSize: 23,
  },
  logo: {
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> parent of 1faefc6 (all deletes)
    width: 150,
    height: 150,
    position: "relative",
    marginBottom: '10%'
=======
<<<<<<< HEAD
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> parent of 1faefc6 (all deletes)
    width: 100,
    height: 100,
    position: "absolute",
    top: 50,
    left: "10%",
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
  },
  info: {
    position: "absolute",
    top: 150,
    left: "10%",
  },
  actions: {
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
    width: "80%",
=======
>>>>>>> parent of 1faefc6 (all deletes)
=======
    width: "80%",
=======
>>>>>>> parent of 1faefc6 (all deletes)
    position: "absolute",
    width: "80%",
    left: "10%",
    top: "40%",
<<<<<<< HEAD
<<<<<<< HEAD
  },
=======
=======
>>>>>>> parent of 1faefc6 (all deletes)
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
  },
=======
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
                {props.user.is_admin ? (
                    <SideBarButton onPress={handlePressAdmin} txt="Page administrateur" />
                ) : null}
                {(props.user.club_member.length > 0 || props.user.office_member.length > 0) && (
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
        marginTop: "10%"
    },
>>>>>>> 5663c17472b474aaac21d0935775582f49b382ac
<<<<<<< HEAD
>>>>>>> parent of 1faefc6 (all deletes)
=======
>>>>>>> parent of 1faefc6 (all deletes)
});
