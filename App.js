/*
Racine de l'appli
Les pages sont générées dans les éléments <Drawer.Screen>, la propriété name explicite la page correspondante.
Les fichiers source des pages sont dans le dossier Screen.
Les composants créés sont dans le dossier Components.
Les fonctions utilitaires utilisées plusieurs fois sont dans le dossier helpers, fichier helpers.js.
Les images sont dans le dossier assets.
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Platform, StatusBar} from "react-native";
import 'react-native-gesture-handler';
import Api from "./Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const Drawer = createDrawerNavigator();

function App({ navigation }) {
  const [token, setToken] = useState(null);
  const [expoToken, setExpoToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [pendingUserInfo, setPendingUserInfo] = useState(true);
  const [user, setUser] = useState({
    email: null,
    first_name: null,
    last_name: null,
    is_admin: false,
    office_responsible: [],
    club_responsible: [],
    office_member: [],
    club_member: [],
  });

  useEffect(() => {
    console.log(expoToken);
    if (token === null) {
      AsyncStorage.getItem("cde-token").then((item) => {
          if (item && typeof item !== undefined) {
              console.log("expoToken : ", expoToken);
              console.log("user.is_admin : ", user.is_admin);
          }
      })
    if (token === null) {
      AsyncStorage.getItem("cde-token").then((item) => {
        if (item && (typeof item !== undefined)) {
          setToken(item);
        } else {
          setIsLogged(false);
          setPendingUserInfo(false);
        }
      });
    }
    if (token !== null && user.first_name === null) {
      getUserInfo();
    }
    if (user.first_name !== null && expoToken === null) {
      registerForPushNotificationsAsync()
        .then((token) => {
          setExpoToken(token);
          sendExpoToken(token);
        })
        .catch((err) =>console.error(err));
          console.log("expoToken set");
        }
    }
  });

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
      Notifications.setNotificationChannelAsync("default", {
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

    useEffect(() => {
        getLocalUserInfo()
    })

    const getLocalUserInfo = async () => {
        if (user.email === null) {
            try {
                setUser(JSON.parse(await AsyncStorage.getItem("user")))
            } catch (e) {
                console.error("No user found on local storage", e)
            }
        }
    }

    const getUserInfo = (token) => {
        setPendingUserInfo(true);
        Api.get("/users", {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
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
                setUser(response.data.data)
                setIsLogged(true);
                setPendingUserInfo(false);
            })
            .catch(function (response) {
                setIsLogged(false);
                setPendingUserInfo(false);
                AsyncStorage.removeItem("token").then(() => console.log("Removed token"))
                AsyncStorage.removeItem("cde-token").then(() => console.log("Removed cde-token"))
                console.error(response);
            });
    };

    const handleDisconnect = () => {
            AsyncStorage.removeItem("cde-token");
            setUser({
                email: null,
                first_name: null,
                last_name: null,
                is_admin: false,
                office_responsible: [],
                club_responsible: [],
                office_member: [],
                club_member: [],
            });
            setToken(null);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Events" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Events">
                    {(props) => <Events user={user} token={token} handleDisconnect={handleDisconnect}/>}
                </Stack.Screen>
                <Stack.Screen name="Login">
                    {() => <Login onTokenUpdate={token => {setToken(token); getUserInfo(token)}} />}
                </Stack.Screen>
                <Stack.Screen name="Profil">
                    {() => <Profil  user={user} token={token}/>}
                </Stack.Screen>
                <Stack.Screen name="Goodies">
                    {() => <Goodies user={user} token={token} handleDisconnect={handleDisconnect}/>}
                </Stack.Screen>
                <Stack.Screen name="Clubs">
                    {() => <Clubs user={user} token={token} handleDisconnect={handleDisconnect}/>}
                </Stack.Screen>
                <Stack.Screen name="PSN">
                    {() => <PSN user={user} token={token} handleDisconnect={handleDisconnect}/>}
                </Stack.Screen>
                <Stack.Screen name="Partenaires">
                    {() => <Partenaires user={user} token={token} handleDisconnect={handleDisconnect}/>}
                </Stack.Screen>
                <Stack.Screen name="Message">
                    {() => <Message token={token} user={user} />}
                </Stack.Screen>
                <Stack.Screen name="Abonnements">
                    {() => <Abonnement user={user} token={token} />}
                </Stack.Screen>
                <Stack.Screen name="GestionClub">
                    {() => <GestionClub user={user} token={token} />}
                </Stack.Screen>
                <Stack.Screen name="GestionOffice">
                    {() => <GestionOffice user={user} token={token} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
