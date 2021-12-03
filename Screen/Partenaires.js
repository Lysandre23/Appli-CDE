import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import PartenaireCard from '../Components/PartenaireCard';

const Partenaires = (props, navigation) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="PARTENAIRES" />
            <ScrollView style={styles.PartenairesList}>
                <View style={styles.row}>
                    <PartenaireCard />
                    <PartenaireCard />
                    <PartenaireCard />
                </View>
                <View style={styles.row}>
                    <PartenaireCard />
                    <PartenaireCard />
                    <PartenaireCard />
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
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20
    },
    PartenairesList: {
        
    }
});

export default Partenaires;