import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';

const Abonnement = (props, navigation) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="MES ABONNEMENTS" />
            <ScrollView style={styles.AbonnementList}>
                
            </ScrollView>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    AbonnementList: {
        
    }
});

export default Abonnement;