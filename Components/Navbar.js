<<<<<<< HEAD
import React from "react";
=======
<<<<<<< HEAD
import React, {useEffect} from "react";
=======
import React from "react";
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import MiniNavbarIcon from "./MiniNavBarIcon";
import { useState } from "react";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import {getUserAndToken} from "../utils";
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)

function switchScreen(screenName, nav, fx) {
  nav.navigate(screenName);
  fx(false);
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
const Navbar = (props, id) => {
  const navigation = useNavigation();
  const iconSize = 30;
  const [visibleMiniIconBar, setVisibleMiniIconBar] = useState(false);
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

  const switchScreen = (screenName, fx) => {
    fx(false)
    navigation.navigate(screenName)
  }

=======
>>>>>>> parent of 1faefc6 (all deletes)
const Navbar = (props) => {
  const navigation = useNavigation();
  const iconSize = 30;
  const [visibleMiniIconBar, setVisibleMiniIconBar] = useState(false);
<<<<<<< HEAD
=======
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
  return (
    <View style={styles.navbarContainer}>
      <View style={[styles.navbar, { backgroundColor: props.color }]}>
        <View style={styles.mainIcon}>
          <TouchableOpacity
            onPress={() => {
              setVisibleMiniIconBar(!visibleMiniIconBar);
            }}
          >
            <Icon name="th" size={iconSize} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
<<<<<<< HEAD
              switchScreen("Events", navigation, setVisibleMiniIconBar);
=======
              switchScreen("Events", setVisibleMiniIconBar);
>>>>>>> parent of 1faefc6 (all deletes)
            }}
          >
            <Icon name="calendar-o" size={iconSize} color="#fff" />
          </TouchableOpacity>
<<<<<<< HEAD
          {props.user.email ? (
            <TouchableOpacity
              onPress={() => {
                switchScreen("Abonnements", navigation, setVisibleMiniIconBar);
=======
<<<<<<< HEAD
<<<<<<< HEAD
          {user?.email && (
=======
          {props.user.email ? (
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
=======
          {props.user?.email && (
>>>>>>> 5663c17472b474aaac21d0935775582f49b382ac
            <TouchableOpacity
              onPress={() => {
                switchScreen("Abonnements", setVisibleMiniIconBar);
>>>>>>> parent of 1faefc6 (all deletes)
              }}
            >
              <Icon name="bell-o" size={iconSize} color="#fff" />
            </TouchableOpacity>
<<<<<<< HEAD
          ) : null}
          {props.user.email ? (
            <TouchableOpacity
              onPress={() => {
                switchScreen("Message", navigation, setVisibleMiniIconBar);
=======
<<<<<<< HEAD
          )}
<<<<<<< HEAD
          {user?.email && (
=======
          ) : null}
          {props.user.email ? (
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
=======
          {props.user?.email && (
>>>>>>> 5663c17472b474aaac21d0935775582f49b382ac
            <TouchableOpacity
              onPress={() => {
                switchScreen("Message", setVisibleMiniIconBar);
>>>>>>> parent of 1faefc6 (all deletes)
              }}
            >
              <Icon name="envelope-o" size={iconSize} color="#fff" />
            </TouchableOpacity>
<<<<<<< HEAD
          ) : null}
          {!props.user.email ? (
            <TouchableOpacity
              onPress={() => {
                switchScreen("Login", navigation, setVisibleMiniIconBar);
=======
<<<<<<< HEAD
          )}
<<<<<<< HEAD
          {!user?.email && (
=======
          ) : null}
          {!props.user.email ? (
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
=======
          {!props.user?.email && (
>>>>>>> 5663c17472b474aaac21d0935775582f49b382ac
            <TouchableOpacity
              onPress={() => {
                switchScreen("Login", setVisibleMiniIconBar);
>>>>>>> parent of 1faefc6 (all deletes)
              }}
            >
              <Icon name="user" size={iconSize} color="#fff" />
            </TouchableOpacity>
<<<<<<< HEAD
          ) : null}
        </View>
        {visibleMiniIconBar ? (
=======
<<<<<<< HEAD
          )}
        </View>
        {visibleMiniIconBar && (
=======
          ) : null}
        </View>
        {visibleMiniIconBar ? (
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
          <View style={styles.mini}>
            <View style={styles.miniNavCol}>
              <MiniNavbarIcon
                goto="Clubs"
                type="icon"
                name="futbol-o"
                title="Clubs"
                color="#2ECC71"
                onPress={setVisibleMiniIconBar}
              />
              <MiniNavbarIcon
                goto="Goodies"
                type="icon"
                name="shopping-bag"
                title="Goodies"
                color="#F39C12"
                onPress={setVisibleMiniIconBar}
              />
            </View>
            <View style={styles.miniNavCol}>
              <MiniNavbarIcon
                goto="PSN"
                type="logo"
                title="PSN"
                color="#2ECC71"
                onPress={setVisibleMiniIconBar}
              />
              <MiniNavbarIcon
                goto="Partenaires"
                type="icon"
                name="handshake-o"
                title="Partenaires"
                color="#E74C3C"
                onPress={setVisibleMiniIconBar}
              />
            </View>
          </View>
<<<<<<< HEAD
        ) : (
          <View></View>
=======
<<<<<<< HEAD
=======
        ) : (
          <View></View>
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
>>>>>>> parent of 1faefc6 (all deletes)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 50,
  },
  navbar: {
    width: "100%",
    height: 66,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    borderRadius: 33,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    elevation: 30,
  },
  mainIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignContent: "center",
    height: "100%",
  },
  mini: {
    zIndex: 100,
    display: "flex",
    position: "absolute",
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    left: "3%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    transform: [{ translateY: -160 }],
  },

  miniNavCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  selectedScreen: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});

export default Navbar;
