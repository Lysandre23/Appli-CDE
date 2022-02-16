import React from "react";
import { View, StyleSheet, Image, Text, Modal, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"

const EventModal = (props) => {
    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            onRequestClose={() => {
                props.setVisible(!props.visible)
            }}
        >
            <TouchableOpacity style={styles.backArrow} onPress= {() => {
                props.setVisible(false)
            }}>
                <Icon color="white" name="arrow-left" size={30} />
            </TouchableOpacity>
            <Image style={styles.img} source={{ uri: props.image }}/>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.date}>{props.date}</Text>
            <Text style={styles.description}>{props.text}</Text>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    backArrow: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 2,
    },
    img: {
        width: "100%",
        height: 250,
        backgroundColor: "grey",
        resizeMode: 'cover'
    },
    title: {
        marginLeft: 10,
        marginTop: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    date: {

    },
    description: {
        marginTop: 10,
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'justify'
    }
});

export default EventModal;