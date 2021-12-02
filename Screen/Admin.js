import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Role from "../Components/Role";
import UserCardAdmin from "../Components/UserCardAdmin";

const Admin = (props) => {
    return(
        <View style={styles.main}>
            <Header title="ADMIN" color="#da291c"/>
            <ScrollView>
                <View style={styles.roleListContainer}>
                    <View style={styles.roleList}>
                        <Role role="Utilisateur standard" color="#2ECC71"/>
                        <Role role="Administrateur de club" color="#E74C3C"/>
                        <Role role="Administrateur de bureau" color="#3498DB"/>
                        <Role role="Administrateur global CDE" color="#F39C12"/>
                    </View>
                </View>
                <View style={styles.userList}>
                    <UserCardAdmin name="User 1" color="#E74C3C"/>
                    <UserCardAdmin name="User 2" color="#E74C3C"/>
                    <UserCardAdmin name="User 3" color="#E74C3C"/>
                </View>
            </ScrollView>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        display: 'flex',
        backgroundColor: "#F8F8F8"
    },
    roleListContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    roleList: {
        marginTop: 20,
        marginBottom: 20,
    },
    userList: {
        width: "80%",
        marginLeft: "10%"
    }
});

export default Admin;