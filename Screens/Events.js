import {Platform, StyleSheet, View} from "react-native";
import Circle from "../Components/Circle";
import {Component, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../Api";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {SideBar} from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import {getUserAndToken} from "../utils";
import Header from "../Components/Header";

export const Events = (props) => {
    const [expoToken,setExpoToken] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [pendingUserInfo, setPendingUserInfo] = useState(true)
    const [sideBarShown, setSideBarShown] = useState(false)
    const [posts, setPosts] = useState([])
    const [isFetchingPosts, setIsFetchingPosts] = useState(false)

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = () => {
        setIsFetchingPosts(true)
        Api.get("/posts")
            .then(function (response) {
                setPosts(response.data.data)
                setIsFetchingPosts(false)
            })
            .catch(e => console.error("getting events", e))
    }

    const toggleSideBar = () => {
        setSideBarShown(!sideBarShown)
    }

    const handleDisconnect = (value) => {
        if (value) {
            AsyncStorage.removeItem("cde-token");
        }
    };

    return(
        <View style={{height: "100%"}}>
            <Header color="#da291c" title="EVENTS" toggleSideBar={toggleSideBar} user={props.user} token={props.token}/>
            <Circle/>
            <Circle/>
            {sideBarShown && <SideBar user={props.user} onDisconnect={props.handleDisconnect} hideSideBar={toggleSideBar} {...props} />}
            <Navbar color="#da291c" user={props.user}/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "rgb(250,250,250)",
        overflow: 'hidden'
    },
    addButton: {
        zIndex: 2,
        backgroundColor: "#da291c",
        padding: 10,
        borderRadius: 100,
        width: "50%",
        marginLeft: "25%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
        marginBottom: 15,
    },
    modal: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.15)",
    },
    addPanel: {
        backgroundColor: "white",
        width: "70%",
        padding: 50,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
    },
    input: {
        width: "100%",
        borderColor: "rgb(200,200,200)",
        borderWidth: 1,
        borderRadius: 7,
        padding: 5,
        marginBottom: 5,
    },
    bt: {
        marginTop: 10,
        backgroundColor: "#da291c",
        padding: 9,
        borderRadius: 100,
    },
    textBT: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    imagePicker: {
        borderColor: "rgb(150,150,150)",
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
    },
    datePicker: {},
})