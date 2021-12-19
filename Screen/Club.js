import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventsCard from '../Components/EventsCard';
import { useNavigation } from '@react-navigation/core';

const Club = ({route}) => {
    const navigation = useNavigation();
    const {nom} = route.params;
    return(
        <View style={styles.main}>
            <Header color="#da291c" title={nom.toUpperCase()} />
            <View style={styles.head}>
                <Image style={styles.img} source={require('../assets/event.jpg')}/>
                <View style={styles.headButton}>
                    <TouchableOpacity style={styles.bt} onPress={() => {
                        
                    }}>
                        <Text>Suivre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bt} onPress={() => {
                        
                    }}>
                        <Text>Membres</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bt} onPress={() => {
                        navigation.navigate("Message");
                    }}>
                        <Icon name="envelope-o" size={20} color="#000"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.presText}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</Text>
            </View>
            <View style={styles.line}></View>
            <ScrollView style={styles.list}>
                <EventsCard
                    title="Event"
                    date="27/10/2021"
                    src={require("../assets/event.jpg")}
                    description=""
                />
            </ScrollView>
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    headButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bt: {
        borderWidth: 1,
        borderColor: "#da291c",
        borderRadius: 8,
        padding: 5,
        fontSize: 20,
        marginRight: 5
    },
    presText: {
        width: "100%",
        textAlign: 'justify',
        marginTop: 15,
        width: "90%",
        marginLeft: "5%"
    },
    line: {
        width: "90%",
        height: 2,
        borderWidth: 1,
        borderColor: "#da291c",
        borderRadius: 2,
        marginLeft: "5%",
        marginTop: 20
    },
    list: {

    }
});

export default Club;