import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const EventsCard = (props) => {
    const [admin, setAdmin] = useState(true);
    const [modalDescriptionVisible, setModalDescriptionVisible] = useState(false);
    return(
        <TouchableOpacity style={styles.main} onPress={() => {
            setModalDescriptionVisible(true);
        }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDescriptionVisible}
                onRequestClose={() => {
                    setModalDescriptionVisible(!modalDescriptionVisible);
                }}
            >
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.panel} onPress={() => {
                        setModalDescriptionVisible(false);
                    }}>
                        <Text>{props.description}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {admin ? 
            <TouchableOpacity style={styles.adminButton} onPress={() => {
                // Envoi requête
                }
            }>
                <Icon name="trash" size={20} color="#000"/>
            </TouchableOpacity>
            :
            <View></View>
            }
            <View style={styles.imgContainer}>
                <Image
                    style={styles.img}
                    source={{uri: props.src}}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>{props.name}</Text>
                <Text style={styles.infoDate}>{props.date}</Text>
                <Text style={styles.infoAuthor}>{props.author}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "86%",
        height: 120,
        marginLeft: "7%",
        marginTop: 25,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    imgContainer: {
        flex: 1,
        height: "100%",
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode:"cover",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    infoContainer: {
        flex: 2,
        zIndex: 1
    },
    infoTitle: {
        fontSize: 25,
        fontWeight: "700",
        position: 'absolute',
        left: "5%",
        top: 47.5,
    },
    infoDate: {
        position: 'absolute',
        right: "5%",
        bottom: "5%"
    },
    infoAuthor: {
        position: 'absolute',
        right: "5%",
        top: "5%"
    },
    adminButton: {
        position: 'absolute',
        top: "20%",
        right: 10,
        zIndex: 2
    },
    modalButton: {
        marginTop: 10,
        backgroundColor: "#da291c",
        padding: 9,
        borderRadius: 100,
    },
    modal: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.15)'
    },
    panel: {
        backgroundColor: 'white',
        width: "70%",
        padding: 50,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column'  
    },
    btModalText: {
        color: "white",
        fontSize: 16,
        textAlign: 'center'
    },
});

export default EventsCard;