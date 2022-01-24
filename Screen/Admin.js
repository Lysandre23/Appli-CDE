import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import AdminButton from "../Components/AdminButton";
import { useNavigation, useRoute } from '@react-navigation/native';

const Admin = (props) => {
    const navigation = useNavigation();
    return(
        <View style={styles.main}>
            <Header title="ADMIN" color="#da291c"/>
            <ScrollView>
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate('Role');
                }}>
                    <AdminButton text="Gestion des rôles"/>
                </TouchableOpacity>
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
    category: {

    }
});

export default Admin;