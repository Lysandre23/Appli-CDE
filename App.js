import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./Home";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Events} from "./Screens/Events";
import Login from "./Screens/Login";
import Profil from "./Screens/Profil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useRef, useState} from "react";
import {getUserAndToken} from "./utils";
import {Platform} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Api from "./Api";
import {SideBar} from "./Components/SideBar";
import Goodies from "./Screens/Goodies";
import Clubs from "./Screens/Clubs";
import PSN from "./Screens/PSN";
import Partenaires from "./Screens/Partenaires";
import Abonnement from "./Screens/Abonnements";
import GestionClub from "./Screens/GestionClub";
import GestionOffice from "./Screens/GestionOffice";

export let id = getUserAndToken()

export default function App() {

    const Stack = createNativeStackNavigator();
    const [expoToken, setExpoToken] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [pendingUserInfo, setPendingUserInfo] = useState(true);
    const [token, setToken] = useState(null)
    const [user, setUser] = useState({
        email: null,
        first_name: null,
        last_name: null,
        is_admin: false,
        office_responsible: [],
        club_responsible: [],
        office_member: [],
        club_member: [],
    })

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }
        return token;
    };

    const sendExpoToken = (expoToken) => {
        Api.post(
            "/expo-token",
            {
                token: expoToken,
            },
            {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response)=>{})
            .catch((err) => console.error(err));
    };

    const getUserInfo = (token) => {
        setPendingUserInfo(true);
        Api.get("/users", {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(function (response) {
                AsyncStorage.setItem("user", JSON.stringify({
                    email: response.data.data.email,
                    first_name: response.data.data.first_name,
                    last_name: response.data.data.last_name,
                    is_admin: response.data.data.is_admin,
                    office_responsible: response.data.data.office_responsible,
                    club_responsible: response.data.data.club_responsible,
                    office_member: response.data.data.office_member,
                    club_member: response.data.data.club_member,
                }))
                    .then(() => {
                        setUser(response.data.data)
                        setIsLogged(true);
                        setPendingUserInfo(false);
                    })
            })
            .catch(function (response) {
                setIsLogged(false);
                setPendingUserInfo(false);
                AsyncStorage.removeItem("token").then(() => console.log("Removed token"))
                AsyncStorage.removeItem("cde-token").then(() => console.log("Removed cde-token"))
                console.error(response);
            });
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Events" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Events">
                    {(props) => <Events user={user} token={token}/>}
                </Stack.Screen>
                <Stack.Screen name="Login">
                    {() => <Login onTokenUpdate={token => {setToken(token); getUserInfo(token)}} />}
                </Stack.Screen>
                <Stack.Screen name="Profil" component={Profil} />
                <Stack.Screen name="Goodies">
                    {() => <Goodies user={user} token={token}/>}
                </Stack.Screen>
                <Stack.Screen name="Clubs">
                    {() => <Clubs user={user} token={token}/>}
                </Stack.Screen>
                <Stack.Screen name="PSN">
                    {() => <PSN user={user} token={token}/>}
                </Stack.Screen>
                <Stack.Screen name="Partenaires">
                    {() => <Partenaires user={user} token={token}/>}
                </Stack.Screen>
                <Stack.Screen name="Abonnements">
                    {(props) => <Abonnement user={user} token={token} />}
                </Stack.Screen>
                <Stack.Screen name="GestionClub">
                    {(props) => <GestionClub user={user} token={token} />}
                </Stack.Screen>
                <Stack.Screen name="GestionOffice">
                    {(props) => <GestionOffice user={user} token={token} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


