import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';

const Partenaires = (props, navigation) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="PARTENAIRES" />
            <ScrollView style={styles.PartenairesList}>
                
            </ScrollView>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    PartenairesList: {
        
    }
});

export default Partenaires;