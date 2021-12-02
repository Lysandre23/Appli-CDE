import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const EventsCard = (props) => {

    return(
        <TouchableOpacity style={styles.main}>
            <View style={styles.imgContainer}>
                <Image
                    style={styles.img}
                    source={props.src}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>{props.title}</Text>
                <Text style={styles.infoDate}>{props.date}</Text>
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
        borderRadius: 20
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
    }
});

export default EventsCard;