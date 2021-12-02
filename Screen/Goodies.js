import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../Components/Header';
import GoodiesCard from '../Components/GoodiesCard';
import Navbar from '../Components/Navbar';

const Goodies = (props) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="GOODIES" />
            <ScrollView style={styles.goodiesList}>
                <View style={styles.rowGoodiesCard}>
                    <GoodiesCard />
                    <GoodiesCard />
                </View>
                <View style={styles.rowGoodiesCard}>
                    <GoodiesCard />
                    <GoodiesCard />
                </View>
                <View style={styles.rowGoodiesCard}>
                    <GoodiesCard />
                    <GoodiesCard />
                </View>
                <View style={styles.rowGoodiesCard}>
                    <GoodiesCard />
                    <GoodiesCard />
                </View>
            </ScrollView>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    rowGoodiesCard: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 25
    },
    goodiesList: {
        
    }
});

export default Goodies;