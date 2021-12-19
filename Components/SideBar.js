import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SideBarButton } from "./SideBarButton";
import RoleSquare from "./RoleSquare";

export function SideBar(props) {
    return(
      <View style={styles.main}>
        <Image style={styles.logo} source={require("../assets/CDELogo.png")}/>
        <View style={styles.info}>
            <Text style={styles.name}>Alexandre Humbert</Text>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <RoleSquare color="#da291c"/>
                <Text>Utilisateur standard</Text>
            </View>
        </View>
        <View style={styles.actions}>
            <SideBarButton goto="Admin" txt="Page administrateur"/>
            <SideBarButton goto="GestionClub" txt="Gestion de club"/>
            <SideBarButton txt="Se déconnecter"/>
        </View>
      </View>  
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    name: {
        fontSize: 23
    },
    logo: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 50,
        left: "10%"
    },
    info: {
        position: 'absolute',
        top: 150,
        left: "10%"
    },
    actions: {
        position: 'absolute',
        width: "80%",
        left: "10%",
        top: "30%",
    },
    pierre: {
        position: 'absolute',
        bottom: "1%",
        fontSize: 1
    }
});