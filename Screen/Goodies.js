import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import Header from '../Components/Header';
import GoodiesCard from '../Components/GoodiesCard';
import Navbar from '../Components/Navbar';

import data from "../assets/goodies.json";



const Goodies = (props) => {
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="GOODIES" />
            <FlatList
                data={data}
                renderItem={({item}) => 
                    <View style={styles.rowcol}>
                        <GoodiesCard name={item.name} price={item.price}/>
                    </View>}
                keyExtractor={item => item.key}
                numColumns={2}
            />
            
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    rowcol: {
        width: "50%",
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default Goodies;